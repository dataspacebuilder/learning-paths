---
title: "Chapter 6: Deploy Connector Fabric Manager"
description: "Deploy Tenant Manager, Provision Manager, and the orchestration layer that creates participants at scale."
---

Connector Fabric Manager, or **CFM**, automates the work an operator would otherwise perform manually for every participant. It turns an approved onboarding request into platform resources: tenants, participant contexts, DIDs, credentials, and API clients.

## Main components

| Component | What it does |
|---|---|
| **Tenant Manager** | Stores tenants, cells, dataspace profiles, and participant profiles. Exposes the provisioning API used by platform automation. |
| **Provision Manager** | Executes orchestration workflows and dispatches provisioning activities to agents. |
| **Activity agents** | Perform concrete tasks such as IDP client creation, EDC context creation, issuer registration, and credential onboarding. |
| **NATS with JetStream** | Carries provisioning work reliably between the Provision Manager and agents. |
| **PostgreSQL** | Persists CFM state, provisioning state, and configuration. |

The Tenant Manager is the API surface. The Provision Manager is the workflow engine. Agents are the workers.

## What CFM models

CFM introduces a few platform concepts you will use throughout onboarding:

| Concept | Meaning |
|---|---|
| **Tenant** | The customer organization or organizational unit known to the platform. |
| **Cell** | A deployment zone where participant services are created, such as a Kubernetes cluster or region. |
| **Dataspace profile** | Dataspace-specific configuration: protocol settings, credentials, trust anchors, policy templates, and onboarding expectations. |
| **Participant profile** | A binding that makes a tenant active in one or more dataspaces, in a specific cell, with a specific identity. |
| **Activity** | One step in the provisioning workflow, executed by an agent. |

A tenant can have more than one participant profile if it joins multiple dataspaces, uses multiple deployment zones, or needs separate identities.

## Bootstrap sequence

A typical managed platform bootstrap looks like this:

1. deploy infrastructure: PostgreSQL, NATS, IDP, secret store, networking;
2. deploy Control Plane and Identity Hub;
3. deploy CFM Tenant Manager and Provision Manager;
4. deploy activity agents;
5. create at least one cell;
6. create one or more dataspace profiles;
7. verify provisioner credentials and agent connectivity;
8. provision a test participant;
9. validate Management API, Identity Hub API, DSP endpoint, and credentials.

Do not skip the cell and profile setup. Participant provisioning needs to know where to deploy the participant context and which dataspace rules to apply.

## Orchestration flow

```text
POST participant profile
        │
        ▼
Tenant Manager records desired state
        │
        ▼
Provision Manager creates activities
        │
        ▼
NATS dispatches work to agents
        │
        ▼
Agents update platform systems
        │
        ▼
Participant profile reaches active state
```

Provisioning is asynchronous because it touches several systems. The caller should poll or subscribe to status until all required activities become active or a failure is reported.

## Operational checks

For CFM itself, monitor:

- Tenant Manager API availability;
- Provision Manager health;
- NATS connection health and consumer lag;
- failed, retried, or stuck activities;
- agent availability by type;
- database connectivity and migration status;
- provisioning duration by activity;
- audit trail for tenant and profile changes.

CFM is an automation layer, not a governance authority. It should only provision participants that have already passed the onboarding process defined by the dataspace authority.

For full architecture details, see the [CFM System Architecture](https://github.com/Metaform/connector-fabric-manager/blob/main/docs/developer/architecture/system.architecture.md).
