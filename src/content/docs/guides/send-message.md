---
title: Send a message
description: Send text and media WhatsApp messages with POST /messages.
---

All outbound messages use a single endpoint:

```http
POST /messages
Authorization: Bearer YOUR_API_KEY
```

The body is always a recipient (`to`) plus a `message` object. The `message` object is tagged by `type`, and its remaining fields depend on that type.

```json
{
  "to": "972501234567",
  "message": {
    "type": "text",
    "body": "Hello"
  }
}
```

The `to` value is the recipient address — typically the bare phone number, the same value you receive as `from` on [inbound webhooks](/guides/webhooks/).

## Text

```json
{
  "to": "972501234567",
  "message": {
    "type": "text",
    "body": "Hello"
  }
}
```

## Image

```json
{
  "to": "972501234567",
  "message": {
    "type": "image",
    "mediaUrl": "https://example.com/photo.jpg",
    "caption": "Look at this"
  }
}
```

## Voice note (ptt) vs audio

`ptt` is a WhatsApp voice note; `audio` is a generic audio attachment. They are separate types because automations often treat them differently (for example, voice notes get transcribed).

```json
{
  "to": "972501234567",
  "message": {
    "type": "ptt",
    "mediaUrl": "https://example.com/voice.ogg"
  }
}
```

## Document

```json
{
  "to": "972501234567",
  "message": {
    "type": "document",
    "mediaUrl": "https://example.com/invoice.pdf"
  }
}
```

## Sending media

Media messages (`image`, `ptt`, `audio`, `video`, `document`) accept media in two ways:

- **`mediaUrl`** — preferred. No size limit beyond what WhatsApp accepts.
- **`base64`** — convenience for automation/AI workflows. Decoded size must be **≤ 16 MB**; larger payloads are rejected with `413`.

`mimeType` and `filename` are optional and usually inferred. See [Working with media](/guides/media/) for details.

For the complete schema of every type, see the [API Reference](/api-reference/) and [Message types](/reference/message-types/).
