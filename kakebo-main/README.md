# Kakebo v0.4 — Transfer & Debt/Loan upgrade

This update builds on the v0.3 starter and preserves the existing `kakebo.data.v3` browser storage key so current browser data can be loaded.

## Included in v0.4
- Live Wallet Transfer preview: amount, fee, and **Target Gets** update as the user types.
- Transfer validation: different source/target wallets, fee lower than transfer amount, and sufficient source balance.
- Prevents regular-wallet spending, Savings deposits/withdrawals, lending, and repayments from silently creating negative balances.
- Adds a separate **Borrow money** flow. Borrowed funds increase the selected wallet but are not Income.
- Adds partial/full repayment of borrowed money. Repayments reduce the selected wallet but are not Expenses.
- Keeps money lent to others separate from money borrowed, with independent outstanding totals.
- Preserves the separate Savings-loan receivable logic and regular-wallet loan receivable logic.
- Adds transaction records and repayment history data for loan activity.

## Install/update on GitHub
Extract this ZIP and upload its contents to the root of the existing `cicada330011/kakebo` repository. Replace files when GitHub reports a same-name file. Do not upload the ZIP as the app itself. Keep unrelated files such as the old starter ZIP unless you later choose to clean them up.

## Test
Run `node --experimental-default-type=module tests/engine.test.mjs` in a Node.js environment. The included tests cover the existing v0.3 core as well as transfer preview, borrowing, partial/full debt repayment, and insufficient-balance protection.

## Important limitations
- This is still a browser-local prototype; Google sign-in/cloud backup and cross-device sync are not included.
- Existing older loans are treated as money lent (receivable) unless explicitly marked `direction: "borrowed"`.
- This update does not yet complete all planned modules such as inline add-new controls on every dropdown, transaction editing/deletion, advanced reports, or full Google backup/restore.
