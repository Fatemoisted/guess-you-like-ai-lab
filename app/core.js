export const CASES = {
  tarts: {
    id:'tarts', name:'蛋挞商品', kind:'商品卡', category:'烘焙甜品', tag:'看懂一份是什么', icon:'dessert',
    store:'酥禾烘焙', title:'酥禾烘焙｜葡式蛋挞 6只装', original:'特价团 酥禾烘焙 葡式蛋挞特惠', originalReason:'刚刚有人下单',
    image:'tarts.png', price:'18.99', unit:'份', posterPrice:'20',
    contents:'葡式蛋挞 6只／份', conditions:['指定门店自提','具体可用时间需查看商品规则'],
    reference:'截图 01 · 商品卡', observation:'图片内“¥20 / 6只”与卡片“¥18.99”同时出现。',
    interpretation:'可能是活动口径或素材更新时间不同，仅凭截图不能判定价格错误。',
    decision:'示例用商品报价作为售价，图片去除易过期的价格叠字，明确一份为6只。',
    sources:[['P-T01','商品资料','葡式蛋挞，6只／份，指定门店自提。'],['Q-T01','演示报价','当前售价18.99元／份；图片内20元不是结算依据。'],['I-T01','图片记录','6只蛋挞的AI生成示意图，非商家实拍。']],
    reasons:[{id:'t-count',text:'一份 6只，数量一眼看清',source:'P-T01'},{id:'t-pickup',text:'指定门店自提',source:'P-T01'}]
  },
  voucher: {
    id:'voucher', name:'代金券商品', kind:'商品卡', category:'餐饮代金券', tag:'区分面额与售价', icon:'ticket',
    store:'山禾火锅', title:'山禾火锅｜200元代金券', original:'神券 200元代金券 山禾火锅', originalReason:'热门好券 人气之选',
    image:'',price:'174',unit:'张',face:200,posterPrice:'180',
    contents:'面额200元的代金券1张',conditions:['指定门店使用','适用菜品和叠加规则以券详情为准'],
    reference:'截图 02 · 代金券卡',observation:'海报有“180代200”，卡片显示“¥174”与“200元代金券”。',
    interpretation:'面额、素材活动价与当前售价是三个不同字段，不能合并理解。',
    decision:'面额200元固定保留，售价174元单独表达。不将两者差值称作全单优惠比例。',
    sources:[['P-V01','券面资料','面额200元／张；指定门店，范围与叠加规则需查看详情。'],['Q-V01','演示报价','当前券售价174元／张。面额不是售价。'],['I-V01','图片记录','代码绘制的代金券示意图，不是实际券证。']],
    reasons:[{id:'v-face',text:'面额 200元，售价单独看',source:'P-V01'},{id:'v-rule',text:'使用范围与叠加规则请查看详情',source:'P-V01'}]
  },
  store: {
    id:'store',name:'烘焙店铺',kind:'店铺卡',category:'门店选择',tag:'区分人均与团购',icon:'store',
    store:'酥禾烘焙（街角店）',title:'酥禾烘焙（街角店）',original:'神券 酥禾烘焙（街角店）',originalReason:'4.8分 评价700+ 人均¥20',
    image:'store.png',price:'20',unit:'人',promo:'15.90',
    contents:'烘焙甜品店；演示资料确认提供儿童餐椅；停车资料未知。',conditions:['人均消费为参考口径','店内团购商品需单独查看'],
    reference:'截图 03 · 店铺卡',observation:'店名下有人均¥20，优惠条中又出现15.9元商品。',
    interpretation:'店铺决策与具体商品决策混合展示，不能把人均价改成可购买的套餐价。',
    decision:'主价格明确为人均参考；团购入口单独标注商品价，保留店名与分店。',
    sources:[['S-S01','门店资料','酥禾烘焙（街角店），烘焙甜品，提供儿童餐椅；停车信息未知。'],['Q-S01','演示价格','人均消费参考20元；另有15.90元团购商品，二者口径不同。'],['I-S01','图片记录','AI生成的门店环境示意图，不代表商家真实环境。']],
    reasons:[{id:'s-category',text:'烘焙甜品 · 街角门店',source:'S-S01'},{id:'s-chair',text:'提供儿童餐椅',source:'S-S01',requiresChair:true}]
  },
  meal: {
    id:'meal',name:'双人午市套餐',kind:'商品卡',category:'可编辑实验',tag:'验证优惠边界',icon:'utensils',
    store:'山禾小馆',title:'山禾小馆｜双人午市套餐',original:'爆款超值人气必买 双人美食盛宴',originalReason:'精选好店 超值套餐',
    image:'meal.png',price:'128',unit:'套',coupon:{threshold:128,discount:10},
    contents:'2道主菜、1道时蔬、2份米饭；不含饮品；提供儿童餐椅。',conditions:['工作日11:00–14:00','节假日不可用 · 需预约'],
    reference:'补充实验 · 完全虚构',observation:'用于验证优惠门槛、资格、证据缺失和报价失效，不来自真实截图商品。',
    interpretation:'截图不足以建立完整结算规则，因此使用可控的虚构数据测试边界。',
    decision:'128元商品满足满128减10条件时，券后118元；未满足条件时不展示券后价。',
    sources:[['P-M01','套餐资料','双人套餐：2道主菜、1道时蔬、2份米饭，不含饮品。'],['R-M01','使用规则','工作日11:00–14:00，节假日不可用，需预约。'],['S-M01','门店资料','山禾小馆提供儿童餐椅；停车服务未知。'],['Q-M01','演示报价','默认128元／套；用户可编辑价格进行边界测试。'],['C-M01','演示优惠','满128减10，仅适用此套餐，不叠加；默认有领取资格，需领券。'],['I-M01','图片记录','AI生成的套餐示意图，不代表实际商品。']],
    reasons:[{id:'m-contents',text:'2道主菜＋1道时蔬＋2份米饭',source:'P-M01'},{id:'m-time',text:'工作日午市可用，需提前预约',source:'R-M01'},{id:'m-chair',text:'提供儿童餐椅',source:'S-M01',requiresChair:true}]
  }
};

export const SCENARIOS=[['default','默认浏览'],['family','带娃用餐'],['parking','停车便利'],['lunch','双人午餐']];
export const FAULTS=[['normal','正常状态'],['expired','优惠券过期'],['ineligible','无领券资格'],['missing','儿童餐椅证据缺失'],['image','图片含未售饮品'],['quote','报价过期且更新失败']];
export const ELEMENTS=[['image','封面图'],['title','主标题'],['reason','推荐理由'],['price','价格行']];

export function initialState(id='tarts') {return {caseId:id,scenario:'default',fault:'normal',price:CASES[id].price,chair:true,element:'image',reasonId:null,review:'pending',revision:0};}
export function cents(value) {
  const str=String(value).trim();
  if(!/^\d+(\.\d{1,2})?$/.test(str)) return null;
  const n=Math.round(Number(str)*100);
  return Number.isSafeInteger(n)&&n>0&&n<=100000000?n:null;
}
export function money(n) {return (n/100).toFixed(2).replace(/\.00$/,'');}
export function quote(state) {
  const c=CASES[state.caseId]; if(!c) return {ok:false,reason:'未知案例'};
  if(state.fault==='quote')return {ok:false,reason:'报价已过期，无法确认当前价格'};
  const base=cents(state.price); if(base===null)return {ok:false,reason:'请输入大于0、最多两位小数的有效价格'};
  const hasCoupon=!!c.coupon;
  const eligible=state.fault!=='ineligible', active=state.fault!=='expired';
  const reached=hasCoupon&&base>=c.coupon.threshold*100;
  const applied=hasCoupon&&eligible&&active&&reached;
  const amount=base-(applied?c.coupon.discount*100:0);
  return {ok:true,base,amount,applied,face:c.face??null,unit:c.unit,
    label:c.kind==='店铺卡'?'人均参考':applied?'券后价':c.face?'券售价':'商品价',
    note:applied?'需领取满128减10券':hasCoupon&&!active?'券已过期，按商品价展示':hasCoupon&&!eligible?'当前用户无领券资格':hasCoupon&&!reached?'未达到满128元使用门槛':c.kind==='店铺卡'?'参考口径，不是套餐售价':'来自演示报价，非实时交易价格'};
}
export function availableReasons(state) {const c=CASES[state.caseId];return c.reasons.filter(r=>!r.requiresChair||(state.chair&&state.fault!=='missing'));}
export function imageDecision(state) {
  const c=CASES[state.caseId];
  const approved={id:`${c.id}-approved`,file:c.image,tags:[c.id],label:'对应商品 / 门店的合格示意素材'};
  const candidate=state.fault==='image'?{id:`${c.id}-mixed`,file:c.image,tags:[c.id,'unlisted-drink'],label:'额外含未售饮品的候选（标签模拟）'}:approved;
  const unsupported=candidate.tags.filter(tag=>!approved.tags.includes(tag));
  return {candidate,selected:unsupported.length?approved:candidate,rejected:unsupported.length>0,unsupported};
}
export function chooseReason(state) {
  const reasons=availableReasons(state);
  if(state.reasonId&&reasons.some(r=>r.id===state.reasonId))return reasons.find(r=>r.id===state.reasonId);
  if(state.scenario==='family')return reasons.find(r=>r.requiresChair)||reasons[0];
  if(state.scenario==='lunch')return reasons.find(r=>r.id==='m-time')||reasons[0];
  return reasons[0];
}
export function warnings(state) {
  const c=CASES[state.caseId], list=[];
  if(state.scenario==='parking')list.push({type:'warn',title:'停车证据不足',body:'不会生成“停车方便”。保留有依据的基础理由。'});
  if(state.scenario==='family'&&(!state.chair||state.fault==='missing'||!c.reasons.some(r=>r.requiresChair)))list.push({type:'warn',title:'不推断亲子服务',body:'当前资料不支持儿童餐椅承诺，自动回到基础理由。'});
  if(imageDecision(state).rejected)list.push({type:'warn',title:'不匹配图片已拦截',body:'输入候选：额外含饮品 → 标签校验未通过 → 输出：对应商品素材。这里演示标签校验，未运行视觉识别模型。'});
  const q=quote(state);if(!q.ok)list.push({type:'error',title:'价格展示已阻断',body:q.reason+'；不沿用旧报价。'});
  if(['expired','ineligible'].includes(state.fault)&&!c.coupon)list.push({type:'info',title:'此案例没有领券规则',body:'不臆造优惠。请切换“双人午市套餐”验证领券边界。'});
  return list;
}
export function validateReason(text,state) {
  const normalized=String(text).trim();
  if(!normalized)return {ok:false,message:'推荐理由不能为空。'};
  const match=availableReasons(state).find(r=>r.text===normalized);
  if(match)return {ok:true,message:'命中已核实的表达，证据校验通过。',reason:match};
  return {ok:false,message:'这条自由表达未命中已核实事实，不能自动应用。请补充权威资料后审核，或选择已有候选。'};
}
export function snapshot(state) {
  const c=CASES[state.caseId];return {caseId:state.caseId,scenario:state.scenario,fault:state.fault,title:c.title,reason:chooseReason(state),quote:quote(state),conditions:[...c.conditions],warnings:warnings(state),revision:state.revision};
}
export function runChecks() {
  const checks=[];const add=(name,fn)=>{try{checks.push({name,ok:!!fn()});}catch(e){checks.push({name,ok:false,error:e.message});}};
  const s=initialState('meal');
  add('128元满减后为118元',()=>quote(s).amount===11800);
  add('98元未达门槛，不减券',()=>quote({...s,price:'98'}).amount===9800&&!quote({...s,price:'98'}).applied);
  add('168元满减后为158元',()=>quote({...s,price:'168'}).amount===15800);
  add('优惠过期回退128元',()=>quote({...s,fault:'expired'}).amount===12800);
  add('无领取资格不展示券后价',()=>!quote({...s,fault:'ineligible'}).applied);
  add('报价失效不沿用旧金额',()=>!quote({...s,fault:'quote'}).ok);
  add('负数和非法价格被阻断',()=>!quote({...s,price:'-1'}).ok&&!quote({...s,price:'abc'}).ok);
  add('证据移除后餐椅理由失效',()=>!chooseReason({...s,scenario:'family',fault:'missing',reasonId:'m-chair'}).requiresChair);
  add('停车未知不生成停车承诺',()=>!chooseReason({...s,scenario:'parking'}).text.includes('停车'));
  add('拒绝无证据人工改写',()=>!validateReason('全城第一，免费停车',s).ok);
  add('券面额与售价独立',()=>quote(initialState('voucher')).amount===17400&&quote(initialState('voucher')).face===200);
  add('个性化不改变限制和金额',()=>JSON.stringify(snapshot(s).conditions)===JSON.stringify(snapshot({...s,scenario:'family'}).conditions)&&quote(s).amount===quote({...s,scenario:'family'}).amount);
  return checks;
}
