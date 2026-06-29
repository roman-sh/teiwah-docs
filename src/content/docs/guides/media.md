---
title: Working with media
description: Send and receive WhatsApp media with Teiwah.
---

Teiwah represents media as URLs rather than embedding binary data in payloads.
This keeps webhooks small and sends simple. Every media message carries a
`media` object with an explicit `media.type` — one of `image`, `ptt`, `audio`,
`video`, or `document`.

## Inbound media (download)

When a contact sends media to your connected number, the webhook includes a
Teiwah `media.url` instead of the bytes:

```json
{
  "sessionId": "happy-otter-1a2b",
  "id": "3EB0C767D7A0D9D8F8A1",
  "chatId": "972501234567@s.whatsapp.net",
  "participant": null,
  "contact": { "name": "Roman S.", "phoneNumber": "972501234567" },
  "timestamp": 1749420000,
  "media": {
    "type": "image",
    "url": "https://api.teiwah.cloud/media/k7P3x9LmQ2",
    "mimeType": "image/jpeg"
  }
}
```

Download the bytes only if you need them, using your session Bearer key:

```bash
curl https://api.teiwah.cloud/media/k7P3x9LmQ2 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  --output incoming.jpg
```

```mermaid
flowchart LR
  H[Webhook with media.url] --> C[GET /media/:id]
  C --> R[Media bytes streamed back]
```

### Voice notes are inlined

`ptt` (voice notes) are the one inbound type delivered with their bytes already
in the webhook: alongside the usual `media.url`, a `ptt` message also includes
`media.base64`. This is unconditional — voice notes are small and transcription
flows almost always need the bytes immediately, so inlining removes the extra
download round-trip.

```text
ptt                              -> media.url + media.base64   (always)
image / audio / video / document -> media.url only
```

A transcription flow always reads `media.base64`; every other media flow fetches
`media.url`.

## Outbound media (send)

When sending media, provide the bytes one of two ways.

### By URL (preferred)

```json
{
  "chatId": "972501234567",
  "media": {
    "type": "image",
    "url": "https://example.com/photo.jpg"
  }
}
```

Use `media.url` for anything large — it is not subject to the base64 size limit.
If the URL can't be fetched at send time, the request fails with `422`.

### By base64 (convenience)

For automation and AI workflows it can be convenient to send bytes inline:

```json
{
  "chatId": "972501234567",
  "media": {
    "type": "image",
    "base64": "<base64-encoded-bytes>"
  }
}
```

- Decoded size must be **≤ 16 MB**.
- Larger payloads are rejected with HTTP `413` — use `media.url` instead.

## Optional fields

`mimeType` and `filename` are optional. They are usually inferred from the URL,
so only set them if a specific send needs them (for example, a named document).

## Supported media types

`image`, `ptt` (voice note), `audio`, `video`, and `document`. See
[Message types](/reference/message-types/) for the full list.
