---
title: "Chapter 1: Why Trust Matters"
description: "Why identity, credentials, profiles, and governance are central to sovereign data sharing."
---

A dataspace is not only a network of APIs. It is a way for independent organizations to share data while keeping control of identity, policy, and risk.

That means technical connectivity is not enough.

TowerWorks can call GreenSteel's catalog endpoint. That proves the network path works. It does not prove that TowerWorks is an active WindData Alliance member, that it is allowed to access the `GS-87` steel certificate, or that it can comply with the policy attached to the offer.

Trust design answers those questions before the first production transfer.

## Authentication is not the same as trust

A platform access token answers a local platform question:

> Is this application allowed to call this participant's Management API?

A dataspace credential answers a cross-organization trust question:

> Does this participant have a verifiable attribute that satisfies the provider's policy for this interaction?

Both are necessary. They are not interchangeable.

| Mechanism | Typical scope | Example |
|---|---|---|
| OAuth2 access token | Platform API access | TowerWorks Evidence Bridge may create assets in the TowerWorks participant context. |
| Verifiable credential | Dataspace trust decision | TowerWorks proves it is an active WindData Alliance member. |
| Policy | Provider's condition for access or use | GreenSteel requires active membership before negotiation. |
| Dataspace profile | Shared rules and configuration bundle | WindData Alliance defines accepted credentials, issuers, protocols, and policy vocabulary. |

If a participant has only an API token, it can operate its own connector context but cannot prove anything useful to another participant. If it has only a credential, it still needs a connector or application to participate technically.

## Trust is contextual

Trust in a dataspace is not a global badge. It is tied to a specific interaction.

GridSight might be trusted to receive carbon-intensity summary data for analytics. The same GridSight credential set might not be enough to receive full tower-section engineering drawings. NorthSea Wind might be allowed to consume the full `TS-42` evidence pack for turbine compliance, but not to republish SafeLoad's lab report to unrelated parties.

The trust decision depends on:

- the participant requesting access;
- the provider and asset involved;
- the policy attached to the catalog offer or contract;
- the credentials presented;
- the issuer that signed those credentials;
- the current validity, status, and revocation state;
- the intended purpose and obligations.

The [IDSA Rulebook trust chapter](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/008_Trust.md) gives the deeper conceptual treatment. This learning path turns that idea into design decisions you can hand to operators and application teams.

## What the trust model gives the ecosystem

A good trust model gives participants a shared language for access decisions.

For WindData Alliance, that means GreenSteel can write a policy such as:

> Active WindData Alliance members may request steel mill certificates.

GreenSteel does not need to maintain a custom allow-list for every current and future member. It relies on a credential type, a trusted issuer, and a policy pattern that everyone understands.

That creates three useful properties:

1. **Scalability** — new eligible participants can satisfy the policy without a new bilateral integration.
2. **Changeability** — expired, suspended, or revoked credentials affect future access decisions.
3. **Explainability** — a failed negotiation can point to a missing credential, untrusted issuer, expired claim, or incompatible policy.

## Trust decisions become technical inputs

Governance choices must become concrete enough for systems to use.

| Governance question | Technical or operational output |
|---|---|
| Who may join WindData Alliance? | Membership policy and onboarding workflow. |
| What proof does a member receive? | `WindDataMembershipCredential` schema and issuer configuration. |
| Who may issue lab accreditation? | Trusted issuer list for lab credentials. |
| Which protocols and versions are accepted? | Dataspace profile and protocol context configuration. |
| What can active members see? | Access policy templates. |
| What can approved manufacturers negotiate? | Contract policy templates. |
| What happens when a member is suspended? | Credential status, revocation, participant suspension, and policy behavior. |

If these outputs are missing, platform teams and application teams will invent incompatible interpretations.

## The design package

For this path, assume WindData Alliance wants to define a first production-like profile for offshore wind product-passport evidence.

The trust team should produce:

- a role and responsibility model;
- a dataspace profile named `winddata-alliance`;
- a credential catalog;
- a policy-template catalog;
- legal and technical onboarding states;
- issuer and trust-list rules;
- credential lifecycle rules;
- multi-dataspace and versioning rules;
- a support model for missing, expired, or revoked credentials.

The rest of this path builds those pieces.

## What to avoid

Avoid these shortcuts:

| Shortcut | Why it causes problems |
|---|---|
| Treating platform accounts as membership | A local account does not prove eligibility to other participants. |
| Hard-coding partner names in every policy | Every new participant creates provider-side work and audit risk. |
| Letting each application invent claim names | Policies stop being interoperable. |
| Issuing credentials with no lifecycle rule | Expiration, suspension, revocation, and renewal become manual exceptions. |
| Treating onboarding as only a form | Legal approval, technical provisioning, and credential issuance have different states and owners. |

The goal is not to make governance heavy. The goal is to make trust decisions explicit enough that the dataspace can scale.
