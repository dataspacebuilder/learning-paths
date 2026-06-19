---
title: "Chapter 2: Component Map"
description: "The major components in a dataspace platform and how they fit together."
---

A dataspace platform combines protocol services, identity services, provisioning automation, infrastructure, and optional customer-facing services. Some pieces come from Eclipse projects. Some are standard cloud infrastructure. Some are built or configured by the operator. Some are defined by the dataspace authority rather than by the platform team.

## Platform shape

```text
Customer and operator interfaces
  ├─ portal or onboarding UI                 optional, operator-built
  ├─ Management API                          EDC Control Plane
  ├─ Identity Hub API                        EDC Identity Hub
  └─ provisioning API                        Connector Fabric Manager

Dataspace protocol and identity layer
  ├─ Control Plane                           catalogs, policies, negotiation, transfers
  ├─ Identity Hub                            DIDs, credentials, presentations, STS
  └─ Issuer Service                          optional credential issuance

Provisioning layer
  ├─ Tenant Manager                          tenants, profiles, cells, dataspaces
  ├─ Provision Manager                       orchestration
  └─ activity agents                         IDP, EDC, registration, onboarding

Data-transfer layer
  ├─ managed data planes                     optional platform capability
  ├─ customer-operated data planes           common hybrid pattern
  └─ application-as-data-plane services      domain applications using DPS

Infrastructure layer
  ├─ Kubernetes or comparable runtime
  ├─ PostgreSQL
  ├─ OAuth2/OIDC provider
  ├─ secret store
  ├─ NATS with JetStream
  └─ observability, backups, ingress, TLS, DNS
```

The platform does not become a central repository for all participant data. The Control Plane coordinates the sharing process. The data plane or participant application serves the data from the appropriate environment after a contract and transfer have been agreed.

## Core components

| Component | Source | What it does |
|---|---|---|
| **Control Plane** | Eclipse Dataspace Components | Manages assets, policies, contract definitions, catalog requests, contract negotiations, transfer processes, and DSP protocol endpoints. |
| **Identity Hub** | Eclipse Dataspace Components | Manages participant DIDs, keys, verifiable credentials, verifiable presentations, and identity-related token flows. |
| **Connector Fabric Manager** | Eclipse CFM | Automates tenant and participant provisioning across the platform. |
| **Activity agents** | Eclipse CFM ecosystem / operator deployment | Execute provisioning actions such as IDP client creation, participant-context creation, issuer registration, and credential onboarding. |
| **Data planes** | Operator-built, participant-built, community-provided, or domain application | Transfer data under Control Plane coordination by integrating with Data Plane Signaling. |
| **Issuer Service** | Eclipse Dataspace Components, if used | Issues verifiable credentials and supports credential lifecycle operations when the platform or dataspace authority operates issuance. |
| **Federated Catalog** | Eclipse Dataspace Components, optional | Crawls participant catalogs into a queryable cache for larger dataspaces. |

## Supporting infrastructure

| Infrastructure | Why it matters |
|---|---|
| Kubernetes or comparable runtime | Runs platform services with scaling, rollout, and scheduling controls. |
| PostgreSQL | Stores persistent state for Control Plane, Identity Hub, CFM, and optional services. |
| OAuth2/OIDC provider | Issues API access tokens with the roles, scopes, and participant-context claims the services enforce. |
| Secret store | Protects keys, client secrets, credential material, and service secrets. |
| NATS with JetStream | Carries reliable provisioning work between CFM subsystems and agents. |
| Ingress, DNS, TLS | Makes APIs and protocol endpoints reachable under stable, trusted addresses. |
| Observability stack | Gives operators logs, metrics, traces, health checks, alerts, and audit evidence. |

## Governance inputs are not components

A functioning deployment also needs decisions from the dataspace authority:

- which organizations may join;
- which credentials are required;
- which issuers are trusted;
- which policy templates are allowed;
- which DID methods and protocol versions are accepted;
- how credentials expire, renew, or get revoked.

These decisions become platform configuration: dataspace profiles, issuer configuration, trust anchors, policy templates, onboarding workflows, and customer-facing documentation.

Do not treat governance as something the Kubernetes deployment can invent on its own. The operator runs the systems. The dataspace authority defines the rules those systems enforce.
