---
title: "Chapter 13: Add Portal and Observability"
description: "Add customer-facing UX and operator visibility on top of the baseline platform."
---

A baseline platform can be API-only. Technical integrators can publish assets, negotiate contracts, and register data planes with the Management API.

Most customers still need a portal. Operators also need observability before they can support a shared service.

## Portal responsibilities

A portal should simplify participant operations without hiding the underlying model.

Common portal capabilities:

| Capability | What it helps users do |
|---|---|
| Participant dashboard | See context, DID, credentials, profile, and status. |
| Asset publishing | Create assets, policies, and contract definitions from guided forms or templates. |
| Catalog browsing | Query known providers or federated catalog results. |
| Contract management | View negotiations, agreements, and policy terms. |
| Transfer monitoring | Start transfers and inspect status. |
| Credential view | Show credential status and renewal needs. |
| Data plane setup | Register or test data plane endpoints. |
| Support view | Export diagnostic information for operators. |

The portal usually calls the same Management API and Identity Hub API that an integrator would call directly. It should use participant-scoped tokens and enforce the same isolation rules.

## Onboarding frontend

If your platform handles onboarding, the portal or a separate onboarding frontend may collect:

- organization information;
- legal agreements and consents;
- proof documents;
- requested dataspace memberships;
- technical contact information;
- preferred deployment model;
- data plane requirements.

The frontend should not treat submission as automatic activation unless the dataspace authority allows it. Legal approval and technical provisioning are separate steps.

## Observability responsibilities

The operator needs visibility across infrastructure, platform services, provisioning workflows, and participant-facing APIs.

Monitor at least:

| Layer | Signals |
|---|---|
| Infrastructure | CPU, memory, disk, network, ingress, TLS expiry, database health, NATS health. |
| EDC services | Health/readiness, request latency, error rates, failed negotiations, failed transfers, context isolation errors. |
| Identity | token validation errors, JWKS refresh, credential presentation failures, DID resolution failures. |
| CFM | provisioning duration, failed activities, stuck activities, NATS lag, agent health. |
| Data planes | registration status, signaling failures, transfer success/failure, throughput, backend errors. |
| Portal | login failures, API errors, user-visible operation failures. |

## Customer-visible status

For a managed service, customers should see status that is useful but not cross-tenant sensitive:

- their participant context status;
- credential status;
- recent negotiation and transfer status;
- registered data planes;
- known incidents affecting their environment;
- planned maintenance windows.

Do not expose another participant's assets, agreements, logs, credentials, or operational details.

## Audit and support

Dataspace interactions can become business-critical. Keep audit trails for:

- onboarding approvals;
- participant provisioning changes;
- IDP client creation and rotation;
- credential issuance and revocation events;
- policy and contract definition changes;
- contract negotiation and transfer lifecycle events;
- operator admin actions.

The exact retention policy is a governance and legal decision. The platform should make the necessary events available.

## Scope boundary

A portal improves usability. It does not replace application integration. A participant that wants to automatically publish new documents, synchronize data into a PLM system, or implement a domain-specific workflow still needs an application that uses the platform APIs.
