---
title: "Chapter 1: Platform Operating Models"
description: "Managed, self-hosted, and hybrid ways to operate dataspace infrastructure."
---

A dataspace does not require every participant to run the same deployment. What matters is that participants can identify each other, publish catalogs, negotiate agreements, present trusted credentials, and transfer data under agreed policies.

The platform operating model decides who runs the components that make those interactions possible.

## Three common models

| Model | What it means | Typical reader |
|---|---|---|
| **Managed platform** | A cloud service provider or platform operator runs shared services for many participants. Participants receive endpoints, credentials, and a participant context. | CSPs, managed-service operators, dataspace initiatives |
| **Self-hosted participant** | A participant runs its own connector, identity, and data-plane components. It still follows the dataspace profile and trust rules. | Enterprise IT, regulated participants, technical early adopters |
| **Hybrid** | Some services are managed, while sensitive data planes, backend integrations, or participant-specific applications stay under the participant's control. | Large organizations, industrial data spaces, mixed-sensitivity use cases |

The rest of this path uses the managed platform as the main example because it has the most moving parts. The same concepts still apply to self-hosted and hybrid deployments.

## Managed platform

In a managed platform, the operator runs the core services and automates participant provisioning.

```text
Platform operator
  ├─ Control Plane and Identity Hub
  ├─ Connector Fabric Manager
  ├─ activity agents
  ├─ shared infrastructure: IDP, databases, secret store, NATS
  ├─ optional portal, observability, issuer service, federated catalog
  └─ optional managed data planes

Participant
  ├─ receives endpoints and credentials
  ├─ uses Management API and Identity Hub API
  └─ connects data sources through managed or self-operated data planes
```

This model is useful when the dataspace wants a low-friction onboarding path. Participants do not need to become connector operators before they can publish or consume data.

The operator must provide strong isolation, clear handoff material, operational monitoring, backups, secrets management, and a support model.

## Self-hosted participant

In a self-hosted model, the participant operates more of the stack itself:

```text
Participant environment
  ├─ Control Plane
  ├─ Identity Hub
  ├─ data plane or application-as-data-plane
  ├─ participant secrets and keys
  └─ backend integrations
```

The participant still needs a dataspace identity, trusted credentials, reachable DSP endpoints, and policy-compatible configuration. Self-hosting changes the operating responsibility. It does not remove the dataspace rules.

This model is common when data cannot leave a plant network, when the participant already has a mature platform team, or when the dataspace authority requires participants to operate their own connectors.

## Hybrid model

Hybrid deployments are often the practical middle ground.

For example:

- the platform operator runs provisioning, Control Plane, Identity Hub, and portal services;
- the participant runs the data plane next to an ERP, PLM, MES, data lake, or industrial system;
- a domain-specific application is deployed by the operator but connects to customer-owned backends;
- a participant uses a managed connector for most data products and a self-hosted connector for restricted operational data.

Hybrid models make the responsibility split explicit. The platform operator owns shared infrastructure and operational standards. The participant owns sensitive integration points and the data-serving environment.

## What changes between models

| Concern | Managed platform | Self-hosted participant | Hybrid |
|---|---|---|---|
| Control Plane | Operated by platform | Operated by participant | Usually platform, sometimes participant |
| Identity Hub | Operated by platform | Operated by participant | Usually platform |
| Data plane | Managed, participant-operated, or both | Participant-operated | Often participant-operated |
| IDP and tokens | Platform IDP for platform APIs | Participant or dataspace-approved IDP | Mixed; must be documented |
| Provisioning | Automated through CFM | Manual or participant-owned automation | CFM for managed pieces; participant automation for local pieces |
| Operational support | Platform operator first line | Participant first line | Shared runbook needed |

## Decision questions

Before deploying, answer these questions:

1. Who operates the Control Plane and Identity Hub?
2. Where do data planes run, and who supports them?
3. Which systems hold participant secrets and keys?
4. Which IDP issues API tokens, and which claims must appear in those tokens?
5. Which dataspace profiles and credentials must each participant receive?
6. What does the customer handoff include in each model?
7. Who is responsible when a catalog request, negotiation, credential presentation, or transfer fails?

The remaining chapters assume you are building a managed baseline and then show how to extend or adapt it for self-hosted and hybrid operation.
