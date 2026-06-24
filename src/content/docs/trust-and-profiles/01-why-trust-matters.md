---
title: "Chapter 1: Why Trust Matters"
description: "Why identity, credentials, profiles, and governance are central to sovereign data sharing."
---

A dataspace is not only a network of APIs. It is a way for independent organizations to share data while keeping control of identity, policy, and risk.

That means technical connectivity is not enough.

TowerWorks may be able to reach GreenSteel's catalog. That proves the connection works. It does not prove that TowerWorks is an active WindData Alliance member, that it is allowed to access the `GS-87` steel certificate, or that it can comply with the policy attached to the offer.

Trust design answers those questions before the first production transfer.

## Authentication is not the same as trust

Authentication answers a local system question:

> Is this application allowed to use this participant's local platform?

A dataspace credential answers a cross-organization trust question:

> Does this participant have a verifiable attribute that satisfies the provider's policy for this interaction?

Both are necessary. They are not interchangeable.

If a participant has only local platform access, it can operate its own environment but cannot prove anything useful to another participant. If it has only a credential, it still needs software to participate technically. Trust design connects those worlds without confusing them.

## Trust is contextual

Trust in a dataspace is not a global badge. It is tied to a specific interaction.

GridSight might be trusted to receive carbon-intensity summary data for analytics. The same GridSight credential set might not be enough to receive full tower-section engineering drawings. NorthSea Wind might be approved for the `TS-42` evidence pack, but not for evidence from a different turbine program.

The trust decision depends on the participant requesting access, the provider and asset involved, the policy attached to the offer, the credentials presented, the issuer that signed those credentials, the current status of the credentials, and the intended purpose.

The [IDSA Rulebook trust chapter](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/008_Trust.md) gives the deeper conceptual treatment. This learning path turns that idea into design decisions you can hand to operators and application teams.

## What the trust model gives the ecosystem

A good trust model gives participants a shared language for access decisions.

For WindData Alliance, that means GreenSteel can write a policy such as:

> Active WindData Alliance members may request steel mill certificates.

GreenSteel does not need to maintain a custom allow-list for every current and future member. It relies on a credential type, a trusted issuer, and a policy pattern that everyone understands.

That creates three useful properties. It scales because new eligible participants can satisfy the policy without a new bilateral integration. It can change because expired or revoked credentials affect future decisions. And it is explainable because a failed negotiation can point to missing proof, an untrusted issuer, or an incompatible policy.

## The Dataspace Trust Model

For this path, assume WindData Alliance wants to define a first production-like profile for offshore wind product-passport evidence. The chapters move from the conceptual trust problem into the concrete decisions a governance team must make: who has which role, what the shared profile contains, which credentials and issuers are accepted, how onboarding works, and how policies depend on verifiable evidence.

The trust team should define a role and responsibility model, a dataspace profile, a credential catalog, onboarding rules, accepted issuer decisions, credential lifecycle rules, policy patterns, and a support model for missing or invalid proof.

The rest of this path builds those pieces step by step.

## What to avoid

Avoid these shortcuts:

| Shortcut | Why it causes problems |
|---|---|
| Treating platform accounts as membership | A local account does not prove eligibility to other participants. |
| Hard-coding partner names in every policy | Every new participant creates provider-side work and audit risk. |
| Letting each application invent credential values | Policies stop being interoperable. |
| Issuing credentials with no lifecycle rule | Expiration, revocation, and renewal become manual exceptions. |
| Treating onboarding as only a form | Legal approval, technical provisioning, and credential issuance have different states and owners. |

The goal is not to make governance heavy. The goal is to make trust decisions explicit enough that the dataspace can scale.
