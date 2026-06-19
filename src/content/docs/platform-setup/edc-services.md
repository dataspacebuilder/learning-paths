---
title: "Chapter 5: Deploy EDC Services"
description: "Deploy the Control Plane and Identity Hub as the core services participants use."
---

The core participant-facing services are the **Control Plane** and **Identity Hub**. In a managed platform they often run in a virtual, multi-tenant mode: one deployment serves many isolated participant contexts.

## What the Control Plane does

The Control Plane is the protocol and contract brain of the connector. It handles:

- asset metadata;
- policies and contract definitions;
- catalog requests;
- contract negotiations;
- contract agreements;
- transfer process coordination;
- Data Plane Signaling coordination;
- DSP protocol endpoints for other participants.

A participant application or portal uses the Management API to create and manage these resources. Other participants use the DSP endpoint to request catalogs, negotiate, and coordinate transfers.

## What Identity Hub does

Identity Hub manages participant identity material:

- decentralized identifiers (DIDs);
- keys and DID documents;
- verifiable credentials;
- verifiable presentations;
- identity and token flows used during trust negotiation.

During a dataspace interaction, credentials can be presented and verified as part of the policy decision. The application developer may not see every identity step, but the platform must operate the service reliably.

## Virtual participant contexts

In a multi-tenant platform, the deployment does not spawn a separate Control Plane and Identity Hub for each customer. Instead, each participant gets an isolated context.

```text
Control Plane deployment
  ├─ participant context: greensteel
  ├─ participant context: towerworks
  └─ participant context: gridsight

Identity Hub deployment
  ├─ identity context: greensteel
  ├─ identity context: towerworks
  └─ identity context: gridsight
```

The context boundary is enforced by configuration, token claims, database records, and service authorization. The IDP must issue tokens that clearly identify which participant context a caller may access.

## Deployment inputs

Before deploying these services, prepare:

| Input | Used for |
|---|---|
| Database connection | Persistent state for assets, policies, negotiations, transfers, DIDs, keys, and credentials. |
| Secret-store connection | Key material, client secrets, credential-related secrets, and service secrets. |
| IDP/JWKS configuration | Verifying API tokens and enforcing roles and scopes. |
| Public hostnames | Management API, Identity Hub API, and DSP protocol endpoint exposure. |
| DID hostname strategy | `did:web` or another supported identifier method. |
| Dataspace profile inputs | Protocol versions, trust anchors, and credential expectations. |

## Endpoint separation

Keep the endpoint audiences clear:

| Endpoint | Audience | Notes |
|---|---|---|
| Management API | Participant applications, portals, integrators | Authenticated with participant-scoped tokens. |
| Identity Hub API | Participant applications and identity workflows | Authenticated and scoped to the participant context. |
| DSP protocol endpoint | Other participants' connectors | Externally reachable under the participant's dataspace address. |
| Observability endpoints | Platform monitoring | Usually internal or restricted to the operator. |

Do not treat the Management API as the same surface as the DSP endpoint. One is for local participant operations. The other is for cross-participant protocol traffic.

## Operational checks

After deployment, verify:

1. services can connect to their databases;
2. services can read and write required secrets;
3. JWKS discovery works and invalid tokens are rejected;
4. an admin or provisioner token can perform bootstrap actions;
5. a participant token cannot access another participant context;
6. the DSP endpoint is reachable from expected network locations;
7. health and readiness endpoints are scraped by monitoring;
8. logs include enough correlation information for support.

Only after these checks pass should CFM provision real participant contexts into the services.
