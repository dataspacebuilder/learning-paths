---
title: "Chapter 3: Application Architecture"
description: "How a dataspace application, backend systems, Management API, Identity Hub, and data plane fit together."
---

A dataspace application sits between participant business systems and dataspace infrastructure.

For TowerWorks, that means connecting a document or PLM system to the participant's Control Plane, Identity Hub, and data-plane capability.

```text
TowerWorks users and systems
        │
        ▼
TowerWorks Evidence Bridge
  ├─ business rules and approvals
  ├─ backend adapters
  ├─ dataspace API client
  └─ optional data-plane endpoint
        │
        ├────────► Management API
        ├────────► Identity Hub API
        └◄──────► Data Plane Signaling, if the app serves data
```

## Main building blocks

| Building block | Responsibility |
|---|---|
| Application backend | Owns workflow, mapping, retries, audit, and integration with internal systems. |
| Dataspace API client | Calls the Management API and Identity Hub API with participant-scoped tokens. |
| Backend adapters | Connect to PLM, ERP, MES, document stores, object storage, APIs, or databases. |
| Policy/template module | Chooses policy definitions and contract-definition patterns for published offers. |
| Transfer orchestration | Starts transfers, polls state, and routes received data to the right backend. |
| Data-serving module | Serves data directly, or hands off to a standalone/managed data plane. |
| Observability layer | Logs, metrics, traces, and domain events for support. |

Keep dataspace API logic separate from business logic. It should be possible to test policy selection or dossier approval without calling a Control Plane.

## Provider-side architecture

When the application publishes data, the flow is:

```text
Backend event: TS-42 dossier approved
        │
        ▼
Application maps dossier to asset metadata
        │
        ├─ create/update asset
        ├─ create/reuse policy definition
        └─ create/update contract definition
        │
        ▼
Offer appears in provider catalog for eligible consumers
```

The actual file or API response remains in TowerWorks' systems or in a configured data plane. The catalog offer is the discoverable promise that data is available under a policy.

## Consumer-side architecture

When the application consumes data, the flow is:

```text
Application needs GreenSteel certificate GS-87
        │
        ▼
Request GreenSteel catalog through TowerWorks Control Plane
        │
        ▼
Select acceptable offer and start negotiation
        │
        ▼
Wait for finalized contract agreement
        │
        ▼
Start transfer and route received data to TowerWorks backend
```

The application should treat negotiation and transfer as asynchronous workflows. Do not block a user request indefinitely while waiting for another participant's connector.

## Data-plane placement

Decide where data transfer logic lives.

| Option | Application architecture impact |
|---|---|
| Managed data plane | The app publishes data addresses compatible with the managed data plane and receives transfer results. |
| Standalone participant data plane | The app may register the data plane and ensure backend endpoints are reachable. |
| Application as data plane | The app exposes signaling and transfer endpoints, validates transfer context, and serves data itself. |

For a simple file-sharing pilot, a managed or standalone HTTP data plane may be enough. For a domain app that must enforce business rules at the moment of data access, application-as-data-plane can be a better fit.

## Backend mapping

Use stable internal-to-dataspace mappings.

| Internal object | Dataspace representation |
|---|---|
| TowerWorks dossier `TS-42` | Asset ID `towerworks:asset:ts-42-dossier` |
| Dossier release status | Publication eligibility and asset metadata |
| Customer classification | Policy template selection |
| Document file location | Data address or application data-serving route |
| Approved recipient category | Policy constraint or credential requirement |
| Transfer history | Audit event linked to transfer process ID |

This mapping is application-specific. The platform does not know your PLM object model.

## Failure boundaries

Design failures around the boundary where they happen:

- token failure: identity or handoff issue;
- asset creation failure: Management API payload, authorization, or validation issue;
- catalog empty: provider policy, missing credentials, wrong counterparty, or no matching offer;
- negotiation failure: policy mismatch or provider refusal;
- transfer failure: data-plane reachability, backend availability, or unsupported transfer type;
- backend write failure: application integration issue after the dataspace flow succeeded.

Good architecture makes those failures visible separately. Otherwise every issue becomes "the dataspace is broken."
