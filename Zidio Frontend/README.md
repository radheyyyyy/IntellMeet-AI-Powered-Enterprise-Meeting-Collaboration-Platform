# IntellMeet Frontend

React + Vite client for the IntellMeet collaboration backend.

## Start locally

1. Copy `.env.example` to `.env`.
2. Keep the backend running at `http://localhost:5000`.
3. From this folder run:

```powershell
npm run dev
```

Open the address printed by Vite, normally `http://localhost:5173`.

## Environment variables

```env
VITE_API_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
```

`VITE_API_URL` is used for backend REST requests. `VITE_SERVER_URL` is used to open locally uploaded files.

## Included screens

- Login and signup
- Protected dashboard
- Teams
- Meetings
- Kanban-style task board
- Shared file upload and browsing
- Meeting calendar
- Account password change

The app stores the access token in browser local storage to match the current backend authentication API.
