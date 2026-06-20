---
title: "Chapter 11: Customer Handoff"
description: "What a participant or system integrator receives after provisioning, and what stays internal to the platform."
---

A successful provisioning workflow is not finished until the customer or their system integrator can use the participant context safely.

The handoff package turns platform-created resources into something a participant application can use.

## Handoff package

Provide the participant with the information needed to operate its connector context.

| What | Example | Purpose |
|---|---|---|
| Participant context ID | `towerworks-ctx-001` | Identifies the participant context in platform APIs and token claims. |
| OAuth2 client credentials | `client_id` and `client_secret` | Lets the participant obtain API access tokens. |
| Token endpoint | `https://auth.platform.example/oauth2/token` | Issues short-lived bearer tokens. |
| Management API base URL | `https://cp.platform.example/api/mgmt/v4alpha/participants/{ctxId}/` | Lets applications manage assets, policies, contracts, catalogs, negotiations, transfers, and data-plane registrations. |
| Identity Hub API URL | `https://ih.platform.example/api/identity/participants/{ctxId}/` | Lets approved clients inspect or manage DID and credential information. |
| DSP protocol endpoint | `https://cp.platform.example/api/dsp/{ctxId}/2025-1` | The address other participants use for dataspace protocol interactions. |
| DID | `did:web:ih.platform.example:towerworks` | The participant's decentralized identifier. |
| Dataspace profile name | `winddata-alliance` | Tells the integrator which rules, credentials, and protocol expectations apply. |
| Initial credential status | `MembershipCredential: active` | Confirms whether required credentials are already available. |
| Data plane instructions | Registration requirements, reachable URLs, allowed transfer types | Needed if the participant runs or registers a data plane. |

The exact URLs depend on your deployment. Keep the structure stable and documented.

## What not to hand over

Customers should not need direct access to:

- CFM internal APIs unless you intentionally expose a controlled self-service provisioning API;
- NATS;
- platform databases;
- secret-store internals;
- admin clients;
- service-to-service credentials;
- other participants' context IDs or credentials;
- infrastructure dashboards with cross-tenant data.

A managed platform should expose participant-safe APIs, not internal plumbing.

## Handoff validation

Include a small validation sequence:

1. request an access token with the client credentials;
2. call a Management API read endpoint;
3. call an Identity Hub read endpoint if allowed;
4. confirm the token is scoped to the correct participant context;
5. retrieve or view the participant DID;
6. verify required credentials are active;
7. if a data plane is used, register it or confirm a managed data plane is available;
8. run a simple publish or catalog request in a sandbox before production use.

This turns handoff from a document exchange into a tested operational boundary.

## Handoff for integrators

Many participants will give the package to a system integrator or application team. Write the handoff for that audience:

- include example token requests;
- explain token lifetime and rotation;
- list API base URLs separately from protocol endpoints;
- identify which environment the endpoints belong to;
- document support contacts and escalation process;
- provide sample policies or asset templates if your platform offers them;
- link to the application-building material for publishing, consuming, and data-plane integration.

For application-side work, continue with [Build a Dataspace Application](../application/).

## Data plane handoff

If the participant operates its own data plane, the handoff also needs:

- data plane control endpoint requirements;
- allowed source types and transfer types;
- network reachability requirements from the Control Plane;
- token validation expectations;
- TLS and certificate requirements;
- registration API instructions;
- test transfer procedure;
- support boundaries between platform operator and data plane operator.

If the platform provides a managed data plane, explain what storage or backend integration the customer must configure and which responsibilities remain with them.

## Local sandbox

To see the full stack running locally — including EDC, CFM, agents, and provisioning — check out the [JAD sandbox](https://github.com/Metaform/jad). It provides a complete dataspace environment on a local kind cluster, with preconfigured infrastructure, bootstrap jobs, and end-to-end provisioning scripts.
