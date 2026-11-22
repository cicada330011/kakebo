const KEY='kakebo.data.v3';
export const seed=()=>({version:3,currency:'BDT',wallets:[{id:'cash',name:'Cash',type:'Cash',balance:0,active:true},{id:'bkash',name:'bKash',type:'MFS',balance:0,active:true},{id:'nagad',name:'Nagad',type:'MFS',balance:0,active:true},{id:'bank',name:'Bank',type:'Bank',balance:0,active:true}],savings:{balance:0,loansReceivable:0},categories:{expense:['Food','Transport','Shopping','Bills','Health','Other'],income:['Salary','Business','Gift','Other']},transactions:[],loans:[],pendingReturns:[]});
export function load(){try{const x=JSON.parse(localStorage.getItem(KEY));if(x&&x.version===3)return x;}catch(e){console.warn('Kakebo data reset:',e)}return seed()}
export let state=load();
export function save(){if(typeof localStorage!=='undefined')localStorage.setItem(KEY,JSON.stringify(state));if(typeof window!=='undefined')window.dispatchEvent(new Event('kakebo:change'))}
export function resetDemo(){state=seed();save()}
