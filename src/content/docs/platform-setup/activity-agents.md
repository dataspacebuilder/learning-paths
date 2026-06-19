---
title: "Chapter 7: Deploy Activity Agents"
description: "Deploy the workers that execute provisioning tasks for CFM."
---

Activity agents are the workers behind CFM provisioning. The Provision Manager decides what needs to happen. Agents perform the concrete changes in external systems.

Each agent should be small, stateless, observable, and safe to retry.

## Common agents

| Agent | Responsibility | Typical target system |
|---|---|---|
| **IDP Agent** | Creates OAuth2 clients, scopes, roles, and claim mappings for the participant. | OAuth2/OIDC provider |
| **EDC Agent** | Creates participant contexts in the Control Plane and Identity Hub. | EDC services |
| **Registration Agent** | Registers the participant with an issuer or registration service. | Issuer Service or external registration API |
| **Onboarding Agent** | Requests initial verifiable credentials and stores or delivers them through Identity Hub. | Issuer Service and Identity Hub |

Your exact agent set may differ. For example, a self-hosted participant flow may replace the EDC Agent with a verification step that checks a participant-owned connector.

## Dependency order

Provisioning activities depend on each other.

```text
IDP client and claims
        │
        ▼
EDC participant contexts
        │
        ▼
issuer registration
        │
        ▼
credential request and storage
        │
        ▼
customer handoff package
```

The EDC Agent needs IDP clients before participant-scoped API access works. The onboarding activity needs an identity context before credentials can be stored or presented. The handoff package should not be released until required activities succeed.

## Agent configuration

Each agent needs:

- NATS connection settings and durable consumer configuration;
- credentials for the target system it manages;
- least-privilege permissions for its task;
- timeout and retry settings;
- structured logs with tenant, participant profile, and activity identifiers;
- metrics for success, failure, retry, and duration;
- a clear idempotency strategy.

Idempotency matters. If provisioning retries after a network error, the agent should not create duplicate clients, duplicate contexts, or conflicting credentials.

## Failure handling

Failures should be visible at the participant-profile level and at the activity level.

Examples:

| Failure | Likely response |
|---|---|
| IDP client already exists | Treat as success if configuration matches; otherwise mark conflict. |
| Control Plane context creation fails | Retry if transient; escalate if schema or authorization issue. |
| Issuer unavailable | Keep profile in pending or failed state; retry according to policy. |
| Credential issuance rejected | Surface reason to onboarding workflow; legal or governance approval may be missing. |
| Secret-store write fails | Stop dependent activities; do not hand over partial credentials. |

## What to monitor

At minimum, monitor:

- agent process health;
- NATS subscription health;
- activity backlog by type;
- activity failures and retry counts;
- target-system API failures;
- provisioning latency percentiles;
- credential issuance failures;
- stuck activities with no progress.

Agents are operationally important because they touch the systems that define participant access. Treat them as production automation, not one-off scripts.
