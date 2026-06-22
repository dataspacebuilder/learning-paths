---
title: "Chapter 2: What You Receive from the Platform"
description: "The endpoints, credentials, participant identifiers, and profile information a dataspace application needs."
---

An application starts from a platform handoff. The platform operator or self-hosted connector team gives you the information needed to act for one participant context.

Treat the handoff as production credentials. Store it in your secret and configuration system, not in source code.

## The handoff package

A handoff package usually includes the following values.

### Participant context ID

Example: `towerworks-ctx-001`

Scopes API calls and appears in access-token claims.

### OAuth2 client credentials

Example: `client_id` and `client_secret`

Used to obtain bearer tokens. Store the secret in a secret manager, not in application code.

### Token endpoint

- Example host: `https://auth.platform.example`
- Example path: `/oauth2/token`

Issues short-lived access tokens.

### Management API base URL

- Example host: `https://cp.platform.example`
- Example path: `/api/mgmt/v4/participants/towerworks-ctx-001`

Main API for assets, policies, catalogs, negotiations, transfers, and data-plane registrations.

### Identity Hub API URL

- Example host: `https://ih.platform.example`
- Example path: `/api/identity/participants/towerworks-ctx-001`

Used when the application needs DID or credential information.

### DSP protocol endpoint

- Example host: `https://cp.platform.example`
- Example path: `/api/dsp/towerworks-ctx-001/2025-1`

Address other participants use to contact TowerWorks over the Dataspace Protocol.

### DID

Example: `did:web:ih.platform.example:towerworks`

The participant's decentralized identifier.

### Dataspace profile

Example: `winddata-alliance`

Tells the application which protocol, credential, and policy expectations apply.

### Data-plane option

Examples: managed HTTP data plane, registered customer data plane, or application-as-data-plane.

Determines how actual bytes move.

Exact URLs and API versions depend on the platform. Code against configuration, not hard-coded paths.

## Token request

Most applications use the OAuth2 client credentials grant.

```http
POST https://auth.platform.example/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=...&client_secret=...&scope=management-api:read management-api:write
```

The access token should be scoped to the participant context. A decoded token may contain claims like:

```json
{
  "role": "participant",
  "participant_context_id": "towerworks-ctx-001",
  "scope": "management-api:read management-api:write identity-api:read"
}
```

Your application should not choose the context by changing a URL alone. The token must authorize the same context that the URL addresses.

## Recommended configuration shape

Keep runtime configuration explicit.

```text
DATASPACE_PROFILE=winddata-alliance
PARTICIPANT_CONTEXT_ID=towerworks-ctx-001
PARTICIPANT_DID=did:web:ih.platform.example:towerworks
TOKEN_ENDPOINT=https://auth.platform.example/oauth2/token
MANAGEMENT_API_BASE=https://cp.platform.example/api/mgmt/v4/participants/towerworks-ctx-001
IDENTITY_HUB_API_BASE=https://ih.platform.example/api/identity/participants/towerworks-ctx-001
DSP_ENDPOINT=https://cp.platform.example/api/dsp/towerworks-ctx-001/2025-1
DEFAULT_PROTOCOL=dataspace-protocol-http:2025-1
```

Secrets such as `CLIENT_SECRET` belong in a secret manager. Do not write them to logs.

## Validate before building features

Before implementing business logic, run a small connectivity check:

1. request a token;
2. call a Management API read endpoint;
3. confirm the token is scoped to the expected `participant_context_id`;
4. call an Identity Hub read endpoint if your app needs it;
5. query a known provider catalog in a sandbox;
6. confirm the data-plane option that will serve or receive data.

If these checks fail, application code will not fix the problem. Go back to the platform operator or connector team and resolve handoff, identity, endpoint, or networking issues first.

## Managed and self-hosted handoffs

A managed platform and a self-hosted connector give similar logical inputs, but the source differs.

| Managed platform | Self-hosted connector |
|---|---|
| Platform operator gives you tenant-scoped endpoints and credentials. | Internal connector team gives you local endpoints and credentials. |
| Participant isolation is usually enforced by platform token claims. | Isolation may be simpler because the connector serves one participant, or enforced by local tenancy. |
| Data plane may be managed by the platform. | Data plane is usually operated by the participant or application team. |

The application should hide this difference behind configuration. Business flows should not care whether the connector stack is managed or self-hosted.
