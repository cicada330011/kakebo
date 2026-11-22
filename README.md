# Kakebo v0.3 — Functional finance core

This package is a replacement source bundle for the v0.2 starter. Extract it and upload the **contents** to the root of the `cicada330011/kakebo` repository, replacing the previous `index.html`, `css/`, and `js/` files when prompted. Do not upload the ZIP as the app.

## Implemented in this stage
- Local browser persistence (localStorage)
- Income, expense and wallet-to-wallet transfers (transfer fees supported)
- Wallet creation and opening balances
- Savings deposits, withdrawals with pending-return tracking, partial/full returns, and finalizing unreturned balance as an expense
- Separate Savings loans receivable and regular-wallet loans receivable
- Partial/full loan repayments
- Custom income sources and expense categories
- Dashboard, wallet list, transaction ledger, Savings, Debt/Loan and monthly summary views
- Savings excluded from regular current balance; transfers are not counted as income/expense

## Important limitations
- Data is stored only in the current browser/device. Google account login, automatic cloud backup and restore are not implemented yet.
- No production security, multi-device sync, export/import, recurring transactions, charts, credit-card statement logic, or transaction edit/delete in this stage.
- This is a client-side prototype. Back up browser data before clearing site data.

## Run
Open `index.html` through a static web server or GitHub Pages. ES modules may not work from `file://` directly.
