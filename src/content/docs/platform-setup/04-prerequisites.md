---
title: "Chapter 4: Infrastructure Prerequisites"
description: "The cluster, persistence, identity, messaging, secrets, networking, and operations foundations required before deploying dataspace services."
---

Before deploying dataspace components, prepare the platform foundation. Most prerequisites are ordinary cloud-native services. The dataspace-specific part is how those services are configured for participant isolation, credential handling, provisioning automation, and externally reachable protocol endpoints.

## Baseline infrastructure

| Component | Purpose | Baseline requirement |
|---|---|---|
| Kubernetes or comparable runtime | Runs Control Plane, Identity Hub, CFM, agents, and optional services | Namespaces, service accounts, ingress, rolling updates, persistent volumes where needed |
| PostgreSQL | Persistent state for Control Plane, Identity Hub, CFM, and optional services | Separate databases or schemas per component; backup and restore plan |
| OAuth2/OIDC provider | Issues access tokens for platform APIs | Client-credentials support, JWT access tokens, JWKS endpoint, custom claims, scoped clients |
| Secret store | Stores keys, client secrets, token material, and credential-related secrets | KV-style API, encryption at rest, access policies, rotation process |
| NATS with JetStream | Reliable messaging between CFM and activity agents | Persistence, durable consumers, delivery guarantees, monitoring |
| Ingress, DNS, and TLS | Exposes APIs and protocol endpoints | Stable public or private hostnames, valid certificates, route separation by API type |
| Observability stack | Lets operators diagnose and support the platform | Logs, metrics, health checks, alerts, dashboards, audit events |

For a local demonstration environment, these can be lightweight. For a shared service, they need the same operational care as any customer-facing platform.

## Endpoint planning

Plan endpoints before deploying. Participants and counterparties will rely on stable addresses.

Typical endpoint groups:

| Endpoint group | Used by | Examples |
|---|---|---|
| Management API | Participant applications, portals, integrators | Asset, policy, contract, catalog, negotiation, and transfer operations |
| Identity Hub API | Participant applications and identity workflows | DID, key, credential, and presentation operations |
| DSP protocol endpoint | Other dataspace participants | Catalog requests, negotiations, protocol messages |
| CFM API | Platform automation and operators | Tenant and participant provisioning |
| Data plane control endpoint | Control Plane | Data Plane Signaling messages |
| Data transfer endpoint | Consumers or provider data planes | Actual file, API, stream, or protocol transfer |

Do not expose every internal service to customers. CFM, NATS, databases, and secret-store APIs should remain platform-internal unless you deliberately build a controlled operator interface around them.

## Identity prerequisites

Your IDP must support tokens that services can use to authorize requests by role and participant context.

At minimum, plan for:

- an `admin` client or role for bootstrap and emergency operations;
- a `provisioner` client or role used by CFM and automation;
- `participant` clients or roles scoped to one participant context;
- top-level JWT claims for role, scope, and `participant_context_id`;
- service-to-service clients for agents and optional services;
- key rotation and JWKS availability.

Identity provider setup is covered in more detail in [Chapter 8](./08-identity-provider-setup/).

## Governance inputs needed before bootstrap

Some inputs must come from the dataspace authority or program team before the platform can be configured coherently:

| Input | Why you need it |
|---|---|
| Supported dataspace profiles | Determines protocol versions, credential requirements, policy templates, and trust anchors. |
| DID method and hostname strategy | Determines participant identifiers and Identity Hub discovery URLs. |
| Credential requirements | Determines issuer integration and onboarding workflow. |
| Trusted issuers or trust anchors | Determines verifier and policy configuration. |
| Legal onboarding process | Determines which approved applicants can be technically provisioned. |
| Offboarding and suspension rules | Determines how credentials, tokens, and participant access are disabled. |

You can deploy a technical sandbox without all governance decisions. A real shared platform should not onboard participants until these decisions are explicit.

## Operator runbooks to prepare early

Prepare these runbooks before opening the platform to users:

- provisioning success and failure diagnosis;
- participant credential refresh or reissuance;
- IDP client rotation;
- database backup and restore;
- secret rotation;
- certificate renewal;
- service upgrade and rollback;
- data plane registration troubleshooting;
- incident communication and customer status updates.

A baseline deployment is a starting point. It still requires hardening, capacity planning, security review, and operational testing before production use.
