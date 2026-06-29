---
title: Quickstart
description: Send your first WhatsApp message with Teiwah in a few minutes.
---

This guide takes you from zero to a sent WhatsApp message.

## 1. Connect a session

1. Open the [Teiwah dashboard](https://teiwah.cloud/dashboard).
2. Create a new session and scan the QR code with the WhatsApp account you want to connect.
3. Wait until the session shows as **connected**.

## 2. Get your API key

Each session has its own API key. Copy it from the session in the dashboard.

The key identifies the session and authorizes every API call. Keep it secret — treat it like a password.

:::note
API keys are issued and managed entirely from the dashboard. A key only works after its session has been connected via QR scan.
:::

## 3. Send a message

Send a text message with a single request:

```bash
curl -X POST https://api.teiwah.cloud/messages \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "972501234567",
    "text": "Hello from Teiwah"
  }'
```

A successful response returns the WhatsApp message id:

```json
{
  "success": true,
  "id": "3EB0C767D7A0D9D8F8A1"
}
```

:::tip
You can only **start** a 1:1 conversation with someone who has messaged you
first. Replying to inbound messages always works — see
[Trusted contacts](/guides/send-message/#trusted-contacts).
:::

## Next steps

- [Authentication](/guides/authentication/) — how the session Bearer key works.
- [Send a message](/guides/send-message/) — all message types.
- [Receive webhooks](/guides/webhooks/) — handle inbound messages.
- [API Reference](/api-reference/) — full interactive reference.
