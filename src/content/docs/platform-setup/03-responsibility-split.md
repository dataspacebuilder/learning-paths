---
title: "Chapter 3: What Eclipse Provides vs. What You Build"
description: "The responsibility split between Eclipse projects, platform operators, participants, and dataspace authorities."
---

A common platform-design mistake is to treat the Eclipse components as a complete managed service. They are not. Eclipse projects provide the protocol, identity, provisioning, and data-plane building blocks. A platform operator turns those building blocks into an operated service.

## Responsibility split

| Area | Eclipse provides | Platform operator provides |
|---|---|---|
| Dataspace protocol and contracts | Control Plane capabilities for catalog, policy, contract negotiation, and transfer coordination | Deployment, configuration, API exposure, authentication, tenant isolation, monitoring, upgrades, incident response |
| Identity and credentials | Identity Hub and, optionally, Issuer Service | DID method choices, key operations, issuer integration, trust-anchor configuration, credential bootstrapping workflows |
| Provisioning | Connector Fabric Manager, Tenant Manager, Provision Manager, activity model | Bootstrap configuration, cells, dataspace profiles, automation wiring, operational runbooks, failure handling |
| Data transfer | Data Plane Signaling, SDKs, ecosystem components | Managed data planes, protocol adapters, backend integration, network placement, capacity and security operations |
| User experience | APIs and component endpoints | Portal, onboarding UI, customer workflows, documentation, support processes |
| Operations | Component logs, health/readiness endpoints, APIs | Observability stack, alerting, dashboards, backups, restore testing, SLOs, audit trails, change management |
| Security posture | Protocol and component-level security mechanisms | TLS, ingress policies, secret management, IDP configuration, least-privilege roles, vulnerability management |

## The dataspace authority also has responsibilities

The platform operator should not silently invent the dataspace's rules. A dataspace authority, consortium, or governance body defines:

| Governance responsibility | Platform expression |
|---|---|
| Membership rules | Onboarding criteria and membership credentials |
| Credential schemas | Issuer Service configuration and Identity Hub expectations |
| Trusted issuers | Trust lists, issuer allow-lists, verifier configuration |
| Access rules | Policy templates and ODRL constraints |
| Participant lifecycle | Renewal, suspension, revocation, and offboarding procedures |
| Dataspace profile | Protocol versions, DID methods, credential requirements, policy patterns |

The operator implements and automates those decisions, but should keep the source of authority clear.

## Participant responsibilities

Even in a managed platform, participants still own part of the system:

- the meaning and quality of the data they publish;
- backend systems such as PLM, ERP, MES, data lakes, or document stores;
- business decisions about which offers to publish and under which policies;
- applications that call the Management API;
- customer-operated data planes or application-as-data-plane services;
- compliance with contracts, retention obligations, and usage restrictions.

A managed connector does not make the platform operator the data owner.

## Minimal baseline versus complete service

At the minimum, a platform can offer API access only:

```text
Participant integrator → Management API / Identity Hub API → Control Plane / Identity Hub
```

That is enough for technical users to publish, consume, negotiate, and transfer data.

A complete service usually adds:

- onboarding portal and approval workflows;
- participant self-service portal;
- managed data-plane options;
- observability visible to customers;
- issuer integration;
- federated catalog or search;
- templates for common policies and assets;
- support playbooks and operational reporting.

The rest of this path shows how to build the baseline first, then evolve it into a broader offering without confusing platform responsibilities with application or governance responsibilities.
