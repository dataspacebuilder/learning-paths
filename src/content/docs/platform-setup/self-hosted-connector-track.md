---
title: "Chapter 12: Self-Hosted Connector Track"
description: "How the platform model changes when a participant operates its own connector stack."
---

Not every participant will consume a managed connector service. Some participants operate their own Control Plane, Identity Hub, and data planes. They may do this for regulatory reasons, network locality, internal platform standards, or because they want full operational control.

Self-hosting changes who runs the components. It does not change the dataspace interaction model.

## What the participant operates

A self-hosted participant usually needs:

| Component | Responsibility |
|---|---|
| Control Plane | Publish assets, expose catalog, negotiate contracts, coordinate transfers, expose DSP endpoint. |
| Identity Hub | Manage DID, keys, credentials, and presentations. |
| Data plane or application-as-data-plane | Serve or receive data under Control Plane coordination. |
| IDP integration | Issue API tokens for local management access, or integrate with an approved enterprise IDP. |
| Secret management | Protect client secrets, keys, credential material, and data-plane secrets. |
| Persistence and operations | Databases, backups, monitoring, upgrades, incident response. |
| Network exposure | Stable TLS endpoints for DSP and data transfer where required. |

The participant becomes its own platform operator for that connector stack.

## What the shared platform may still provide

Even when the connector is self-hosted, a dataspace initiative or platform operator may still provide shared services:

- onboarding portal;
- membership approval workflow;
- credential issuer integration;
- trust lists and dataspace profiles;
- federated catalog;
- conformance checks;
- reference Helm charts or deployment templates;
- support documentation and test environments.

Self-hosting does not mean every participant is isolated from the program. It means the runtime responsibility moves closer to the participant.

## Hybrid onboarding

A self-hosted participant still needs to be recognized by the dataspace.

A typical flow:

1. legal onboarding approves the organization;
2. the participant deploys its connector stack;
3. the participant publishes its DID and DSP endpoint;
4. the dataspace authority or issuer verifies required evidence;
5. credentials are issued to the participant's Identity Hub;
6. the participant passes connectivity and policy tests;
7. the participant becomes active in the dataspace registry or profile configuration.

CFM can still help if your platform models self-hosted cells or performs validation workflows, but it may not create every resource directly.

## Handoff differences

For a self-hosted participant, the handoff looks different.

| Managed connector handoff | Self-hosted connector handoff |
|---|---|
| Participant receives platform API URLs and credentials. | Participant receives profile requirements, trust configuration, and conformance criteria. |
| Platform creates Control Plane and Identity Hub context. | Participant deploys and operates its own services. |
| Platform IDP issues Management API tokens. | Participant configures local API authentication. |
| Platform may issue or store initial credentials. | Credentials must be issued to the participant's own identity infrastructure. |
| Data plane may be managed or registered by participant. | Data plane is usually participant-operated. |

## Minimum checks before activation

Before marking a self-hosted participant active, verify:

- DSP endpoint is reachable and uses valid TLS;
- DID resolves according to the dataspace profile;
- required credentials are present and valid;
- catalog request flow works in a test scenario;
- contract negotiation succeeds under a known policy;
- transfer coordination works with the participant's data plane;
- participant meets logging, security, and support expectations defined by the dataspace.

## When to recommend self-hosting

Self-hosting may be appropriate when:

- data must stay near plant, grid, or on-premises systems;
- the participant has strict network segmentation requirements;
- the participant already operates a mature Kubernetes or platform environment;
- the dataspace authority requires local connector operation;
- custom data planes or protocol adapters need to run next to internal systems.

For smaller participants or pilots, a managed platform is often faster. For larger industrial participants, hybrid or self-hosted deployment may be the long-term model.
