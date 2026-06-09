---
title: Message types
description: The message object and every supported v1 message type.
---

Every message — inbound and outbound — is a `message` object discriminated by `type`. `message.type` is always required, and the remaining fields must match the type.

## Supported types (v1)

| Type | Purpose | Key fields |
| --- | --- | --- |
| `text` | Plain text | `body` |
| `image` | Image | `mediaUrl` or `base64`, `caption?` |
| `ptt` | Voice note | `mediaUrl` or `base64` |
| `audio` | Generic audio file | `mediaUrl` or `base64` |
| `video` | Video | `mediaUrl` or `base64`, `caption?` |
| `document` | File / document | `mediaUrl` or `base64`, `filename?` |
| `location` | Geographic location | `latitude`, `longitude`, `name?`, `address?` |

`ptt` and `audio` are intentionally separate: voice notes are often transcribed, while audio files are treated as generic attachments.

## Media fields

For media types, provide **either** `mediaUrl` (preferred) **or** `base64` (≤ 16 MB decoded). `mimeType` and `filename` are optional and usually inferred.

## Validation rules

- `to` is required on outbound messages.
- `from` is present on inbound webhooks.
- `message` is required.
- `message.type` is required.
- Message content must match the selected type.

### Valid

```json
{
  "to": "972501234567",
  "message": {
    "type": "document",
    "mediaUrl": "https://example.com/invoice.pdf"
  }
}
```

### Invalid (missing `type`)

```json
{
  "to": "972501234567",
  "message": {
    "mediaUrl": "https://example.com/invoice.pdf"
  }
}
```

For the machine-readable schema, see the [API Reference](/api-reference/).
