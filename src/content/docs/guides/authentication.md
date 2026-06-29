---
title: Authentication
description: How Teiwah session API keys authenticate every request.
---

Teiwah uses a single, simple authentication model: a **session API key** sent as a Bearer token.

## The session key

Every Teiwah API call is authorized with a session API key:

```http
Authorization: Bearer YOUR_API_KEY
```

The key does two things at once:

- **Identifies the session** — the connected WhatsApp account the request applies to.
- **Authorizes the request** — both sending messages and downloading media use the same key.

There is no separate account login, OAuth flow, or developer portal sign-in for the API. The key *is* the credential.

## Getting and managing keys

Keys are created and managed in the [Teiwah dashboard](https://teiwah.cloud/dashboard), not through the API:

1. Create a session and connect WhatsApp by scanning its QR code.
2. Once connected, copy the session's API key from the dashboard.

A key only becomes active after its session is connected. Each session has its own key.

:::caution
Keep your API key secret. Anyone with the key can send messages from your connected WhatsApp number and download its inbound media. Rotate the key from the dashboard if it is ever exposed.
:::

## What the key authorizes

| Action | Endpoint | Auth |
| --- | --- | --- |
| Send a message | `POST /messages` | Session Bearer key |
| Show the typing indicator | `POST /typing` | Session Bearer key |
| Mark a message read | `POST /read` | Session Bearer key |
| Download inbound media | `GET /media/{id}` | Session Bearer key |
