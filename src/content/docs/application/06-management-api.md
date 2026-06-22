---
title: "Chapter 6: Working with the Management API"
description: "Use the main participant API for assets, policies, catalogs, negotiations, transfers, and data-plane registrations."
---

The Management API is the main API surface for a dataspace application.

Your application does not call another participant's internal systems directly. It calls its own participant Management API. The Control Plane then performs DSP interactions with counterparties.

## Base URL and authentication

Use the Management API base URL from your handoff.

```text
MANAGEMENT_API_BASE=https://cp.platform.example/api/mgmt/v4/participants/towerworks-ctx-001
```

Every call uses a bearer token:

```http
Authorization: Bearer {access-token}
```

The token must include the role, scopes, and participant context required by the platform. If a token is valid but scoped to another participant, the API should reject the call.

## Main resource groups

| Resource group | Typical use |
|---|---|
| Assets | Describe data or services a provider can offer. |
| Policy definitions | Store access and contract policies. |
| Contract definitions | Bind assets to policies and make offers discoverable. |
| Catalog requests | Ask a provider what offers are visible to this consumer. |
| Contract negotiations | Start and track access negotiations. |
| Contract agreements | Inspect finalized agreements. |
| Transfer processes | Start and track data transfers. |
| Data plane registrations | Tell the Control Plane which data planes can handle which transfers. |

Exact endpoint names and versions are defined by the EDC version your platform runs. The examples in this path use the common v4-style shape.

## JSON-LD basics

EDC Management API payloads use JSON-LD. Include the management context unless your platform documentation says otherwise.

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "Asset",
  "@id": "towerworks:asset:ts-42-dossier"
}
```

Why this matters:

- fields are interpreted as vocabulary terms, not just local JSON keys;
- policy and catalog data may use ODRL and DCAT terms;
- selectors and constraints may require fully qualified operands;
- copying a response and dropping context fields can break later requests.

Your API client should preserve JSON-LD fields it does not understand, especially catalog offer policies used for negotiation.

## ODRL policy basics

Policies describe permissions, prohibitions, obligations, and constraints.

A minimal policy shape might say that use is permitted if a credential condition is satisfied:

```json
{
  "@type": "Set",
  "permission": [
    {
      "action": "use",
      "constraint": {
        "leftOperand": "MembershipCredential.status",
        "operator": "eq",
        "rightOperand": "active"
      }
    }
  ]
}
```

Real policy vocabularies are profile-specific. Work with the dataspace authority or trust-design team before inventing operands. If every provider invents a different string for the same credential claim, policies will not be interoperable.

## Asynchronous resources

Negotiations and transfers are not immediate function calls. They are state machines.

```text
create request ─► id returned ─► poll/read state ─► finalized/started or failed
```

Your application should:

- store the returned ID;
- poll with backoff or subscribe to events if your platform offers them;
- persist state before taking irreversible backend action;
- handle timeout, decline, termination, and retry separately;
- expose useful status to users and support teams.

Do not assume a negotiation failed because it did not complete during one HTTP request.

## Request patterns

Use a small API client layer rather than scattering raw HTTP calls through your application.

A practical client provides methods like:

```text
createAsset(asset)
createPolicyDefinition(policy)
createContractDefinition(definition)
requestCatalog(counterparty, query)
startNegotiation(offer)
getNegotiation(id)
startTransfer(agreement, destination)
getTransfer(id)
registerDataPlane(registration)
```

The client should centralize token refresh, JSON-LD contexts, retry policy, logging redaction, and error mapping.

## Error handling

Common error classes:

| Error | Likely cause | Application response |
|---|---|---|
| `401 Unauthorized` | Missing, expired, or invalid token. | Refresh token; if repeated, raise identity configuration issue. |
| `403 Forbidden` | Token lacks scope or participant context. | Stop and alert; retrying will not help until authorization changes. |
| `404 Not Found` | Wrong resource ID, wrong context, or route mismatch. | Check configuration and stored IDs. |
| `409 Conflict` | Resource already exists or state transition conflict. | Treat idempotently if the existing resource matches intended state. |
| `4xx validation` | JSON-LD, ODRL, selector, or payload error. | Fix application payload or profile configuration. |
| `5xx` | Platform or dependency failure. | Retry with backoff and alert if persistent. |
| Async failure state | Counterparty, policy, credential, or data-plane failure. | Inspect process state and diagnostics; do not just repeat blindly. |

## Idempotent publication

Publishing flows often run from backend events. Events can be delivered twice.

Use stable IDs and upsert-like behavior where possible:

- asset ID from backend object ID;
- policy ID from policy template and version;
- contract definition ID from asset ID and audience;
- data address from a stable backend reference.

If the API does not provide an upsert operation, implement read-before-create or handle conflict responses deliberately.

## Upstream references

Use this path for orientation. Use upstream references for exact request and response details:

- [EDC Documentation](https://eclipse-edc.github.io/documentation/)
- [EDC Samples](https://github.com/eclipse-edc/Samples)
- [Minimum Viable Dataspace](https://github.com/eclipse-edc/MinimumViableDataspace)
