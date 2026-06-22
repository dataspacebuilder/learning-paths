---
title: "Chapter 9: Data Plane Architecture"
description: "Understand Control Plane, Data Plane, Data Plane Signaling, and the transfer options available to applications."
---

The Control Plane decides whether data may move. The Data Plane moves it.

A dataspace application must understand that split because publishing and negotiating through the Management API is not the same as serving bytes to a consumer.

## Control Plane vs. Data Plane

| Layer | Responsibility |
|---|---|
| Control Plane | Catalog, policy evaluation, contract negotiation, transfer coordination, DSP communication. |
| Data Plane | Actual data transfer: HTTP, file, object storage, streaming, industrial protocol, or application-specific transfer. |

The Control Plane should not need to know every detail of the provider's backend. It coordinates transfer with a data plane that has the right capability.

```text
Consumer app ─► Consumer Control Plane ──DSP──► Provider Control Plane
                                                     │
                                                     ▼
                                             Provider Data Plane
                                                     │
                                                     ▼
                                             Provider backend data
```

## Data Plane Signaling

Data Plane Signaling is the control channel between Control Plane and Data Plane.

It lets the Control Plane tell a data plane that a transfer should start, suspend, complete, or terminate. The data plane can report state back.

This keeps the contract and policy flow separate from the wire protocol used to move data.

## Transfer patterns

Common transfer patterns include:

| Pattern | Description | Example |
|---|---|---|
| Pull | Consumer receives an endpoint or token and fetches data. | NorthSea fetches a dossier PDF after negotiation. |
| Push | Provider sends data to a destination supplied by the consumer. | GreenSteel pushes a certificate to an approved storage endpoint. |
| Proxy | Data plane mediates access without exposing backend directly. | Consumer downloads through a controlled proxy URL. |
| Streaming | Data is delivered as a stream. | Sensor or operational data. |
| Application-specific | Domain app implements the transfer behavior. | Evidence Bridge serves only selected dossier sections. |

The dataspace profile and deployed data planes determine which patterns are available.

## Data plane placement options

| Option | Who operates it | Application impact |
|---|---|---|
| Managed data plane | Platform operator | App uses compatible data addresses and transfer types. |
| Standalone participant data plane | Participant or integrator | App may register and configure it, but transfer logic is separate. |
| Application as data plane | Application team | App implements signaling and serving logic directly. |

The same application can use more than one option. For example, simple PDFs may use a managed HTTP data plane, while sensitive dossiers are served by the application itself.

## Capability matching

A data plane registers what it can handle:

- source types;
- transfer types;
- protocols;
- participant or tenant scope;
- control endpoint URL.

The Control Plane selects a data plane whose capabilities match the transfer request and asset data address.

If TowerWorks publishes an asset with `type: HttpData` but no registered data plane supports `HttpData-PULL`, negotiation may succeed while transfer fails. Publishing and data-plane capability must be designed together.

## Security boundary

The data plane is not a public file server. It must respect the authorization context established by the Control Plane.

Depending on implementation, this may include:

- validating tokens or transfer authorization;
- checking transfer process IDs;
- limiting access to the agreed asset;
- applying expiration;
- preventing path traversal or arbitrary backend reads;
- logging transfer events;
- reporting failure to the Control Plane.

If your application acts as a data plane, these become application responsibilities.

## Choosing the right model

Use a managed or standalone data plane when:

- transfers are generic;
- backend data can be exposed through simple adapters;
- policy decisions do not require domain logic at serving time;
- you want to reduce application complexity.

Use application-as-data-plane when:

- the app must compute or filter data at transfer time;
- the backend API is domain-specific;
- access must be tied to workflow state;
- the app already owns the data-serving boundary;
- you need one deployable unit for business logic and transfer behavior.

The next chapters cover both standalone data planes and application-as-data-plane.
