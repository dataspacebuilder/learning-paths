---
title: "Chapter 12: Deployment and Operations"
description: "Configure, secure, observe, and support a dataspace application in real environments."
---

A dataspace application is distributed software. It talks to identity providers, Control Planes, Identity Hub, data planes, backend systems, and other participants indirectly through DSP.

Operational design matters as much as API usage.

## Runtime configuration

Keep environment-specific configuration outside code.

| Configuration | Example |
|---|---|
| Participant context | `towerworks-ctx-001` |
| Dataspace profile | `winddata-alliance` |
| Token endpoint | `https://auth.platform.example/oauth2/token` |
| Management API base | `https://cp.platform.example/api/mgmt/v4/participants/towerworks-ctx-001` |
| Identity Hub API base | `https://ih.platform.example/api/identity/participants/towerworks-ctx-001` |
| Default protocol | `dataspace-protocol-http:2025-1` |
| Known providers | GreenSteel DID and DSP endpoint, SafeLoad DID and DSP endpoint |
| Policy template version | `winddata.member.use.v1` |
| Data-plane mode | `managed-http`, `standalone`, or `application` |

Separate sandbox, staging, and production values. Do not point a production app at sandbox identity or credentials.

## Secret handling

Protect:

- OAuth client secrets;
- data-plane credentials;
- backend system credentials;
- signing or encryption keys if the app owns any;
- webhook secrets;
- database credentials.

Do not log bearer tokens, client secrets, transfer tokens, full data addresses with credentials, or private backend URLs.

## Token lifecycle

Access tokens are short-lived. Your application should:

- request tokens lazily or through a token cache;
- refresh before expiry;
- retry once on token expiration;
- fail clearly on repeated authorization errors;
- request only needed scopes;
- avoid sharing one broad token across unrelated tenants or workflows.

In multi-tenant applications, key token cache entries by participant context and scope.

## Resilience patterns

Dataspace workflows are asynchronous and cross-organizational. Build for delay and partial failure.

Use:

- durable workflow state;
- idempotent business keys;
- retry with exponential backoff for transient errors;
- separate retry policy for API calls and backend writes;
- timeouts for catalog, negotiation, and transfer workflows;
- dead-letter or manual review queues for stuck workflows;
- reconciliation jobs that compare backend state with dataspace state.

Avoid a design where losing one process memory loses every negotiation ID or transfer ID.

## Observability

Log and measure by business and dataspace identifiers.

Useful fields:

- participant context ID;
- dataspace profile;
- provider or consumer DID;
- asset ID;
- contract definition ID;
- negotiation ID;
- agreement ID;
- transfer process ID;
- backend object ID;
- policy template version;
- state transition;
- error class.

Metrics should include:

- catalog request success/failure;
- negotiation duration and outcome;
- transfer duration and outcome;
- token failures;
- backend adapter failures;
- data-plane signaling failures;
- queue depth for pending workflows.

## Audit trail

Keep an audit trail for meaningful business actions:

- asset published, updated, or withdrawn;
- policy changed;
- offer negotiated;
- agreement accepted;
- transfer started and completed;
- data stored in backend;
- human approval granted;
- credential status blocked a workflow.

Audit records should link dataspace IDs to internal business IDs. That makes later support and compliance review possible.

## Deployment modes

| Mode | Use when | Notes |
|---|---|---|
| Single-tenant app | One participant has a dedicated deployment. | Simpler isolation; more deployments. |
| Multi-tenant app | One deployment serves many participant contexts. | Strong tenant isolation and token handling required. |
| Sidecar/near-backend app | App runs near a sensitive backend system. | Useful for industrial networks and self-hosted participants. |
| Platform-managed app | Platform operator deploys app for customers. | Requires clear support and responsibility model. |

Choose based on data sensitivity, tenant isolation needs, operations model, and backend network access.

## Support boundaries

Define who handles each failure.

| Failure | Likely owner |
|---|---|
| Token endpoint unavailable | Platform operator or identity team |
| Management API rejects context | Platform operator or handoff configuration owner |
| Catalog empty due to missing credential | Trust/onboarding owner and participant admin |
| Policy template selected incorrectly | Application team and business owner |
| Backend document missing | Participant application/backend team |
| Data-plane transfer timeout | Data-plane operator and application team |
| Counterparty connector unavailable | Counterparty or dataspace support process |

A good runbook starts with classification. Without ownership boundaries, every incident escalates to everyone.

## Production caution

The examples in this learning path are educational. Before production, add security reviews, threat modeling, monitoring, backup and restore procedures, compliance checks, load testing, and upgrade plans appropriate to your environment.
