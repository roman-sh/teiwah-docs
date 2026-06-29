---
title: Send a message
description: Send text and media WhatsApp messages with POST /messages.
---

All outbound messages use a single endpoint:

```http
POST /messages
Authorization: Bearer YOUR_API_KEY
```

Every message is addressed with a single `chatId` and is either **text** (a
top-level `text` string) or **media** (a `media` object). Exactly one of `text`
or `media` must be present.

```json
{
  "chatId": "972501234567",
  "text": "Hello"
}
```

The `chatId` is the conversation address. On a send it accepts a bare phone
number (Teiwah resolves it), a full JID/LID (`…@s.whatsapp.net`, `…@lid`), or a
group JID (`…@g.us`). It is the same value you receive as `chatId` on
[inbound webhooks](/guides/webhooks/) — reply by passing it straight back.

On success the response returns the native WhatsApp message `id`:

```json
{ "success": true, "id": "3EB0C767D7A0D9D8F8A1" }
```

Keep that `id` to [quote the message](#quoted-replies) in a later reply.

## Text

```json
{
  "chatId": "972501234567",
  "text": "Hello"
}
```

## Image

```json
{
  "chatId": "972501234567",
  "media": {
    "type": "image",
    "url": "https://example.com/photo.jpg",
    "caption": "Look at this"
  }
}
```

## Voice note (ptt) vs audio

`ptt` is a WhatsApp voice note; `audio` is a generic audio attachment. They are
separate types because automations often treat them differently (for example,
voice notes get transcribed).

```json
{
  "chatId": "972501234567",
  "media": {
    "type": "ptt",
    "url": "https://example.com/voice.ogg"
  }
}
```

## Document

```json
{
  "chatId": "972501234567",
  "media": {
    "type": "document",
    "url": "https://example.com/invoice.pdf"
  }
}
```

## Sending media

Media messages (`image`, `ptt`, `audio`, `video`, `document`) accept the bytes
in two ways:

- **`media.url`** — preferred. No size limit beyond what WhatsApp accepts. If the
  URL can't be fetched at send time, the request fails with `422`.
- **`media.base64`** — convenience for automation/AI workflows. Decoded size must
  be **≤ 16 MB**; larger payloads are rejected with `413`.

`mimeType` and `filename` are optional and usually inferred. See
[Working with media](/guides/media/) for details.

For the complete schema of every type, see the [API Reference](/api-reference/)
and [Message types](/reference/message-types/).

## Quoted replies

Add `quoteMessageId` to any message to send it as a reply that quotes an earlier
one. Use an inbound webhook `id` (or the id of a message you sent earlier in the
chat):

```json
{
  "chatId": "972501234567",
  "text": "Got it, thanks!",
  "quoteMessageId": "3EB0C767D7A0D9D8F8A1"
}
```

Resolution is **best-effort**: an unknown or too-old id is *not* an error — the
message is still delivered, just without the quote.

## Trusted contacts

WhatsApp locks accounts that **start** conversations with people who haven't
engaged them first. To protect your session, Teiwah blocks a 1:1 send to a
contact it has no established relationship with:

```json
// 403 Forbidden
{
  "statusCode": 403,
  "message": "Cannot start a new conversation with this contact; they must message you first",
  "error": "Forbidden"
}
```

A contact becomes **trusted** automatically once they message you first, so
**replies always work**. In practice: reply to inbound messages and you'll never
see this.

This applies to **1:1 sends only** — group sends (`chatId` ending in `@g.us`) are
never blocked. Note that DMing someone you saw in a group, using their
`participant` address as `chatId`, *is* a 1:1 send and is subject to this check.

## Typing indicator

Show the "typing…" indicator in a chat — call it right before replying to look
responsive. It's addressed by `chatId`, the same value you reply to:

```http
POST /typing
```

```json
{ "chatId": "972501234567" }
```

There is intentionally no "stop": it's always "typing", and WhatsApp clears it
automatically (after ~25s, or the instant your next message lands). Returns
`{ "success": true }`. Fails with `503` when the session is offline.

## Read receipts

Mark a received message as read (blue ticks), addressed by its native `id` (an
inbound webhook `id`):

```http
POST /read
```

```json
{ "messageId": "3EB0C767D7A0D9D8F8A1" }
```

Teiwah resolves the id to the message's full key from its recent-message cache,
so you send only the id. Returns `{ "success": true }`. An unknown or too-old id
is `404`; an offline session is `503`.
