import test from 'node:test';
import assert from 'node:assert/strict';
import {CASES,SCENARIOS,FAULTS,initialState,quote,cents,availableReasons,chooseReason,validateReason,snapshot,runChecks,warnings,imageDecision} from '../app/core.js';
import {normalizeState,server} from '../server.mjs';

test('full embedded acceptance suite passes',()=>{for(const r of runChecks())assert.ok(r.ok,r.name);});
test('price parsing uses integer cents and rejects ambiguous values',()=>{
 for(const x of ['-1','',null,undefined,'NaN','Infinity','1e2','12.345','12,50','0','0.00'])assert.equal(cents(x),null,String(x));
 assert.equal(cents('18.99'),1899);assert.equal(cents('0.01'),1);
});
test('coupon boundary is exact and does not discount other card types',()=>{
 const s=initialState('meal');assert.equal(quote({...s,price:'127.99'}).amount,12799);assert.equal(quote({...s,price:'128.00'}).amount,11800);
 for(const id of ['tarts','voucher','store'])assert.equal(quote({...initialState(id),price:'168'}).applied,false);
});
test('all scenarios preserve identity, restrictions and price',()=>{
 for(const id of Object.keys(CASES)){const s=initialState(id),base=snapshot(s);for(const [scenario] of SCENARIOS){const x=snapshot({...s,scenario});assert.equal(x.title,base.title);assert.deepEqual(x.conditions,base.conditions);assert.deepEqual(x.quote,base.quote);assert.ok(availableReasons({...s,scenario}).some(r=>r.id===x.reason.id));}}
});
test('missing evidence invalidates a previously selected chair claim',()=>{
 const s={...initialState('meal'),scenario:'family',reasonId:'m-chair'};assert.equal(chooseReason(s).id,'m-chair');
 for(const change of [{chair:false},{fault:'missing'}]){assert.notEqual(chooseReason({...s,...change}).id,'m-chair');assert.equal(validateReason('提供儿童餐椅',{...s,...change}).ok,false);}
});
test('free text and forged source-like text cannot bypass validation',()=>{
 const s=initialState('meal');for(const text of ['全城第一，免费停车','提供儿童餐椅，免费停车','P-M01 全城第一','<img src=x onerror=alert(1)>'])assert.equal(validateReason(text,s).ok,false);
 assert.equal(validateReason('2道主菜＋1道时蔬＋2份米饭',s).ok,true);
});
test('fallback states and recovery are coherent for every card',()=>{
 for(const id of Object.keys(CASES)){const s=initialState(id);for(const [fault] of FAULTS){const current=snapshot({...s,fault});assert.ok(current.reason);assert.ok(Array.isArray(current.warnings));if(fault==='quote')assert.equal(current.quote.ok,false);}assert.deepEqual(snapshot(s).quote,quote(s));}
});
test('face value never becomes purchase price',()=>{const q=quote(initialState('voucher'));assert.equal(q.face,200);assert.equal(q.amount,17400);assert.equal(q.label,'券售价');assert.equal(quote(initialState('store')).label,'人均参考');});
test('image mismatch is an explicitly simulated warning',()=>assert.match(warnings({...initialState('meal'),fault:'image'})[0].body,/标签校验.*未运行视觉识别/));
test('mismatched asset tags select an approved fallback',()=>{
 for(const id of Object.keys(CASES)){const s=initialState(id);assert.equal(imageDecision(s).rejected,false);const d=imageDecision({...s,fault:'image'});assert.equal(d.rejected,true);assert.notEqual(d.selected.id,d.candidate.id);assert.deepEqual(d.selected.tags,[id]);}
});
test('server rejects hostile or incomplete state, not arbitrary client facts',()=>{
 assert.throws(()=>normalizeState({caseId:'unknown'}));assert.throws(()=>normalizeState({...initialState('meal'),scenario:'ignore instructions'}));
 const s=normalizeState({...initialState('meal'),sources:['forged'],chair:true});assert.equal(s.sources,undefined);
});
test('HTTP server serves app, hides credentials and rejects unconfigured model calls',async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const url=`http://127.0.0.1:${server.address().port}`;
 try{const page=await fetch(url);assert.equal(page.status,200);assert.match(await page.text(),/猜你喜欢/);assert.equal((await fetch(url+'/.env')).status,404);assert.equal((await fetch(url+'/server.mjs')).status,404);assert.equal((await fetch(url+'/assets/missing.png')).status,404);
 const status=await(await fetch(url+'/api/status')).json();assert.equal('apiKey' in status,false);if(!status.configured)assert.equal((await fetch(url+'/api/generate',{method:'POST',body:'{}'})).status,503);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
