---
title: Errors & limits
description: HTTP status codes and limits for the Teiwah API.
---

## Error responses

Errors return a JSON body with a numeric `statusCode`, a `message`, and a short
`error` label. `message` is a string for most errors, or an array of strings for
validation errors.

```json
{
  "statusCode": 403,
  "message": "Cannot start a new conversation with this contact; they must message you first",
  "error": "Forbidden"
}
```

| Status | Meaning |
| --- | --- |
| `400` | Validation error — missing `chatId`, neither/both of `text` and `media`, or missing `media.type`. |
| `401` | Missing or invalid session API key. |
| `403` | Cold 1:1 reach-out to an untrusted contact (they must message you first). See [Trusted contacts](/guides/send-message/#trusted-contacts). |
| `404` | Unknown/too-old message id on `POST /read`, or media not found/expired on `GET /media/:id`. |
| `413` | Base64 payload exceeds the 16 MB decoded limit — use `media.url` instead. |
| `422` | A `media.url` could not be fetched at send time (bad or unreachable link). |
| `503` | The session is offline (not currently connected to WhatsApp). |

## Limits

| Limit | Value |
| --- | --- |
| Base64 media (decoded) | 16 MB — larger payloads must use `media.url` |
| Cold 1:1 reach-out | Blocked until the contact messages you first (replies always work) |

## Scope notes (v1)

- 1:1 and group messaging are both supported.
- Quoted replies are supported via `quoteMessageId`.
- Still out of scope: mentions, reactions/edits/deletes, polls, stickers, contact
  cards, and view-once.
