import assert from 'node:assert/strict';
globalThis.localStorage={setItem(){},getItem(){return null}};
const {state,seed}=await import('../js/core/store.js');const E=await import('../js/core/engine.js');
Object.assign(state,seed());
E.addTransaction('income',{amount:2000,walletId:'cash',category:'Salary'});
assert.equal(state.wallets[0].balance,2000);
E.addTransaction('transfer',{amount:500,fromWalletId:'cash',toWalletId:'bkash',fee:10});
assert.equal(state.wallets[0].balance,1500);assert.equal(state.wallets[1].balance,490);
assert.equal(E.incomeTotal(),2000);assert.equal(E.expenseTotal(),10);
E.addSavingsDeposit('cash',300);assert.equal(state.savings.balance,300);assert.equal(E.regularBalance(),1690);
const p=E.withdrawSavings(100,'cash');assert.equal(state.savings.balance,200);assert.equal(p.remaining,100);
E.returnToSavings(p.id,40);assert.equal(state.savings.balance,240);assert.equal(p.remaining,60);
E.finalizePending(p.id);assert.equal(E.expenseTotal(),70);assert.equal(p.status,'finalized');
const l=E.lend('savings',100,'A');assert.equal(state.savings.balance,140);assert.equal(state.savings.loansReceivable,100);
E.repayLoan(l.id,40,'');assert.equal(state.savings.balance,180);assert.equal(state.savings.loansReceivable,60);
const r=E.lend('cash',200,'B');assert.equal(state.wallets[0].balance,1000);E.repayLoan(r.id,50,'bkash');assert.equal(state.wallets[1].balance,540);assert.equal(r.remaining,150);
console.log('Kakebo engine tests passed');
// v0.4 transfer preview and separate borrowed-debt track
assert.deepEqual(E.transferPreview(1500,20),{amount:1500,fee:20,targetGets:1480,valid:true});
assert.equal(E.transferPreview(100,100).valid,false);
const beforeIncome=E.incomeTotal(), beforeExpense=E.expenseTotal();
const borrowed=E.borrow('cash',300,'Lender A','Short-term borrow');
assert.equal(borrowed.direction,'borrowed');
assert.equal(state.wallets[0].balance,1300);
assert.equal(E.incomeTotal(),beforeIncome,'Borrowed money must not count as income');
E.repayBorrowed(borrowed.id,100,'cash');
assert.equal(state.wallets[0].balance,1200);
assert.equal(borrowed.remaining,200);
assert.equal(E.expenseTotal(),beforeExpense,'Debt repayment must not count as expense');
E.repayBorrowed(borrowed.id,200,'cash');
assert.equal(borrowed.status,'paid');
assert.equal(E.borrowedOutstanding(),0);
assert.throws(()=>E.addTransaction('expense',{amount:99999,walletId:'cash'}),/Not enough balance/);
console.log('Kakebo v0.4 transfer and debt tests passed');

// Regression: browser FormData supplies amounts as strings. Totals must add
// numeric values rather than concatenate strings ("020500" => 20500).
Object.assign(state,seed());
E.addTransaction('income',{amount:'500',walletId:'cash',category:'Salary'});
E.addTransaction('income',{amount:'20',walletId:'bkash',category:'Salary'});
E.addTransaction('transfer',{amount:'50',fromWalletId:'cash',toWalletId:'bkash',fee:'0'});
assert.equal(state.wallets.find(w=>w.id==='cash').balance,450);
assert.equal(state.wallets.find(w=>w.id==='bkash').balance,70);
assert.equal(E.regularBalance(),520);
assert.equal(E.incomeTotal(),520);
assert.equal(E.expenseTotal(),0);
assert.equal(typeof state.transactions.find(t=>t.type==='income').amount,'number');
console.log('String amount regression test passed');
