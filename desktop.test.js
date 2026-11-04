import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {Script} from 'node:vm';
import {apply} from './index.js';

test('desktop artifact embeds UI/CSS and uses no native imports or HTTP fetches',async()=>{
  const source=await readFile(new URL('client.js',import.meta.url),'utf8');
  new Script(source,{filename:'dsh-app-client.js'});
  assert.match(source,/function createGarden\(React\)/);assert.match(source,/\.mb-garden\{/);
  assert.doesNotMatch(source,/\bimport\s*\(/);assert.doesNotMatch(source,/\bfetch\s*\(/);
  assert.doesNotMatch(source,/['"]\/mung-bean\//);
  assert.match(source,/connection\.rpc\.call\('\/api','mung-bean\/execute',args,lifetime.signal\)/);
});

test('desktop exact owner route returns correlated RPC and shares operations with tool',async t=>{
  const dataDir=await mkdtemp(join(tmpdir(),'bean-desktop-test-'));
  const disposers=[];let route,tool,removed=false;
  const ctx={
    effect(fn){const dispose=fn();if(typeof dispose==='function')disposers.push(dispose);},
    agentDefaultModel:{currentSelection:()=>({provider:'test',model:'test'})},
    llm:{async *stream(){yield {type:'text-delta',text:JSON.stringify({reply:'你好',personality:'好奇',speech:'轻声',expression:'sad',appearance:{width:50,height:60}})};}},
    connection:{fetch:{register(value){route=value;return async()=>{removed=true;};}}},
    webServer:{register(){return ()=>{};}},tools:{register(value){tool=value;return ()=>{};}}
  };
  t.after(async()=>{for(const dispose of disposers.reverse())await dispose();assert.equal(removed,true);assert.equal(resolve(dataDir).startsWith(resolve(tmpdir())+'/bean-desktop-test-'),true);await rm(dataDir,{recursive:true,force:true});});
  await apply(ctx,{dataDir,port:0});
  assert.equal(route.path,'/api/mung-bean/execute');assert.deepEqual(route.methods,['POST']);assert.equal(route.requestBody,'buffered');
  const call=async(payload,signal)=>{
    const req=new Request('http://owned-host/api/mung-bean/execute',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'client-request',rpcId:'test-123',method:'mung-bean/execute',payload}),signal});
    const response=await route.fetch(req);assert.equal(response.status,200);const envelope=await response.json();assert.equal(envelope.type,'server-response');return envelope;
  };
  let response=await call({action:'state'});assert.equal(response.rpcId,'test-123');
  assert.equal(response.result.ok,true);assert.equal(response.result.value.selected.water,0);
  assert.equal(response.result.value.network.clientTransport.protocol,'connection-rpc');
  assert.ok(response.result.value.network.clientTransport.lastRequestAt);
  response=await call({action:'attention'});assert.equal(response.result.value.selected.joy,2);
  assert.equal((await tool.execute({action:'state'})).selected.joy,2);
  response=await call(null);assert.equal(response.result.ok,false);assert.equal(response.rpcId,'test-123');
  response=await call({action:'invalid'});assert.equal(response.result.ok,false);assert.match(response.result.error.message,/Unknown action/);
  const controller=new AbortController();controller.abort();response=await call({action:'water'},controller.signal);
  assert.equal(response.result.ok,false);assert.equal((await tool.execute({action:'state'})).selected.water,0);
  assert.equal(removed,false);
});
