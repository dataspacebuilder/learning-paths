---
title: "Chapter 8: From Pilot to Scale"
description: "How to mature the trust model without turning every rule into custom work."
---

A pilot trust model can be simple. A scaled trust model must be maintainable.

The challenge is to grow without turning every participant, issuer, policy, and profile into custom work. Start with the smallest trust model that proves the loop: approve a participant, issue proof, publish an offer under policy, present proof, negotiate access, transfer data, and see future access change when proof expires or is revoked.

If the pilot cannot complete that loop, adding more credential types, issuers, or profiles will not help.

## Start narrow

For the first WindData production-like profile, one membership credential, one accepted membership issuer, explicit lifecycle rules, and a small policy-pattern catalog are enough.

New credentials should appear only when a real policy needs new proof. New issuers should appear only when the dataspace accepts a new source of authority for a specific kind of proof. New profiles should appear only when the rules, vocabulary, or participant boundary really differ.

## Add issuers deliberately

The membership issuer is already part of the first profile. Later, WindData Alliance may accept other issuers for lab accreditation, program access, security certification, or other targeted proof.

Keep issuer trust scoped. An issuer accepted for lab accreditation is not automatically accepted for membership. A program office accepted for one product program is not automatically accepted for every program.

For each accepted issuer, document the credential type, accepted purpose, profile, change owner, and what happens if issuer trust is removed. The deeper trust-framework context is covered in the [IDSA Rulebook chapter on Dataspace Trust Frameworks](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/009_Dataspace_Trust_Frameworks.md).

## Keep profile boundaries clear

Many organizations will join more than one dataspace or profile. That is mainly a platform and operator topic when it becomes configuration, but the governance boundary should be clear first.

A credential for one profile should not satisfy another profile unless that reuse is explicitly accepted. Similar words can also hide different meanings. "Approved supplier" in one dataspace may not mean the same thing in another.

If mutual recognition is useful, name the credential, issuer or framework, profile, purpose, and accepted version. If it is not documented, do not infer it.

## Replace exceptions with patterns

Early pilots often start with named participants:

> GreenSteel shares with TowerWorks and NorthSea Wind.

That is fine for a story. At scale, named exceptions should become credential and policy patterns. TowerWorks should be allowed because it has the right role or program access, not because its name appears in a custom allow-list.

The goal is not to remove human judgment. The goal is to put human decisions into trust artifacts that can be reviewed, repeated, and changed.

## Manage change visibly

Trust artifacts change. Profiles gain new versions. Credential definitions evolve. Issuers are added or removed. Policy patterns become stricter. Renewal periods change.

Treat those changes as managed releases. Each change should have an owner, a reason, affected profiles, affected credentials or issuers, a migration plan, a test plan, and a communication path.

Governance changes are product changes. If participants are surprised by them only when access fails, the operating model is not ready for scale.

## The Dataspace Trust Model

By the end of this path, WindData Alliance has defined a first dataspace trust model:

- a role model for the organizations and services involved;
- a dataspace profile that explains the shared membership rule;
- a membership credential with an accepted issuer and clear purpose;
- onboarding and lifecycle rules for issuing, renewing, and revoking proof;
- policy patterns that connect governance rules to credential requirements;
- scaling rules for adding issuers, credentials, profiles, and change processes.

That model gives platform teams, issuers, providers, and application teams something consistent to implement. More importantly, it gives participants a shared explanation of why a trust decision succeeds or fails.

The main lesson is that dataspace trust is not the same as login, platform access, or a one-time onboarding decision. Trust depends on the profile, the credential, the accepted issuer, the policy, the current validity of the proof, and the purpose of the interaction.

Keep that model small enough to operate: start with membership, add credentials only when policies need them, accept issuers only for a defined purpose, and treat every change as something participants need to understand.

A mature dataspace trust model is not the largest one. It is the one participants can understand, verify, and evolve without breaking trust every time the ecosystem grows.
