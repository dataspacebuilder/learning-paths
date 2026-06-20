---
title: "Set Up a Dataspace Platform"
description: "Operator path for deploying, provisioning, handing over, and evolving dataspace infrastructure."
---

This learning path is for the team that operates the platform behind a dataspace.

In the offshore wind story, companies such as GreenSteel, TowerWorks, SafeLoad, NorthSea Wind, and GridSight need connectors, identities, credentials, policies, and data-transfer capabilities. They should not each have to invent the platform layer from scratch. A platform operator can provide that foundation as a managed service, as a self-hosted reference stack, or as a hybrid model where some pieces stay close to the participant's systems.

## Who this path is for

This path is for:

- cloud service providers building a managed dataspace platform;
- platform operators running connector and identity services for participants;
- DevOps, SRE, and infrastructure teams deploying dataspace components;
- enterprise IT teams that self-host participant infrastructure;
- architects deciding what belongs in the platform and what belongs in applications or governance.

You should already understand the high-level dataspace model. If you are new to dataspaces, start with [A Dataspace Use Case](../use-case/). You do not need deep Eclipse Dataspace Components internals before starting this path.

## What you will set up

A platform gives participants a reliable operating environment for dataspace interactions:

```text
Dataspace participants and applications
        │
        ▼
Management APIs · Identity APIs · DSP endpoints
        │
        ▼
Control Plane · Identity Hub · Data Plane capabilities
        │
        ▼
Connector Fabric Manager · provisioning agents
        │
        ▼
Kubernetes · PostgreSQL · secret store · NATS · IDP · observability
```

The exact deployment model can vary. A managed CSP platform may operate most services centrally. A self-hosted participant may run its own connector stack. A hybrid model may use managed identity and control-plane services while keeping data planes close to sensitive operational systems.

## What you will learn

By the end of this path, you will be able to:

- choose between managed, self-hosted, and hybrid operating models;
- identify the platform components and their responsibilities;
- explain what Eclipse provides and what an operator must build, configure, or run;
- prepare the infrastructure prerequisites for a baseline deployment;
- deploy EDC Control Plane and Identity Hub services in a multi-tenant platform model;
- deploy Connector Fabric Manager and the activity agents that provision participants;
- configure IDP roles, scopes, claims, and participant-context isolation;
- understand cells, dataspace profiles, and participant profiles;
- provision participants and track asynchronous onboarding state;
- hand over the correct endpoints, credentials, and identifiers to participants;
- decide how data planes, portals, observability, issuer services, and federated catalogs fit into the offering;
- evolve a baseline API-only platform into a mature dataspace service.

## Chapters

| # | Chapter | What you will learn |
|---|---|---|
| 1 | [Platform Operating Models](./platform-operating-models/) | Managed, self-hosted, and hybrid ways to operate dataspace infrastructure. |
| 2 | [Component Map](./component-map/) | The major platform components and how they fit together. |
| 3 | [What Eclipse Provides vs. What You Build](./responsibility-split/) | The responsibility split between Eclipse projects, operators, customers, and dataspace authorities. |
| 4 | [Infrastructure Prerequisites](./prerequisites/) | The cluster, databases, identity provider, messaging, secrets, networking, and operations foundations you need. |
| 5 | [Deploy EDC Services](./edc-services/) | Control Plane and Identity Hub deployment, endpoints, persistence, and participant isolation. |
| 6 | [Deploy Connector Fabric Manager](./connector-fabric-manager/) | Tenant Manager, Provision Manager, orchestration, and bootstrap configuration. |
| 7 | [Deploy Activity Agents](./activity-agents/) | IDP, EDC, registration, and onboarding agents. |
| 8 | [Identity Provider Setup](./identity-provider-setup/) | JWT claims, roles, scopes, clients, and context isolation. |
| 9 | [Dataspace Profiles and Cells](./dataspace-profiles-and-cells/) | How platform zones and dataspace-specific configuration are modeled. |
| 10 | [Provision Participants](./provisioning-participants/) | Tenant creation, participant profile deployment, DID setup, and credential bootstrapping. |
| 11 | [Customer Handoff](./customer-handoff/) | What a participant or integrator receives after provisioning. |
| 12 | [Self-Hosted Connector Track](./self-hosted-connector-track/) | How the model changes when a participant operates its own stack. |
| 13 | [Add Portal and Observability](./portal-and-observability/) | Customer UX, platform status, logs, metrics, health checks, and alerts. |
| 14 | [Add Data Plane Capabilities](./data-plane-capabilities/) | Managed data planes, customer-operated data planes, capability selection, and app-as-data-plane patterns. |
| 15 | [Optional Platform Services](./optional-platform-services/) | Issuer Service, federated catalog, onboarding frontends, and other optional services. |
| 16 | [From Baseline to Offering](./baseline-to-offering/) | A maturity model for growing from a baseline deployment into a complete service. |

## What this path does not cover

This path is not a production hardening checklist, a complete Kubernetes runbook, or a full application-development tutorial. It explains the operator view and the platform shape. Application behavior belongs in [Build a Dataspace Application](../application/). Detailed governance, legal onboarding rules, and credential schema design belong in a dedicated trust and profile design track.
