---
title: Working with media
description: Send and receive WhatsApp media with Teiwah.
---

Teiwah represents media as URLs rather than embedding binary data in payloads. This keeps webhooks small and sends simple.

## Inbound media (download)

When someone sends media to your connected number, the webhook includes a Teiwah `mediaUrl` instead of the bytes:

```json
{
  "id": "3EB0C767D7A0D9D8F8A1",
  "from": "972501234567",
  "timestamp": 1749420000,
  "message": {
    "type": "image",
    "mediaUrl": "https://api.teiwah.cloud/media/k7P3x9LmQ2",
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
  H[Webhook with mediaUrl] --> C[GET /media/:id]
  C --> R[Media bytes streamed back]
```

## Outbound media (send)

When sending media, provide it one of two ways:

### By URL (preferred)

```json
{
  "to": "972501234567",
  "message": {
    "type": "image",
    "mediaUrl": "https://example.com/photo.jpg"
  }
}
```

Use `mediaUrl` for anything large — it is not subject to the base64 size limit.

### By base64 (convenience)

For automation and AI workflows it can be convenient to send bytes inline:

```json
{
  "to": "972501234567",
  "message": {
    "type": "image",
    "base64": "<base64-encoded-bytes>"
  }
}
```

- Decoded size must be **≤ 16 MB**.
- Larger payloads are rejected with HTTP `413` — use `mediaUrl` instead.

## Optional fields

`mimeType` and `filename` are optional. They are usually inferred, so only set them if a specific send needs them (for example, a named document).

## Supported media types

`image`, `ptt` (voice note), `audio`, `video`, and `document`. See [Message types](/reference/message-types/) for the full list.
