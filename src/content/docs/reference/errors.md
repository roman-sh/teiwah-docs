---
title: Errors & limits
description: HTTP status codes and limits for the Teiwah API.
---

## Error responses

Errors return a JSON body with an `error` message:

```json
{
  "error": "message.type is required"
}
```

| Status | Meaning |
| --- | --- |
| `400` | Validation error — missing `to`, missing `message.type`, or content does not match the type. |
| `401` | Missing or invalid session API key. |
| `404` | Media not found or expired (`GET /media/{id}`). |
| `413` | Base64 payload exceeds the 16 MB decoded limit — use `mediaUrl` instead. |

## Limits

| Limit | Value |
| --- | --- |
| Base64 media (decoded) | 16 MB — larger payloads must use `mediaUrl` |
| Groups | Out of scope in v1 (1:1 conversations only) |

## Scope notes (v1)

- v1 targets 1:1 automation. Group messaging is not supported yet.
- Reply threading is not part of v1; use `webhook.from` → `POST /messages.to` to respond.
