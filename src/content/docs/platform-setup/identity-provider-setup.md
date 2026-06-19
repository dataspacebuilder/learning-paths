---
title: "Chapter 8: Identity Provider Setup"
description: "Configure tokens, roles, scopes, and participant-context isolation for platform APIs."
---

The platform IDP protects the APIs that participants, portals, CFM, agents, and operators call. It is separate from the verifiable credentials used inside dataspace trust decisions. Both matter, but they answer different questions.

- API tokens answer: **may this caller access this platform API for this participant context?**
- Dataspace credentials answer: **does this participant satisfy the provider's policy during discovery, negotiation, or transfer?**

This chapter covers API tokens.

## Required token shape

The Control Plane, Identity Hub, CFM, and portals need JWT access tokens with enough information to enforce role, scope, and participant isolation.

A typical participant token contains top-level claims like this:

```json
{
  "role": "participant",
  "participant_context_id": "towerworks-ctx-001",
  "scope": "management-api:read management-api:write identity-api:read"
}
```

Keep the claims predictable and easy for services to validate. Avoid hiding critical authorization data in nested, application-specific structures unless every service is configured to understand them.

## Roles

| Role | Used by | Typical permissions |
|---|---|---|
| `admin` | Initial setup, break-glass access, platform operators | Full access across platform APIs; tightly restricted and audited. |
| `provisioner` | CFM and provisioning automation | Create and update tenants, participant contexts, IDP clients, and onboarding state; no routine access to participant data. |
| `participant` | Customer applications, portals acting for a customer, integrators | Manage resources only inside the participant's own context. |
| `service` | Optional platform services | Narrow machine-to-machine permissions for a specific service function. |

The exact names can differ, but the separation should remain. Do not use one omnipotent client for every task.

## Scopes

Design scopes around API surfaces and actions. Examples:

| Scope | Allows |
|---|---|
| `management-api:read` | Read assets, policies, catalog results, agreements, negotiations, and transfers. |
| `management-api:write` | Create or update assets, policies, contract definitions, negotiations, transfers, and data-plane registrations. |
| `identity-api:read` | Read DID and credential status information. |
| `identity-api:write` | Manage identity resources, request credentials, or rotate keys where allowed. |
| `provisioning:write` | Create tenants, participant profiles, cells, and dataspace profile bindings. |
| `admin` | Administrative operations; should be rare and audited. |

Prefer narrowly scoped clients. A portal may need read/write management scopes for the logged-in participant. An onboarding backend may need provisioning scope but not participant data access.

## Participant-context isolation

Participant isolation depends on the `participant_context_id` claim.

When TowerWorks calls the Management API, its token should allow access only to TowerWorks resources. The same endpoint base may serve GreenSteel and GridSight, but the token decides which context the caller can touch.

Check these cases during validation:

1. a TowerWorks token can read TowerWorks assets;
2. the same token cannot read GreenSteel assets;
3. a token without `participant_context_id` is rejected for participant APIs;
4. a token with the wrong role is rejected even if the context exists;
5. expired tokens are rejected;
6. rotated signing keys are picked up through JWKS.

## Client patterns

You will usually create several client types:

| Client type | Created when | Notes |
|---|---|---|
| Bootstrap admin client | Platform installation | Used only for bootstrap and emergency operations. |
| CFM provisioner client | Platform installation | Used by CFM and agents to create participant resources. |
| Participant API client | Participant provisioning | Handed to the participant or integrator; scoped to one participant context. |
| Portal client | Portal deployment | May exchange user login state for participant-scoped API access. |
| Service client | Optional service deployment | Used by services such as federated catalog, monitoring exporters, or onboarding automation. |

Store client secrets in the secret store, not in deployment manifests or handoff emails. Hand off secrets through a controlled process.

## What this does not replace

IDP setup does not replace dataspace credentials. A valid API token lets a caller operate its connector context. It does not prove that the participant is an active dataspace member, an accredited lab, or an approved service partner. Those claims are represented by verifiable credentials and evaluated during dataspace interactions.

For details on EDC-V access control, see the [EDC-V Administration API documentation](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/administration_api.md).
