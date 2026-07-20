# IntellMeet Backend API

All protected routes require `Authorization: Bearer <accessToken>`.

## Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh-token`
- `POST /api/auth/logout`
- `GET /api/auth/me`

## Teams

- `POST /api/teams`
- `GET /api/teams`
- `GET|PUT|DELETE /api/teams/:id`
- `POST /api/teams/:id/members`
- `DELETE /api/teams/:id/members/:userId`

## Meetings

- `POST|GET /api/meetings`
- `GET|PUT|DELETE /api/meetings/:id`
- `GET /api/meetings/code/:code`
- `GET /api/meetings/analytics`
- `GET /api/meetings/history`
- `POST /api/meetings/:id/join|leave|start|end`

## Persistent collaboration data

- `POST /api/messages`, `GET /api/messages/meeting/:meetingId`, `DELETE /api/messages/:id`
- `POST|GET /api/notifications`, `PATCH /api/notifications/:id/read`, `DELETE /api/notifications/:id`
- `POST|GET /api/tasks`, `GET|PUT|DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/status`
- `GET /api/tasks/analytics|board|board/team/:teamId`
- `POST /api/boards`, `GET /api/boards/team/:teamId`, `GET /api/boards/:id`, `POST /api/boards/:id/columns`
- `POST /api/files/upload`, `GET /api/files`, `GET|DELETE /api/files/:id`
- `POST /api/recordings/meeting/:meetingId`, `GET /api/recordings/meeting/:meetingId`

## AI meeting intelligence

- `POST /api/ai/meetings/:meetingId/generate` with `{ "transcript": "..." }`
- `GET /api/ai/meetings/:meetingId`

Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` (defaults to `gpt-4.1-mini`) before calling the generation endpoint.

## Socket events

- Presence: `register-user`, `online-users`
- Rooms: `join-room`, `leave-room`, `user-joined-room`, `user-left-room`
- Chat: `send-message`, `receive-message`
- Typing: `typing-start`, `typing-stop`, `user-typing`, `user-stop-typing`
- Notifications: `create-notification`, `receive-notification`
- WebRTC signaling: `user-ready`, `offer`, `answer`, `ice-candidate`
- Kanban: `task-status-updated`


{
  "firstName": "Raj",
  "lastName": "Radhey",
  "email": "raj@example.com",
  "password": "Password123"
}