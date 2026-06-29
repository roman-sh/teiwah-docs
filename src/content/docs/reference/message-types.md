---
title: Message types
description: The message model and every supported v1 message type.
---

Every message — inbound and outbound — is addressed with a single `chatId` and
is either **text** or **media**:

- **Text** — a flat top-level `text` string.
- **Media** — a `media` object with an explicit `media.type`.

Exactly one of `text` / `media` is present. All field names are camelCase
(`chatId`, `mimeType`, `quoteMessageId`).

## Text

```json
{
  "chatId": "972501234567",
  "text": "Hello"
}
```

## Media types (v1)

The `media.type` is required — Teiwah uses it to build the correct WhatsApp send
payload.

| `media.type` | Purpose | Key fields |
| --- | --- | --- |
| `image` | Image | `url` or `base64`, `caption?` |
| `ptt` | Voice note | `url` or `base64` |
| `audio` | Generic audio file | `url` or `base64` |
| `video` | Video | `url` or `base64`, `caption?` |
| `document` | File / document | `url` or `base64`, `filename?` |

`ptt` and `audio` are intentionally separate: voice notes are often transcribed,
while audio files are treated as generic attachments.

```json
{
  "chatId": "972501234567",
  "media": {
    "type": "document",
    "url": "https://example.com/invoice.pdf"
  }
}
```

## Media fields

For media messages, provide **either** `url` (preferred) **or** `base64` (≤ 16 MB
decoded). `mimeType` and `filename` are optional and usually inferred. See
[Working with media](/guides/media/) for inbound vs. outbound details.

## Validation rules

- `chatId` is required on outbound and present on inbound.
- Exactly one of `text` or `media` is present.
- When `media` is present, `media.type` is required and the content must match
  the type.

### Valid

```json
{
  "chatId": "972501234567",
  "media": {
    "type": "document",
    "url": "https://example.com/invoice.pdf"
  }
}
```

### Invalid (media present, `type` missing)

```json
{
  "chatId": "972501234567",
  "media": {
    "url": "https://example.com/invoice.pdf"
  }
}
```

For the machine-readable schema, see the [API Reference](/api-reference/).
