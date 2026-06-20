---
title: "Chapter 7: Credential Lifecycle"
description: "How credentials are issued, stored, presented, renewed, suspended, revoked, and retired."
---

A credential is not a one-time onboarding artifact. It has a lifecycle.

If the lifecycle is missing, participants will eventually rely on stale membership, expired accreditation, or credentials that should have been suspended. That undermines the trust model.

## Lifecycle overview

A practical lifecycle has these stages:

```text
approved evidence
      │
      ▼
issuance
      │
      ▼
storage in holder identity infrastructure
      │
      ▼
presentation during catalog or negotiation
      │
      ▼
verification by another participant
      │
      ├─ renewal before expiry
      ├─ suspension if temporarily invalid
      ├─ revocation if no longer valid
      └─ retirement at offboarding or schema migration
```

The dataspace profile should define what happens at each stage for every important credential type.

## Issuance

Issuance creates the credential after the required evidence has been approved.

For WindData Alliance:

- TowerWorks is approved as a member;
- the onboarding record references the approved evidence;
- the issuer receives an issuance request;
- the credential is signed for TowerWorks' DID;
- the credential status entry is created;
- the credential is delivered to TowerWorks' Identity Hub.

Issuance should be traceable. A support team should be able to answer:

- which credential was issued;
- to which holder;
- by which issuer;
- under which profile;
- based on which approval record;
- with which validity period;
- with which status reference.

## Storage

The holder stores credentials in its identity infrastructure, such as Identity Hub.

The application path explains what application developers need to know in [Working with Identity Hub](../application/identity-hub/). Trust designers need to define what credentials should be available and how they are expected to be presented.

Do not make domain applications store raw credentials unless there is a strong reason. Let identity infrastructure handle credential storage and presentation.

## Presentation

Presentation happens when a participant needs to prove claims to another participant.

Examples:

| Interaction | Credential need |
|---|---|
| TowerWorks asks GreenSteel for the `GS-87` catalog offer. | Active membership credential. |
| SafeLoad publishes an official weld and fatigue report. | Membership credential and lab accreditation credential. |
| NorthSea Wind negotiates the full `TS-42` dossier. | Membership credential and manufacturer or program access credential. |
| GridSight requests analytics summary data. | Membership credential and analytics provider credential. |

The profile should define which credentials may be requested and how much information should be disclosed.

## Verification

The verifier checks whether the presented credential satisfies policy.

Typical checks include:

- holder binding matches the presenting participant;
- issuer signature is valid;
- issuer is trusted for this credential type;
- credential type and schema version are accepted;
- required claims are present;
- values match policy constraints;
- validity period covers the interaction;
- credential is not revoked or suspended;
- presentation is fresh enough for the risk class.

Verification is part of the control-plane trust decision. The data plane should not invent separate trust logic for the same decision.

## Renewal

Credentials should have validity periods. Renewal makes participants periodically prove that assumptions still hold.

Define renewal rules per credential type.

| Credential | Example validity | Renewal trigger |
|---|---|---|
| Membership | 12 months | Agreement renewal or annual review. |
| Lab accreditation | Until external accreditation expires | New accreditation evidence. |
| Program access | Program duration or shorter | Program owner approval. |
| Analytics provider | 6 months in pilot | Review of data-use obligations. |

Notify participants before expiration. A credential that expires silently will look like a technical failure to applications and users.

## Suspension

Suspension is temporary. The credential may become valid again after a condition is resolved.

Examples:

- GridSight's analytics approval is paused during a compliance review;
- TowerWorks has not completed an annual renewal step;
- an issuer key rotation requires temporary status review;
- a participant is under investigation but not permanently removed.

Define what suspension blocks:

| Scope | Possible behavior |
|---|---|
| Catalog visibility | Offers requiring the suspended credential are hidden. |
| Contract negotiation | New negotiations fail. |
| Transfer start | New transfers fail even if an agreement exists. |
| Existing agreements | Continue, pause, or terminate depending on policy and contract terms. |

Do not assume every suspension should terminate existing transfers. That decision depends on risk, policy, and legal commitments.

## Revocation

Revocation means the credential should no longer be accepted.

Reasons include:

- participant leaves the dataspace;
- accreditation is withdrawn;
- evidence was false;
- legal entity is no longer eligible;
- credential was compromised;
- a replacement credential supersedes it.

Revocation should affect future trust decisions. It does not automatically erase data already transferred under a valid agreement. Retention, deletion, and downstream usage obligations need legal and application controls.

The use case chapter [Trust Changes](../use-case/trust-changes/) illustrates this distinction in story form.

## Offboarding

Offboarding ends participation in a profile or dataspace.

A complete offboarding plan should cover:

- revoking or letting membership credentials expire;
- suspending platform API access;
- disabling or archiving participant contexts;
- ending subscriptions or notification flows;
- rotating secrets where needed;
- preserving audit records according to policy;
- handling existing agreements and retention obligations;
- communicating status to counterparties if the profile requires it.

Offboarding is not only deleting a tenant record. It is a coordinated trust, platform, and contractual process.

## Status and revocation checks

The profile should define how verifiers check credential status.

Important decisions:

1. Which status mechanism is used?
2. How quickly must revocation be visible?
3. Can verifiers use cached status?
4. How long can a cached check remain valid?
5. What happens when status cannot be checked?
6. Which data classes require stricter checks?

For low-risk data, periodic status checks may be enough. For high-risk or regulated data, the profile may require fresh status verification before transfer.

## Support signals

Applications and operators need actionable errors.

Prefer explanations like:

| Signal | Meaning |
|---|---|
| `missing credential: WindDataMembershipCredential` | The holder does not have the required membership proof. |
| `untrusted issuer` | The credential issuer is not trusted for this profile or type. |
| `expired credential` | The credential validity period ended. |
| `suspended credential` | The issuer or authority temporarily disabled it. |
| `revoked credential` | The credential must not be accepted. |
| `unsupported credential version` | The holder must renew or migrate to an accepted schema. |

Do not expose sensitive internal details to counterparties, but give enough information for legitimate participants to fix onboarding or renewal problems.

## Lifecycle checklist

For each credential type, define:

1. issuance prerequisites;
2. holder binding rules;
3. storage and delivery expectations;
4. presentation contexts;
5. verification checks;
6. validity period;
7. renewal workflow;
8. suspension triggers;
9. revocation triggers;
10. offboarding behavior;
11. status-check requirements;
12. support and audit messages.

A credential without lifecycle rules is not a reliable trust instrument. It is just a signed snapshot.
