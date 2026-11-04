import { mkdir, readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { randomUUID } from 'node:crypto';

export const STAGES = ['seed', 'grown', 'root', 'sprout', 'stem', 'leaves', 'flower', 'pods', 'resprout', 'pods2', 'aging', 'withered', 'dead'];
export const MAX_BEANS = 48;
const DAY = 86_400_000;
const FILES = ['growth.json', 'actions.json', 'visitor-chats.json'];
const clone = value => structuredClone(value);
const dayOf = time => new Date(Number(time) + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
const dayNumber = day => Date.parse(`${day}T00:00:00.000Z`) / DAY;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const trim = (items, max = 500) => { if (items.length > max) items.splice(0, items.length - max); };
const eyes = 'M -12 -5 a 2 3 0 1 0 4 0 a 2 3 0 1 0 -4 0 M 8 -5 a 2 3 0 1 0 4 0 a 2 3 0 1 0 -4 0';
const mouths = { happy: 'M -7 6 Q 0 14 7 6', sad: 'M -7 10 Q 0 3 7 10', neutral: 'M -5 8 L 5 8', sick: 'M -6 8 Q -3 4 0 8 T 6 8' };
const pathPattern = /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,+\s-]{1,1500}$/;

/**
 * Dependency-free garden, serialized per instance (one process/instance per dataDir).
 * now() returns epoch milliseconds or a Date. Daily budgets use Asia/Shanghai.
 * execute actions: state, history, water, sun, attention, chat, refresh.
 * Care intake is 1 water / 1 energy, halved when joy < 10; attention +2 joy.
 * Progress advances when stage water + energy is strictly > 50.
 * Stage 7 and 9 each produce one seed (garden cap 48, including dead beans).
 * After final pods: aging at 2 elapsed real days, withered at 3, dead at 4;
 * these timed phases never depend on care or on stage progress.
 * ai({kind,bean,message,history}) -> {reply,personality,speech,expression,appearance}.
 * appearance accepts bounded numeric width,height,lean,hue,leafSize and SVG eyes/mouth.
 * Per-stage body shapes survive care/chat/refresh. Only stage/initial calls set them.
 * Snapshots: {beans,selected: bean,day:'YYYY-MM-DD',maxBeans,ai}; execute adds
 * {ok:true,action,reply?,chatAi?,history?}. Returned objects are detached copies.
 * Bean history retains 500 events; action/visitor logs retain 2000 entries each.
 * Missed dates are represented by one exact range/count event, not a date loop.
 * Files share a revision: interrupted multi-file commits are detected, never reset.
 * Atomic rename protects each JSON file; this is not a multi-process database.
 */
export class BeanGarden {
  constructor({ dataDir, ai, now = () => Date.now() } = {}) {
    if (typeof dataDir !== 'string' || !dataDir) throw new TypeError('dataDir is required');
    if (ai !== undefined && typeof ai !== 'function') throw new TypeError('ai must be a function');
    this.dataDir = resolve(dataDir);
    this.ai = ai;
    this.now = now;
    this.queue = Promise.resolve();
    this.ready = false;
    this.fault = null;
  }

  _enqueue(work) {
    const task = this.queue.then(work);
    this.queue = task.catch(() => {});
    return task;
  }

  _time() {
    const time = Number(this.now());
    if (!Number.isFinite(time) || Number.isNaN(new Date(time).getTime())) throw new TypeError('now() must return a valid date');
    return time;
  }

  async init() {
    return this._enqueue(async () => {
      if (this.fault) throw this.fault;
      if (this.ready) return this._snapshot();
      await mkdir(this.dataDir, { recursive: true });
      const loaded = await Promise.all(FILES.map(async file => {
        try { return JSON.parse(await readFile(join(this.dataDir, file), 'utf8')); }
        catch (error) {
          if (error.code === 'ENOENT') return undefined;
          throw new Error(`Cannot load ${file}: ${error.message}`, { cause: error });
        }
      }));
      const present = loaded.map(value => value !== undefined);
      if (present.some(Boolean) && !present.every(Boolean)) throw new Error('Incomplete garden save: all three JSON files are required');
      const time = this._time();
      if (present.every(Boolean)) {
        const [growth, actions, visitors] = loaded;
        this._validate(growth, actions, visitors);
        this.growth = growth;
        this.actions = actions;
        this.visitors = visitors;
      } else {
        this.growth = { version: 1, revision: 0, day: dayOf(time), beans: [], selectedId: null };
        this.actions = { version: 1, revision: 0, entries: [] };
        this.visitors = { version: 1, revision: 0, entries: [] };
        const bean = this._newBean(time);
        this.growth.beans.push(bean);
        this.growth.selectedId = bean.id;
        await this._generate(bean, 'initial');
      }
      await this._roll(time);
      await this._persist();
      this.ready = true;
      return this._snapshot();
    });
  }

  _validate(g, a, v) {
    if (![g, a, v].every(x => x && x.version === 1 && Number.isInteger(x.revision) && x.revision >= 0)
      || g.revision !== a.revision || g.revision !== v.revision) throw new Error('Invalid or inconsistent garden save revision');
    if (!Array.isArray(g.beans) || !g.beans.length || g.beans.length > MAX_BEANS || !Array.isArray(a.entries) || !Array.isArray(v.entries)
      || !/^\d{4}-\d{2}-\d{2}$/.test(g.day)) throw new Error('Invalid garden save schema');
    const ids = new Set();
    for (const b of g.beans) {
      if (!b || typeof b.id !== 'string' || ids.has(b.id) || typeof b.name !== 'string'
        || !Number.isInteger(b.stage) || b.stage < 0 || b.stage > 12 || b.stageName !== STAGES[b.stage]
        || !['water', 'energy', 'joy', 'size', 'createdAt', 'stageAt'].every(k => Number.isFinite(b[k]))
        || !b.daily || !['water', 'energy', 'joy'].every(k => Number.isFinite(b.daily[k]))
        || !/^\d{4}-\d{2}-\d{2}$/.test(b.daily.date) || !b.progress || !['water', 'energy'].every(k => Number.isFinite(b.progress[k]))
        || !Array.isArray(b.conditions) || !Array.isArray(b.history) || !b.appearance || !b.stageAppearances || !b.ai
        || (b.stage >= 9 && !Number.isFinite(b.finalPodsAt))) throw new Error('Invalid bean in garden save');
      ids.add(b.id);
    }
    if (!ids.has(g.selectedId)) throw new Error('Invalid selected bean in garden save');
  }

  _newBean(time, parentId = null) {
    const bean = {
      id: randomUUID(), name: `豆豆 ${this.growth.beans.length + 1}`, parentId,
      stage: 0, stageName: STAGES[0], water: 0, energy: 0, joy: 0,
      daily: { water: 0, energy: 0, joy: 0, date: dayOf(time), lowJoyApplied: true, waterPenalty: false, sunPenalty: false },
      progress: { water: 0, energy: 0 }, size: 0.95, conditions: ['sad', 'sick'],
      history: [], personality: '温柔、好奇，喜欢有人陪伴。', speech: '慢慢说话，带一点小豆子的天真。',
      expression: 'sad', appearance: this._defaultShape(0), stageAppearances: {},
      createdAt: time, stageAt: time, finalPodsAt: null, reproducedStages: [],
      ai: { status: 'provisional', provisional: true, error: 'AI has not generated this bean yet' },
    };
    this._event(bean, 'birth', { parentId }, time);
    return bean;
  }

  _defaultShape(stage) {
    return { width: 42 + stage * 2, height: 54 + stage * 5, lean: 0, hue: 95, leafSize: 14 + stage, eyes, mouth: mouths.sad };
  }

  _event(bean, type, details = {}, time = this._time()) {
    bean.history.push({ type, at: new Date(time).toISOString(), ...details });
    trim(bean.history);
  }

  async _generate(bean, kind, message = '', history = bean.history, { isolated = false } = {}) {
    try {
      if (!this.ai) throw new Error('AI provider is not configured');
      const value = await this.ai({ kind, bean: clone(bean), message, history: clone(history) });
      if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('AI returned an invalid object');
      if (kind === 'chat' && (typeof value.reply !== 'string' || !value.reply.trim())) throw new Error('AI chat reply is missing');
      if (!isolated) {
        for (const key of ['personality', 'speech']) if (typeof value[key] === 'string' && value[key].trim()) bean[key] = value[key].slice(0, 2000);
        if (typeof value.expression === 'string' && value.expression.trim()) bean.expression = value.expression.slice(0, 100);
        if (kind === 'initial' || kind === 'stage') {
          const shape = this._defaultShape(bean.stage);
          const source = value.appearance || {};
          for (const [key, min, max] of [['width', 20, 100], ['height', 20, 180], ['lean', -25, 25], ['hue', 0, 360], ['leafSize', 4, 60]]) {
            if (Number.isFinite(source[key])) shape[key] = clamp(source[key], min, max);
          }
          for (const key of ['eyes', 'mouth']) if (typeof source[key] === 'string' && pathPattern.test(source[key])) shape[key] = source[key];
          bean.appearance = shape;
          bean.stageAppearances[bean.stage] = clone(shape);
        }
        if (typeof value.reply === 'string' && value.reply.trim()) bean.lastReply = value.reply.slice(0, 2000);
        bean.ai = { status: 'ready', provisional: false, kind, updatedAt: new Date(this._time()).toISOString(), error: null };
      }
      return { reply: typeof value.reply === 'string' ? value.reply.slice(0, 8000) : '', ai: { status: 'ready', provisional: false, error: null } };
    } catch (error) {
      const metadata = { status: 'provisional', provisional: true, kind, updatedAt: new Date(this._time()).toISOString(), error: String(error.message || error).slice(0, 1000) };
      if (!isolated) {
        bean.ai = metadata;
        if (kind === 'initial' || kind === 'stage') {
          bean.appearance = this._defaultShape(bean.stage);
          bean.stageAppearances[bean.stage] = clone(bean.appearance);
        }
      }
      return { reply: message ? '我听见你啦。现在有点迷糊，但很高兴你来陪我。' : '', ai: metadata };
    }
  }

  _expression(bean) {
    bean.conditions = bean.conditions.filter(c => !['sad', 'sick'].includes(c));
    if (bean.joy < 10) bean.conditions.push('sad', 'sick');
    if (bean.daily.waterPenalty && !bean.conditions.includes('sick')) bean.conditions.push('sick');
    bean.mood = bean.stage === 12 ? 'dead' : bean.conditions.includes('vomiting') ? 'sick' : bean.joy < 10 ? 'sad' : 'happy';
    if (bean.ai.status !== 'ready') bean.expression = bean.mood;
    // Expression is separate from the stable stage geometry and generated face paths.
  }

  async _roll(time) {
    const date = dayOf(time);
    // Never reverse daily budgets if the host clock moves backwards.
    if (date > this.growth.day) this.growth.day = date;
    for (const bean of this.growth.beans) {
      const days = Math.max(0, dayNumber(date) - dayNumber(bean.daily.date));
      if (days > 0) {
        this._event(bean, 'daily-summary', { date: bean.daily.date, daily: clone(bean.daily), joy: bean.joy }, time);
        if (days > 1) this._event(bean, 'offline-days', { from: bean.daily.date, through: dayOf(time - DAY), days: days - 1, daily: { water: 0, energy: 0, joy: 0 } }, time);
        if (bean.stage < 12) bean.size = Math.max(0.2, bean.size * Math.pow(0.95, days));
        bean.joy = 0;
        bean.daily = { water: 0, energy: 0, joy: 0, date, lowJoyApplied: true, waterPenalty: false, sunPenalty: false };
        bean.conditions = bean.stage === 12 ? ['dead'] : ['sad', 'sick'];
        this._expression(bean);
      }
      if (bean.stage >= 9 && bean.stage < 12 && Number.isFinite(bean.finalPodsAt)) {
        const elapsed = Math.max(0, time - bean.finalPodsAt);
        const target = elapsed >= 4 * DAY ? 12 : elapsed >= 3 * DAY ? 11 : elapsed >= 2 * DAY ? 10 : 9;
        // At most three transitions even after years offline.
        while (bean.stage < target) await this._transition(bean, bean.stage + 1, bean.finalPodsAt + (bean.stage - 7) * DAY);
      }
    }
  }

  async _transition(bean, stage, time) {
    bean.stage = stage;
    bean.stageName = STAGES[stage];
    bean.stageAt = time;
    bean.progress = { water: 0, energy: 0 };
    bean.size = Math.max(0.2, Math.min(2, bean.size + (stage < 10 ? 0.12 : -0.1)));
    this._event(bean, 'stage', { stage, stageName: bean.stageName }, time);
    if (stage === 9) bean.finalPodsAt = time;
    if (stage === 12) bean.conditions = ['dead'];
    await this._generate(bean, 'stage');
    if ((stage === 7 || stage === 9) && !bean.reproducedStages.includes(stage)) {
      bean.reproducedStages.push(stage);
      if (this.growth.beans.length < MAX_BEANS) {
        const child = this._newBean(time, bean.id);
        this.growth.beans.push(child);
        this._event(bean, 'reproduction', { childId: child.id, stage }, time);
        await this._generate(child, 'initial');
      } else this._event(bean, 'reproduction-cap', { cap: MAX_BEANS, stage }, time);
    }
    this._expression(bean);
  }

  _snapshot(beanId) {
    const selected = this.growth.beans.find(b => b.id === (beanId || this.growth.selectedId));
    return clone({ beans: this.growth.beans, selected, day: this.growth.day, maxBeans: MAX_BEANS, ai: selected?.ai });
  }

  async execute(input = {}, { visitorMode = false } = {}) {
    return this._enqueue(async () => {
      if (!this.ready) throw new Error('Call init() before execute()');
      if (this.fault) throw this.fault;
      const { action = 'state', beanId, message = '', visitor = '访客', visitorId = 'anonymous' } = input;
      if (!['state', 'water', 'sun', 'attention', 'chat', 'history', 'refresh'].includes(action)) throw new Error(`Unknown action: ${action}`);
      if (visitorMode && !['state', 'chat', 'history'].includes(action)) throw new Error('Visitor mode permits state, history and chat only');
      const bean = this.growth.beans.find(b => b.id === (beanId || this.growth.selectedId));
      if (!bean) throw new Error('Bean not found');
      if (action === 'chat' && (typeof message !== 'string' || !message.trim() || message.length > 2000)) throw new Error('Chat message must contain 1–2000 characters');
      if (visitorMode && (typeof visitorId !== 'string' || !visitorId || visitorId.length > 200 || typeof visitor !== 'string' || visitor.length > 100)) throw new Error('Invalid visitor identity');
      const before = clone([this.growth, this.actions, this.visitors]);
      try {
        const time = this._time();
        await this._roll(time);
        if (!visitorMode && beanId) this.growth.selectedId = bean.id;
        const extras = {};
        if (['water', 'sun', 'attention', 'refresh'].includes(action) && bean.stage === 12) throw new Error('This bean has completed its life');
        if (action === 'water' || action === 'sun') {
          const key = action === 'water' ? 'water' : 'energy';
          const raw = 1;
          const amount = raw * (bean.joy < 10 ? 0.5 : 1);
          bean.daily[key] += raw;
          bean[key] = Math.min(100, bean[key] + amount);
          bean.progress[key] += amount;
          if (bean.daily.water > 10 && !bean.daily.waterPenalty) {
            bean.daily.waterPenalty = true;
            bean.conditions.push('vomiting');
            this._event(bean, 'overwater', { rawIntake: bean.daily.water }, time);
          }
          if (bean.daily.energy > 20 && !bean.daily.sunPenalty) {
            bean.daily.sunPenalty = true;
            bean.water = Math.max(0, bean.water - 10);
            bean.size = Math.max(0.2, bean.size * 0.9);
            bean.conditions.push('sunburn');
            this._event(bean, 'oversun', { rawIntake: bean.daily.energy }, time);
          }
          this._event(bean, action, { raw, amount }, time);
          if (bean.stage < 9 && bean.progress.water + bean.progress.energy > 50) await this._transition(bean, bean.stage + 1, time);
          this._expression(bean);
        } else if (action === 'attention') {
          bean.joy = Math.min(100, bean.joy + 2);
          bean.daily.joy += 2;
          this._event(bean, 'attention', { amount: 2 }, time);
          this._expression(bean);
        } else if (action === 'chat') {
          const prior = visitorMode ? this.visitors.entries.filter(e => e.beanId === bean.id && e.visitorId === visitorId) : bean.history;
          const generated = await this._generate(bean, 'chat', message.trim(), prior, { isolated: visitorMode });
          extras.reply = generated.reply;
          extras.chatAi = generated.ai;
          const entry = { type: 'chat', at: new Date(time).toISOString(), beanId: bean.id, message: message.trim(), reply: generated.reply, ai: generated.ai };
          if (visitorMode) {
            this.visitors.entries.push({ ...entry, visitor: visitor.slice(0, 100), visitorId });
            trim(this.visitors.entries, 2000);
          } else {
            bean.history.push(entry);
            trim(bean.history);
            this._expression(bean);
          }
        } else if (action === 'refresh') {
          await this._generate(bean, 'refresh');
        }
        if (action === 'history') extras.history = clone(this.visitors.entries.filter(e => e.beanId === bean.id && (!visitorMode || e.visitorId === visitorId)));
        if (!['state', 'history'].includes(action)) {
          this.actions.entries.push({ action, beanId: bean.id, at: new Date(time).toISOString(), visitorMode: Boolean(visitorMode), ...(visitorMode ? { visitorId } : {}) });
          trim(this.actions.entries, 2000);
        }
        await this._persist();
        return { ok: true, action, ...this._snapshot(bean.id), ...extras };
      } catch (error) {
        [this.growth, this.actions, this.visitors] = before;
        throw error;
      }
    });
  }

  async _persist() {
    const revision = this.growth.revision + 1;
    const docs = [this.growth, this.actions, this.visitors];
    const temps = FILES.map(file => join(this.dataDir, `.${file}.${randomUUID()}.tmp`));
    let renamed = 0;
    try {
      const writes = await Promise.allSettled(docs.map(async (doc, i) => {
        doc.revision = revision;
        await writeFile(temps[i], `${JSON.stringify(doc, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
      }));
      const failed = writes.find(result => result.status === 'rejected');
      if (failed) throw failed.reason;
      for (let i = 0; i < FILES.length; i++) {
        await rename(temps[i], join(this.dataDir, FILES[i]));
        renamed++;
      }
    } catch (error) {
      // Temp paths are known direct children of the configured data directory.
      await Promise.all(temps.map(path => unlink(path).catch(() => {})));
      const failure = new Error(`Garden persistence failed${renamed ? ' during commit; reload requires recovery of matching revisions' : ''}: ${error.message}`, { cause: error });
      if (renamed) this.fault = failure;
      throw failure;
    }
  }
}
