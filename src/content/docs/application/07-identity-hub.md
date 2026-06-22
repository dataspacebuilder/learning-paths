---
title: "Chapter 7: Working with Identity Hub"
description: "Understand DIDs, credentials, credential status, and the application boundary around identity."
---

Identity Hub manages participant identity information: DIDs, keys, credentials, and presentations.

Most applications do not need to implement identity protocols directly. The Control Plane and Identity Hub use credentials during catalog requests, negotiations, and other trusted interactions. Your application mainly needs to know what identity state exists and whether it affects the business flow.

## What Identity Hub does

| Capability | Meaning for an application |
|---|---|
| DID management | The participant has a decentralized identifier used in dataspace interactions. |
| Key management | Keys support proof and presentation flows. Applications usually do not handle private keys directly. |
| Credential storage | Membership, role, accreditation, and domain credentials can be available to the participant. |
| Presentation support | Credentials can be presented when another participant's policy requires them. |
| Status awareness | Credentials may be active, expired, suspended, or revoked. |

In the TowerWorks example, Identity Hub may hold a WindData Alliance membership credential. When TowerWorks requests GreenSteel's catalog, the provider can evaluate whether TowerWorks has the credential required to see the `GS-87` certificate offer.

## What your application needs to know

An application developer usually needs these facts:

- the participant DID;
- which dataspace profile the participant joined;
- which credentials are expected for common flows;
- whether required credentials are active;
- whether a failed catalog or negotiation might be caused by missing or invalid credentials;
- whether the application should surface credential status to users.

You normally should not export private keys, bypass Identity Hub, or create ad-hoc identity stores inside the application.

## Example: checking credential status

Your platform may expose Identity Hub APIs for reading credential summaries.

```http
GET {IDENTITY}/credentials
Authorization: Bearer {token}
```

An application might use the result to show:

```text
Participant: TowerWorks Fabrication
DID: did:web:ih.platform.example:towerworks
WindDataAllianceMembershipCredential: active, expires 2026-12-31
LabAccreditationCredential: not present
```

That information can explain why one workflow is available and another is not. For example, TowerWorks may publish tower-section dossiers as a member but may not publish independent lab reports because it lacks a lab accreditation credential.

## Identity state and application behavior

Identity state should influence application behavior carefully.

| Situation | Application behavior |
|---|---|
| Membership credential active | Allow normal publish/consume workflows that require membership. |
| Credential expiring soon | Warn operators and pause automation if the risk is high. |
| Credential revoked | Stop affected workflows and surface a clear support message. |
| Additional credential required | Start or link to the approved credential request workflow. |
| DID mismatch in configuration | Stop startup or health check; do not operate under ambiguous identity. |

Do not silently retry forever when identity requirements are not satisfied. A missing credential is not a transient HTTP error.

## Where credentials are evaluated

Credentials can be evaluated during several flows:

- catalog request: provider decides which offers are visible;
- contract negotiation: provider evaluates whether requested terms are allowed;
- transfer: provider or data plane may re-check authorization context;
- application workflow: your app may prevent users from starting actions that cannot succeed.

The same credential can affect both machine-level protocol behavior and user-level application behavior.

## Requesting additional credentials

Some applications need additional credentials after onboarding. For example, SafeLoad Labs may need a lab accreditation credential before it can publish independent weld and fatigue reports.

If your platform supports credential requests through Identity Hub or an onboarding service, keep the flow explicit:

1. detect that a credential is missing;
2. show which workflow requires it;
3. submit a request through the approved issuer/onboarding process;
4. wait for issuance;
5. resume the workflow after the credential is active.

Do not let an application mint its own credentials unless it is explicitly acting as an approved issuer. Credential issuance belongs to the trust model.

## What belongs outside this path

This path does not define credential schemas, trusted issuers, legal onboarding rules, revocation policy, or dataspace profile governance.

Application developers should consume those decisions. Trust designers and dataspace authorities define them in [Design Trust, Credentials, and Dataspace Profiles](../trust-and-profiles/).
