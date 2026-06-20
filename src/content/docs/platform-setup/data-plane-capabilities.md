---
title: "Chapter 14: Add Data Plane Capabilities"
description: "Position managed, customer-operated, and application-based data planes in the platform offering."
---

The Control Plane coordinates trust, contracts, and transfer processes. The data plane moves the data.

A platform operator must decide which data-plane capabilities are included in the offering and which are left to participants or application teams.

## Data plane placement options

| Option | Description | When useful |
|---|---|---|
| **Managed data plane** | The platform operates a data plane service for customers. | Simple file or API transfers, low-friction onboarding, small participants. |
| **Customer-operated data plane** | The participant runs the data plane in its own environment. | Sensitive data, local systems, regulated environments, industrial networks. |
| **Community or protocol data plane** | A data plane built for a specific protocol, such as S3, streaming, or industrial protocols. | Dataspaces with common transport needs. |
| **Application as data plane** | A domain application integrates with Data Plane Signaling and serves data itself. | Business workflows where transfer logic and domain logic belong together. |

All of these can coexist. The Control Plane selects a suitable data plane based on registered capabilities and transfer requirements.

## What the Control Plane needs to know

A data plane must be registered so the Control Plane knows how to signal it.

The registration typically includes:

- data plane control URL;
- allowed source types;
- allowed transfer types;
- supported protocols or capabilities;
- identity and authentication expectations;
- participant context or tenancy information;
- health or availability metadata where supported.

Application developers handle exact API payloads in the application path. Operators need to define which registrations are allowed and who is responsible for operating each data plane.

## Capability selection

A mature platform may have several data planes:

```text
Control Plane transfer request
        │
        ├─ HTTP file data plane
        ├─ S3 adapter data plane
        ├─ OPC-UA or industrial protocol data plane
        └─ domain application acting as data plane
```

The Control Plane routes transfer coordination to a data plane whose registered capabilities match the asset's data address and requested transfer type.

This is why data address metadata and data plane registration must be aligned. If a provider publishes an S3-backed asset but no data plane can serve S3 transfers, negotiation may succeed while transfer cannot complete.

## Managed data plane responsibilities

If the platform operates a data plane, the operator is responsible for:

- deployment, scaling, and upgrades;
- token validation and secure signaling;
- network exposure for transfer endpoints;
- backend storage or connector configuration;
- audit logs and transfer diagnostics;
- capacity planning;
- incident response;
- customer documentation.

The customer still owns the data, the publishing decision, the policy choice, and any backend-system credentials they provide.

## Customer-operated data plane responsibilities

If the customer operates the data plane, the handoff must specify:

- required control endpoint shape;
- reachability from the Control Plane;
- transfer endpoint exposure to consumers;
- TLS and certificate requirements;
- supported source and transfer types;
- token validation expectations;
- registration process;
- troubleshooting boundary between customer and platform operator.

Hybrid industrial deployments often use this model because the data plane must sit near internal systems.

## Application as data plane

A domain application can use Data Plane Signaling and become the data plane for its use case.

For example, an application that manages turbine evidence packs could:

- publish assets when new evidence arrives;
- negotiate or approve access based on business rules;
- serve selected evidence directly from its own domain model;
- report transfer state back to the Control Plane.

There is no separate generic data plane beside it. The application is the data plane because it implements the signaling and transfer behavior.

This path explains the platform decision. Building such an application belongs in [Build a Dataspace Application](../application/).
