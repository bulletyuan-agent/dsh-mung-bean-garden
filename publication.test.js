import test from 'node:test';
import assert from 'node:assert/strict';
import {join} from 'node:path';
import {readFile} from 'node:fs/promises';
import {resolveDataDir} from './index.js';

test('default saves are profile-scoped and independent of install directory/version',()=>{
  assert.equal(resolveDataDir(undefined,'profile-one','user-home'),join('profile-one','data','mung-bean-garden'));
  assert.equal(resolveDataDir(undefined,'','user-home'),join('user-home','.dsh','data','mung-bean-garden'));
  assert.equal(resolveDataDir('custom-saves','profile-one','user-home'),'custom-saves');
});

test('public manifest and prebuilt artifacts agree and contain no developer path',async()=>{
  const get=name=>readFile(new URL(name,import.meta.url),'utf8');
  const manifest=JSON.parse(await get('package.json'));
  assert.equal(manifest.name,'@bulletyuan-agent/dsh-mung-bean-garden');
  const [host,client,patch]=await Promise.all([manifest.exports['.'],manifest.exports['./client'],'cordis.patch.yml'].map(get));
  assert.match(client,/id: '@bulletyuan-agent\/dsh-mung-bean-garden'/);
  assert.ok(patch.includes(manifest.name));
  assert.doesNotMatch(patch,/dataDir:/);
  for(const text of [host,client,patch])assert.doesNotMatch(text,/\/Users\/|Documents\/deepseek-harness|verification-20261104/);
  assert.match(host,/resolveDataDir\(config.dataDir\)/);
});
