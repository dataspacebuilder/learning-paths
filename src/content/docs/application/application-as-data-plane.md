---
title: "Chapter 11: Application as Data Plane"
description: "Build a domain application that implements Data Plane Signaling and serves data directly."
---

Sometimes the cleanest data plane is the application itself.

A domain application already knows the business rules, backend model, user permissions, and data shape. If it also implements Data Plane Signaling, it can serve data directly after the Control Plane authorizes a transfer.

## The pattern

```text
TowerWorks Evidence Bridge
  ├─ publishes assets through Management API
  ├─ consumes GreenSteel data through Management API
  ├─ implements Data Plane Signaling endpoint
  ├─ maps transfer requests to dossier objects
  └─ serves approved data from the document system
```

There is no separate generic data plane beside it. The application is the data plane for this use case.

## Why use this pattern

Application-as-data-plane is useful when:

- transfer behavior depends on domain workflow state;
- data must be assembled, filtered, redacted, or transformed at request time;
- backend access cannot be represented safely as a simple URL;
- the application must enforce obligations or purpose limits before serving;
- the same service should publish, negotiate, and serve domain data;
- a reusable generic data plane would expose too much backend complexity.

For TowerWorks, the app may need to serve only the released parts of a dossier, exclude internal notes, watermark the export, and record the transfer against the engineering release record. That is domain logic.

## Request flow

A simplified flow looks like this:

```text
1. NorthSea negotiates access to TS-42 dossier.
2. TowerWorks Control Plane finalizes a contract agreement.
3. NorthSea starts a transfer process.
4. TowerWorks Control Plane signals Evidence Bridge.
5. Evidence Bridge validates the transfer context.
6. Evidence Bridge retrieves the dossier from the backend.
7. Evidence Bridge serves the data or pushes it to the agreed destination.
8. Evidence Bridge reports transfer state.
```

The Control Plane still coordinates contracts and transfer state. The application handles the domain-specific data movement.

## Register the application as a data plane

The application registers a data-plane control endpoint just like a standalone data plane.

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "DataPlaneInstance",
  "url": "https://evidence.towerworks.example/dps/dataflows",
  "allowedSourceTypes": ["TowerWorksDossier"],
  "allowedTransferTypes": ["HttpData-PULL", "TowerWorksDossier-PULL"]
}
```

The asset's data address can then use an application-specific source type:

```json
{
  "@type": "DataAddress",
  "type": "TowerWorksDossier",
  "dossierId": "TS-42",
  "releaseVersion": "2026-06-01"
}
```

The data address is a domain reference, not a public backend URL.

## What the SDK handles

A Data Plane SDK can handle much of the protocol plumbing:

- receiving signaling requests;
- validating request structure;
- managing dataflow state;
- validating transfer tokens depending on implementation;
- reporting state transitions;
- exposing extension points for source and sink behavior.

Your code handles:

- mapping `dossierId` to backend records;
- checking release status;
- generating the export;
- enforcing redaction or filtering rules;
- streaming or pushing the data;
- recording the business audit event.

## Multi-tenant applications

A platform operator may deploy one application instance for multiple participants. If so, tenant isolation must be explicit.

The application should:

- receive or derive the participant context for every API call;
- request tokens scoped to that context;
- keep tenant configuration separate;
- prevent one tenant from referencing another tenant's backend records;
- include participant context in logs and metrics;
- test cross-tenant access denial.

A multi-tenant application-as-data-plane has two isolation surfaces: Management API access and data-serving behavior. Both must be tenant-safe.

## Security responsibilities

If your application is the data plane, it is on the data path. Treat it accordingly.

Minimum responsibilities:

- validate signaling requests and transfer authorization;
- serve only the asset covered by the transfer;
- avoid leaking internal file paths, IDs, or credentials;
- apply size and rate limits;
- enforce expiration;
- log transfer IDs and agreement IDs;
- handle cancellation and termination;
- protect backend credentials;
- test negative cases.

Do not make the application's ordinary user download endpoint double as a dataspace transfer endpoint without checking the transfer context.

## Relationship to portals

A portal is usually a user interface over the Management API. An application-as-data-plane is a runtime component in the transfer path.

One service can include both a UI and data-plane capability, but the responsibilities should remain clear in the architecture and operations model.
