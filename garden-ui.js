// Shared native ESM UI: no DOM globals are read until the component mounts.
export const UI_STRINGS = {
  en: {
    'mb.title': 'A little life, slowly.', 'mb.subtitle': 'MUNG BEAN GARDEN', 'mb.water': 'Water', 'mb.sun': 'Sunlight', 'mb.attention': 'Give attention',
    'mb.history': 'Garden journal', 'mb.visit': 'Visit a garden', 'mb.close': 'Close', 'mb.loading': 'Waking up the garden…', 'mb.empty': 'The garden is quiet. Your beans will appear here.',
    'mb.stage': 'Stage', 'mb.waterStat': 'Water', 'mb.energy': 'Energy', 'mb.joy': 'Joy', 'mb.today': 'Today', 'mb.progress': 'Growth progress', 'mb.scale': 'Garden scale', 'mb.select': 'Choose a bean',
    'mb.chatLabel': 'Talk to your bean', 'mb.chatPlaceholder': 'A little hello goes a long way…', 'mb.send': 'Send', 'mb.visitorName': 'Your name', 'mb.visitorPlaceholder': 'A garden friend',
    'mb.visitor': 'You are visiting', 'mb.connectError': 'The garden could not connect. Try again.', 'mb.actionError': 'That moment could not be saved. Try again.', 'mb.retry': 'Try again',
    'mb.aiFailed': 'AI is resting: its last response failed.', 'mb.aiWorking': 'Your bean is thinking…', 'mb.awaken': 'Awaken AI', 'mb.noHistory': 'Every little moment will find its place here.',
    'mb.visitTitle': 'A garden next door', 'mb.visitHint': 'Enter your friend’s IPv4 address. You must be on the same local network.', 'mb.ip': 'Garden IP address', 'mb.ipError': 'Enter a valid IPv4 address, such as 192.168.1.12.', 'mb.openGarden': 'Open garden', 'mb.yourGarden': 'Your garden on this network',
    'mb.rules': 'How a little life grows', 'mb.rulesText': 'Offer water, sunlight and a little company. Growth takes time; daily care and each bean’s needs guide the next stage.', 'mb.lifecycle': 'The thirteen stages of a little life',
    'mb.condition': 'What your bean needs', 'mb.personality': 'Personality', 'mb.unnamed': 'Little bean', 'mb.ready': 'A quiet moment, together.', 'mb.maxStage': 'Fully grown', 'mb.journalEntry': 'Garden moment',
    'mb.stage0':'Seed', 'mb.stage1':'Growing', 'mb.stage2':'Rooting', 'mb.stage3':'Sprouting', 'mb.stage4':'Stem', 'mb.stage5':'Leaves', 'mb.stage6':'Flowering', 'mb.stage7':'First beans', 'mb.stage8':'New shoots', 'mb.stage9':'More beans', 'mb.stage10':'Aging', 'mb.stage11':'Withering', 'mb.stage12':'A life remembered',
    'mb.sad':'Lonely', 'mb.sick':'Unwell', 'mb.vomiting':'Too much water', 'mb.sunburn':'Drying out', 'mb.dead':'Life completed', 'mb.expression':'Feeling'
  },
  'zh-CN': {
    'mb.title':'小小生命，慢慢生长。', 'mb.subtitle':'绿豆小花园', 'mb.water':'浇水', 'mb.sun':'晒太阳', 'mb.attention':'关注', 'mb.history':'访客聊天记录', 'mb.visit':'去看看其他豆', 'mb.close':'关闭', 'mb.loading':'花园正在醒来……', 'mb.empty':'花园静悄悄的，你的绿豆会在这里出现。',
    'mb.stage':'阶段', 'mb.waterStat':'水分', 'mb.energy':'能量', 'mb.joy':'快乐', 'mb.today':'今日', 'mb.progress':'生长进度', 'mb.scale':'花园缩放', 'mb.select':'选择绿豆', 'mb.chatLabel':'和绿豆说说话', 'mb.chatPlaceholder':'今天有什么想对我说的？', 'mb.send':'发送', 'mb.visitorName':'你的名字', 'mb.visitorPlaceholder':'花园里的朋友', 'mb.visitor':'正在做客',
    'mb.connectError':'暂时连不上花园，请重试。', 'mb.actionError':'这次互动未能保存，请重试。', 'mb.retry':'重试', 'mb.aiFailed':'AI 暂时休息了：上次回应失败。', 'mb.aiWorking':'绿豆正在思考……', 'mb.awaken':'唤醒 AI', 'mb.noHistory':'每个小小的瞬间，都会记录在这里。',
    'mb.visitTitle':'去隔壁花园坐坐', 'mb.visitHint':'输入朋友的 IPv4 地址，你们需要连接同一个局域网。', 'mb.ip':'花园 IP 地址', 'mb.ipError':'请输入有效的 IPv4 地址，例如 192.168.1.12。', 'mb.openGarden':'打开花园', 'mb.yourGarden':'本地网络上的花园',
    'mb.rules':'小小生命如何长大', 'mb.rulesText':'浇水 +1，晒太阳 +1，关注 +2 愉悦。愉悦低于 10 时摄入减半、难过生病并缩小；每天水投喂超过 10 会呕吐生病，日晒超过 20 会干枯、失水 10 并缩小。阶段水与能量合计严格超过 50 后进阶并清零。每次结豆诞生一颗新豆；第二次结豆后第 2 / 3 / 4 天老化、枯萎、离世。每日按上海时间零点重置愉悦和投喂计数。花园最多容纳 48 颗豆（含老豆），每颗独立照料。', 'mb.lifecycle':'小小生命的十三个阶段', 'mb.condition':'绿豆现在的需要', 'mb.personality':'性格', 'mb.unnamed':'小绿豆', 'mb.ready':'一起，安静待一会儿。', 'mb.maxStage':'已经长大', 'mb.journalEntry':'花园瞬间',
    'mb.stage0':'小绿豆', 'mb.stage1':'长大', 'mb.stage2':'生根', 'mb.stage3':'发芽', 'mb.stage4':'长茎', 'mb.stage5':'出叶', 'mb.stage6':'开花', 'mb.stage7':'结豆', 'mb.stage8':'再次出芽', 'mb.stage9':'再次结豆', 'mb.stage10':'老化', 'mb.stage11':'枯萎', 'mb.stage12':'生命终章',
    'mb.sad':'难过', 'mb.sick':'生病', 'mb.vomiting':'呕吐 · 今天水太多了', 'mb.sunburn':'干枯 · 今天日晒过多', 'mb.dead':'已完成这一生', 'mb.expression':'心情'
  }
};
const clamp = (value, min, max, fallback = min) => Number.isFinite(Number(value)) ? Math.max(min, Math.min(max, Number(value))) : fallback;
const text = value => typeof value === 'string' || typeof value === 'number' ? String(value) : '';
const validPath = value => typeof value === 'string' && value.length < 4000 && /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,+\s-]+$/.test(value) ? value : null;
const ipv4 = value => /^\d{1,3}(\.\d{1,3}){3}$/.test(value) && value.split('.').every(n => Number(n) <= 255);

export function createGarden(React) {
  const { createElement: h, useState, useEffect, useRef } = React;
  function Icon({ name, ...props }) {
    const paths = {
      water: 'M12 2C10 6 5 10 5 15a7 7 0 0 0 14 0c0-5-5-9-7-13ZM8 15c0 2 1 3 3 4',
      sun: 'M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z',
      attention: 'M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-5 5 3 11 8 15 5-4 13-10 8-15Z',
      history: 'M5 3h13v18H5V3Zm3 5h7M8 12h7m-7 4h4M3 6h4m-4 5h4m-4 5h4',
      visit: 'M3 11 12 3l9 8M5 10v11h14V10M9 21v-7h6v7',
      close: 'm6 6 12 12M6 18 18 6', send: 'm3 3 19 9-19 9 4-9-4-9Zm4 9h15',
      leaf: 'M5 20C1 8 8 2 21 3c0 12-5 18-16 17Zm0 0L16 8', retry:'M20 8a8 8 0 1 0 0 9M20 3v6h-6', info:'M12 11v6m0-10v1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z'
    };
    return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, ...props }, h('path', { d: paths[name] || paths.leaf }));
  }
  function BeanArt({ bean }) {
    const a = bean.appearance || {};
    const stage = clamp(bean.stage, 0, 12);
    const seed = String(bean.id || bean.name || 'bean').split('').reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);
    const width = clamp(a.width ?? a.bodyWidth, 35, 98, 76 + seed % 13);
    const height = clamp(a.height ?? a.bodyHeight, 40, 112, 89 + seed % 11);
    const lean = clamp(a.lean ?? a.tilt, -18, 18, seed % 13 - 6);
    const bend = clamp(a.curve ?? a.roundness, 0.2, 1.5, 0.8);
    const body = `M ${-width * .14} ${-height} C ${-width * .86} ${-height * 1.13},${-width * .9} ${-height * .21},${-width * .2} -4 C ${width * .68} 24,${width * .94} ${-height * .58},${width * .5} ${-height * .96} C ${width * .22} ${-height * 1.2},${width * .24 * bend} ${-height * .68},${-width * .14} ${-height} Z`;
    const stemHeight = stage < 3 ? 0 : stage === 3 ? 26 : stage === 4 ? 70 : 100 + Math.min(stage - 5, 4) * 23;
    const old = stage >= 10;
    const dead = stage === 12;
    const mood = bean.mood || (Number(bean.joy) < 10 ? 'sad' : 'happy');
    const botanicals = [];
    if (stage >= 2) botanicals.push(h('path', { key:'root', d: `M-6 -4 Q-9 17 -1 28 M-3 18l-12 9 M-2 25l11 10 M-7 12l11 6`, fill:'none', stroke:'#555', strokeWidth:1.4 }));
    if (stage >= 3) {
      botanicals.push(h('path', { key:'stem', d:`M0 ${-height+10} Q-15 ${-height-stemHeight*.5} 3 ${-height-stemHeight}`, fill:'none', stroke:'#20201e', strokeWidth:3.4 }));
      const leaves = stage < 5 ? (stage === 3 ? 1 : 0) : stage >= 11 ? 1 : Math.min(6, 2 + stage - 5);
      for (let i=0;i<leaves;i++) {
        const side = i % 2 ? -1 : 1, y = -height - 15 - i * (stemHeight / (leaves + .8));
        const length = clamp(a.leafSize, 16, 48, 28) + (seed+i)%9;
        const droop = old ? 20 : 0;
        botanicals.push(h('g', { key:`leaf${i}`, transform:`translate(${i%2 ? -4 : 0} ${y}) rotate(${droop}) scale(${side} 1)` },
          h('path', { d:`M0 0 Q${length*.3} ${-length*.9} ${length} ${-length*.7} Q${length*.83} ${length*.21} 0 0Z`, fill:'#fcfcf9', stroke:'#252523', strokeWidth:1.8 }),
          h('path', { d:`M0 0Q${length*.5} ${-length*.25} ${length} ${-length*.7} M${length*.35} ${-length*.13}l3 -12 M${length*.6} ${-length*.32}l12 1`, fill:'none', stroke:'#777', strokeWidth:.8 })));
      }
      if (stage >= 6 && stage < 11) {
        const y = -height-stemHeight;
        if (stage===6 || stage===8) botanicals.push(h('g',{key:'flower',transform:`translate(3 ${y-6})`},[0,72,144,216,288].map(r=>h('path',{key:r,transform:`rotate(${r})`,d:'M0 0C-25-8-15-32 0-22C15-33 25-8 0 0Z',fill:'#fff',stroke:'#333',strokeWidth:1.3})),h('circle',{r:5,fill:'#242423'})));
        if(stage===7 || stage===9 || stage===10) botanicals.push(h('g',{key:'pods'},[-1,1].map(side=>h('g',{key:side,transform:`translate(0 ${y+35}) scale(${side} 1)`},h('path',{d:'M2 0Q58 14 39 80Q10 56 2 0ZM9 11Q31 36 39 80',fill:'#e9e9e4',stroke:'#323230',strokeWidth:1.8}),[20,38,56].map(p=>h('ellipse',{key:p,cx:21+p*.15,cy:p,rx:5,ry:7,stroke:'#777',strokeWidth:.8}))))));
      }
    }
    // The AI eyes path contains both eyes. Its local origin is the face center.
    const eyePath = validPath(a.eyes) || 'M-12 -5v4M12 -5v4';
    const mouth = validPath(a.mouth) || 'M-7 15Q0 23 7 15';
    const faceY = -height * .52;
    const shrinking = clamp(Number(bean.size) / (.95 + Math.min(stage,9) * .12), .15, 1.15, 1);
    const faceTransform = `translate(-4 ${faceY}) scale(1 ${mood==='sad'?.86:1})`;
    const mouthTransform = mood==='sick' ? 'translate(0 2) scale(1 .9)' : undefined;
    return h('svg',{className:'mb-bean-art',viewBox:`${stage<3?-90:-150} ${-(height+stemHeight+42)} ${stage<3?180:300} ${height+stemHeight+97}`,preserveAspectRatio:'xMidYMax meet',fill:'none','aria-hidden':true},
      h('ellipse',{cx:0,cy:14,rx:83,ry:7,fill:'#1c1c1b',opacity:.07}),
      h('g',{transform:`scale(${shrinking}) rotate(${lean + (old ? 16 : 0)} 0 -35)`,opacity:dead?.4:1},botanicals,
        h('path',{d:body,fill:'#2a2a28',stroke:'#111',strokeWidth:2.7,strokeLinejoin:'round'}),
        h('path',{d:`M${-width*.48} ${-height*.77}Q${-width*.69} ${-height*.38} ${-width*.24} -19`,stroke:'#777772',strokeWidth:1.7,opacity:.8}),
        Array.from({length:17},(_,i)=>h('path',{key:i,d:`M${-width*.55+i*4} ${-height*.83+(i%4)*5}l${-8+(i%3)} ${18+(i%5)*3}`,stroke:'#b9b9af',strokeWidth:.55,opacity:.18})),
        h('g',{className:'mb-bean-face',transform:faceTransform,stroke:'#fff',strokeWidth:2.7,strokeLinecap:'round',strokeLinejoin:'round'},
          h('path',{d:eyePath,fill:'none','data-feature':'two-eyes'}),h('path',{d:mouth,transform:mouthTransform,fill:'none','data-feature':'mouth'}))));
  }
  function Modal({ open, onClose, title, closeLabel, children }) {
    const ref = useRef(null), returnFocus = useRef(null);
    useEffect(()=>{
      const node=ref.current;
      if (!node || !open) return;
      returnFocus.current = document.activeElement;
      if (!node.open) node.showModal();
      return ()=>{ if(node.open) node.close(); const previous=returnFocus.current; if(previous && previous.isConnected && previous.focus) previous.focus(); };
    },[open]);
    return h('dialog',{ref,className:'mb-dialog',onCancel:e=>{e.preventDefault();onClose();},onClick:e=>{if(e.target===e.currentTarget)onClose();},'aria-label':title},
      h('div',{className:'mb-dialog-body'},h('div',{className:'mb-dialog-heading'},h('h2',null,title),h('button',{type:'button',className:'mb-icon-button',onClick:onClose,'aria-label':closeLabel},h(Icon,{name:'close'}))),children));
  }
  return function Garden({ api, t, visitorMode = false }) {
    const tr = key => { let value; try { value=t && t(key); } catch {} return typeof value==='string' && value && value!==key ? value : UI_STRINGS.en[key] || key; };
    const [snapshot,setSnapshot]=useState(null), [selected,setSelected]=useState(''), [scale,setScale]=useState(100), [busy,setBusy]=useState(false), [error,setError]=useState(''), [chat,setChat]=useState(''), [visitor,setVisitor]=useState(''), [historyOpen,setHistoryOpen]=useState(false), [visitOpen,setVisitOpen]=useState(false), [ip,setIp]=useState(''), [ipError,setIpError]=useState(false), [journal,setJournal]=useState(null), [notice,setNotice]=useState('');
    const alive=useRef(false), active=useRef(false), visitorId=useRef(''), revision=useRef(0), apiRef=useRef(api);
    apiRef.current=api;
    const apply = result => {
      const next=result && (result.state || result.snapshot || (Array.isArray(result.beans) ? result : null));
      if(next) setSnapshot(next);
    };
    useEffect(()=>{
      alive.current=true;
      try { visitorId.current=localStorage.getItem('mung-bean-visitor-id') || ''; } catch {}
      if(!visitorId.current) { visitorId.current=globalThis.crypto?.randomUUID?.() || `guest-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; try {localStorage.setItem('mung-bean-visitor-id',visitorId.current);} catch {} }
      let loading=false;
      const poll=async()=>{
        if(loading || active.current) return;
        loading=true; const stamp=revision.current;
        try {const result=await apiRef.current({action:'state',visitorId:visitorId.current}); if(alive.current && stamp===revision.current) apply(result);}
        catch {if(alive.current && stamp===revision.current) setError(previous=>previous || tr('mb.connectError'));}
        finally {loading=false;}
      };
      poll(); const timer=setInterval(poll,8000);
      return()=>{alive.current=false;clearInterval(timer);};
    },[api,visitorMode]);
    const beans=Array.isArray(snapshot?.beans) ? snapshot.beans : [];
    const bean=beans.find(b=>String(b.id)===selected) || beans[0];
    const stage=clamp(bean?.stage,0,12);
    const act=async(action,extra={})=>{
      if(active.current)return false;
      active.current=true; revision.current++; setBusy(true);setError('');setNotice('');
      try {
        const result=await apiRef.current({action,beanId:bean?.id,visitor:visitorMode ? (visitor.trim() || tr('mb.visitorPlaceholder')) : undefined,visitorId:visitorId.current,...extra});
        if(!alive.current)return false;
        apply(result);
        if(result?.ok===false || result?.error) {setError(text(result.error?.message || result.error || result.message) || tr('mb.actionError'));return false;}
        if(action==='history')setJournal(result?.history || result?.entries || result?.state?.beans?.find(b=>b.id===bean?.id)?.history || bean?.history || []);
        if(action==='chat' && result?.reply){setNotice(text(result.reply));if(result.chatAi?.status==='provisional')setError(`${tr('mb.aiFailed')} ${result.chatAi.error || ''}`);}
        return true;
      } catch(e) {if(alive.current)setError(e.message || tr('mb.actionError'));return false;}
      finally {active.current=false;if(alive.current)setBusy(false);}
    };
    const ai=bean?.ai || snapshot?.ai || {};
    const aiFailed=ai.status==='error' || ai.status==='failed' || !!ai.error || !!bean?.aiError || snapshot?.aiStatus==='error';
    const canAwaken=!visitorMode && stage!==12;
    const history=Array.isArray(journal) ? journal : Array.isArray(bean?.history) ? bean.history : [];
    const stageName=tr(`mb.stage${stage}`);
    const growth=bean?.progress || {};
    const needs=snapshot?.stages?.[stage]?.requirements || bean?.requirements || {};
    const progressValue=Math.min(100,Math.round((clamp(growth.water,0,9999)+clamp(growth.energy,0,9999))/50*100));
    const urls=Array.isArray(snapshot?.network?.lanUrls)?snapshot.network.lanUrls:[];
    return h('section',{className:'mb-garden','aria-label':tr('mb.subtitle')},
      h('header',{className:'mb-header'},h('div',null,h('p',{className:'mb-eyebrow'},tr('mb.subtitle')),h('h1',null,tr('mb.title'))),h('nav',{className:'mb-header-actions','aria-label':tr('mb.subtitle')},
        h('button',{className:'mb-tool-button',type:'button',onClick:()=>{setJournal(null);setHistoryOpen(true);act('history');}},h(Icon,{name:'history'}),h('span',null,tr('mb.history'))),
        h('button',{className:'mb-tool-button',type:'button',onClick:()=>setVisitOpen(true)},h(Icon,{name:'visit'}),h('span',null,tr('mb.visit'))))),
      visitorMode && h('p',{className:'mb-visitor-badge'},h(Icon,{name:'leaf'}),tr('mb.visitor')),
      h('div',{className:'mb-canvas'},
        h('div',{className:'mb-care-tools'},[['water','water'],['sun','sun'],['attention','attention']].map(([action,icon])=>h('button',{key:action,className:`mb-care mb-care-${action}`,type:'button',disabled:visitorMode || busy || !bean || stage===12,onClick:()=>act(action),'aria-label':tr(`mb.${action}`),title:tr(`mb.${action}`)},h(Icon,{name:icon}),h('span',null,tr(`mb.${action}`))))),
        h('div',{className:'mb-canvas-note','aria-hidden':true},h('span',null,String(stage+1).padStart(2,'0')),h('i',null,'/ 13')),
        h('div',{className:'mb-artwork'},h('svg',{className:'mb-ground',viewBox:'0 0 1000 140',preserveAspectRatio:'none','aria-hidden':true},
          h('path',{d:'M20 39Q180 28 310 40T600 38T980 40M50 44Q240 38 410 46T950 44',stroke:'#40403a',fill:'none',strokeWidth:1.2}),
          Array.from({length:75},(_,i)=>h('path',{key:i,d:`M${25+i*13} ${47+(i*7)%24}l${8+(i%4)*3} ${-2-(i%3)}`,stroke:'#77776e',strokeWidth:.7,opacity:.25+(i%4)*.1})),
          h('path',{d:'M90 40q-9-18-17-16m17 16q-1-24 8-28M877 42q-5-16-14-18m14 18q2-21 13-26',fill:'none',stroke:'#33332f',strokeWidth:1.3})),
          h('div',{className:'mb-bean-row',style:{'--mb-scale':scale/100}},beans.map(b=>h('button',{key:b.id,className:`mb-bean ${bean?.id===b.id?'mb-bean-selected':''}`,type:'button',onClick:()=>{setSelected(String(b.id));setNotice('');setJournal(null);},'aria-pressed':bean?.id===b.id,'aria-label':b.name || tr('mb.unnamed')},h(BeanArt,{bean:b}),h('span',{className:'mb-bean-name'},b.name || tr('mb.unnamed')))))),
        !snapshot && h('p',{className:'mb-empty',role:'status'},tr('mb.loading')),
        snapshot && !beans.length && h('p',{className:'mb-empty'},tr('mb.empty')),
        bean && h('div',{className:'mb-speech',key:bean.id,'aria-live':'polite'},h('span',{className:'mb-speech-dot','aria-hidden':true}),notice || text(bean.lastReply) || tr('mb.ready')),
        h('label',{className:'mb-scale'},h(Icon,{name:'leaf'}),h('span',{className:'mb-sr-only'},tr('mb.scale')),h('input',{type:'range',min:60,max:140,step:5,value:scale,onChange:e=>setScale(Number(e.target.value)),'aria-label':tr('mb.scale')}),h('output',null,`${scale}%`))),
      h('div',{className:'mb-details'},h('div',{className:'mb-stage-header'},h('div',null,h('span',{className:'mb-kicker'},`${tr('mb.stage')} ${stage} / 12`),h('h2',null,bean ? stageName : tr('mb.loading'))),beans.length>1 && h('label',{className:'mb-select-label'},h('span',{className:'mb-sr-only'},tr('mb.select')),h('select',{value:bean?.id||'',onChange:e=>{setSelected(e.target.value);setNotice('');setJournal(null);}},beans.map(b=>h('option',{key:b.id,value:b.id},b.name || tr('mb.unnamed')))))),
        h('div',{className:'mb-growth'},h('div',{className:'mb-growth-label'},h('span',null,stage===12?tr('mb.maxStage'):tr('mb.progress')),h('span',null,`${stage===12?100:progressValue}%`)),h('progress',{max:100,value:stage===12?100:progressValue,'aria-label':tr('mb.progress')})),
        h('div',{className:'mb-stats'},[['water','waterStat','water'],['energy','energy','sun'],['joy','joy','attention']].map(([key,label,icon])=>h('div',{className:'mb-stat',key},h('div',{className:'mb-stat-title'},h(Icon,{name:icon}),h('span',null,tr(`mb.${label}`)),h('strong',null,Math.round(clamp(bean?.[key],0,100)*10)/10)),h('meter',{min:0,max:100,value:clamp(bean?.[key],0,100),'aria-label':tr(`mb.${label}`)}),h('small',null,`${tr('mb.today')} · ${Math.round(clamp(bean?.daily?.[key],0,9999))}`)))),
        bean?.conditions?.length>0 && h('p',{className:'mb-conditions'},h('span',null,`${tr('mb.condition')}: `),bean.conditions.map(c=>tr(`mb.${text(c)}`)).filter(Boolean).join(' · ')),
        bean?.expression && h('p',{className:'mb-personality'},h('span',null,`${tr('mb.expression')} · `),text(bean.expression)),
         bean?.personality && h('p',{className:'mb-personality'},h('span',null,`${tr('mb.personality')} · `),typeof bean.personality==='string'?bean.personality:Object.values(bean.personality).map(text).filter(Boolean).join(' · '))),
      (error || aiFailed) && h('div',{className:'mb-alert',role:'alert'},h(Icon,{name:'info'}),h('span',null,error || tr('mb.aiFailed')),h('button',{type:'button',className:'mb-text-button',disabled:busy,onClick:()=>{if(aiFailed&&canAwaken)act('refresh');else act('state');}},h(Icon,{name:'retry'}),tr(aiFailed&&canAwaken?'mb.awaken':'mb.retry'))),
      h('form',{className:'mb-chat',onSubmit:async e=>{e.preventDefault();const message=chat.trim();if(message && await act('chat',{message}))setChat('');}},
        visitorMode && h('label',{className:'mb-visitor-input'},h('span',null,tr('mb.visitorName')),h('input',{value:visitor,onChange:e=>setVisitor(e.target.value),maxLength:40,placeholder:tr('mb.visitorPlaceholder'),autoComplete:'nickname'})),
        h('label',{className:'mb-chat-input'},h('span',null,tr('mb.chatLabel')),h('input',{value:chat,onChange:e=>setChat(e.target.value),maxLength:1000,placeholder:tr('mb.chatPlaceholder'),disabled:!bean,autoComplete:'off'})),h('button',{className:'mb-send',type:'submit',disabled:busy || !bean || !chat.trim(),'aria-label':tr('mb.send')},h(Icon,{name:'send'}))),
      busy && h('p',{className:'mb-working',role:'status'},tr('mb.aiWorking')),
      h('details',{className:'mb-rules'},h('summary',null,h(Icon,{name:'info'}),tr('mb.rules')),h('p',null,tr('mb.rulesText')),h('ol',{className:'mb-lifecycle','aria-label':tr('mb.lifecycle')},Array.from({length:13},(_,i)=>h('li',{key:i,'aria-current':stage===i?'step':undefined,className:i<=stage?'mb-reached':''},h('span',null,String(i).padStart(2,'0')),tr(`mb.stage${i}`))))),
      h(Modal,{open:historyOpen,onClose:()=>setHistoryOpen(false),title:tr('mb.history'),closeLabel:tr('mb.close')},h('p',{className:'mb-modal-subtitle'},bean?.name || tr('mb.unnamed')),history.length ? h('ol',{className:'mb-journal'},[...history].reverse().map((entry,i)=>h('li',{key:entry.id || i},h('time',null,text(entry.date || entry.at || entry.timestamp)),h('strong',null,text(entry.visitor || entry.title) || tr('mb.journalEntry')),h('p',null,text(entry.message)),entry.reply && h('p',{className:'mb-journal-reply'},`${bean?.name || tr('mb.unnamed')} · ${text(entry.reply)}`)))) : h('p',{className:'mb-journal-empty'},tr('mb.noHistory'))),
      h(Modal,{open:visitOpen,onClose:()=>setVisitOpen(false),title:tr('mb.visitTitle'),closeLabel:tr('mb.close')},h('p',{className:'mb-modal-subtitle'},tr('mb.visitHint')),
        h('form',{className:'mb-visit-form',onSubmit:e=>{e.preventDefault();const address=ip.trim();if(!ipv4(address)){setIpError(true);return;}setIpError(false);globalThis.open(`http://${address.split('.').map(Number).join('.')}:19816/bean/`,'_blank','noopener,noreferrer');}},h('label',null,tr('mb.ip'),h('input',{value:ip,onChange:e=>{setIp(e.target.value);setIpError(false);},placeholder:'192.168.1.12',inputMode:'decimal',autoComplete:'off','aria-invalid':ipError,'aria-describedby':ipError?'mb-ip-error':undefined,required:true})),ipError&&h('p',{id:'mb-ip-error',className:'mb-field-error',role:'alert'},tr('mb.ipError')),h('button',{type:'submit',className:'mb-primary'},h(Icon,{name:'visit'}),tr('mb.openGarden'))),
        urls.length>0&&h('div',{className:'mb-lan-links'},h('h3',null,tr('mb.yourGarden')),urls.map((url,i)=>{let safe='';try{const u=new URL(url);if(u.protocol==='http:'&&ipv4(u.hostname))safe=u.href;}catch{}return safe?h('a',{href:safe,target:'_blank',rel:'noopener noreferrer',key:i},safe):null;}))));
  };
}
