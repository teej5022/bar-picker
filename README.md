# Bar Picker

A lightweight React app for maintaining a shared bar list and selecting a monthly bar to attend.

## Features

- Two-page app flow: `/login` and `/bars`
- Route protection: unauthenticated users are redirected to `/login`
- Shared list of bars persisted in `localStorage`
- Role-based access for admins and subscribers
- Admins can create invites, add/edit/remove bars, and rotate the monthly pick
- Subscribers create separate accounts with invite codes, then log in with their own credentials
- Subscribers can add bars and RSVP to the bar of the month
- Automatic monthly bar selection (once per month)
- Shared monthly check-in list so everyone can see who is going
- Optional browser notification for monthly pick
- Manual "Run monthly check" button to refresh current month pick

## Roles

- **Admin:** `admin` / `barpicker2026`
- **Subscriber signup:** requires an invite code from an admin
- **Subscriber login:** uses the username/password created during signup

## Routes

- `/login` — login page
- `/bars` — protected bar list page (requires login)

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production bundle
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint
