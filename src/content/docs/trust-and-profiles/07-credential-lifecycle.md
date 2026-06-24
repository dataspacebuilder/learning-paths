---
title: "Chapter 6: Manage Credential Lifecycle"
description: "How governance teams decide when trust starts, changes, and ends."
---

A credential is not a permanent badge. It is a statement made at a point in time, under a profile, by an accepted issuer.

Trust in a dataspace is time-bound. A credential lifecycle makes that practical: it says when proof becomes valid, how long it remains useful, when it must be renewed, and when it must stop satisfying future access decisions.

## Define the lifecycle rule

For each credential type, the governance team should answer a small set of questions:

- When can it be issued?
- How long is it valid?
- What keeps it current?
- When must it be revoked or retired?
- Which conditions still count as acceptable proof?

For WindData Alliance, a membership credential may be valid for one year. A lab accreditation credential should not outlive the accreditation behind it. A program access credential should usually end with the program or contract relationship.

## Keep proof current

Participants present credentials when they need to prove something to another participant. The verifier checks whether the proof still satisfies the policy: accepted issuer, accepted credential type, right profile, accepted conditions, and validity period.

Renewal keeps old assumptions from staying active forever. It gives the participant a regular moment to show that membership, accreditation, approval, or program participation still holds.

## End acceptance

Revocation means the credential should no longer satisfy future trust decisions.

Reasons include withdrawn accreditation, false evidence, compromised credentials, policy violations, inability to re-validate important claims, or replacement by a new credential. Revocation changes future access. It does not automatically erase data already transferred under a valid agreement; retention, deletion, and downstream use still need legal and application controls.

## Close the loop

Offboarding is the business process for ending participation in a profile or dataspace. It should lead to the right credential action, usually revocation or retirement, and also cover platform access, participant records, subscriptions, audit retention, and open agreements.

Do not treat offboarding as only deleting a technical account. It is a coordinated trust, platform, and contractual process. A participant may leave WindData Alliance while some past obligations continue to matter.

## Handoff to operators and applications

Operators need lifecycle rules for each credential type: when to issue, renew, revoke, and retire. Applications need clear user-facing explanations for common failures such as missing, expired, revoked, or unsupported credentials.

Do not expose sensitive internal details to counterparties, but give legitimate participants enough information to fix onboarding or renewal problems.

For the deeper trust model, including re-evaluation, expiry, revocation, and trust withdrawal, see the [IDSA Rulebook trust chapter](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/008_Trust.md).

By now, you should know how each important credential becomes valid, how it stays current, and how it stops being accepted.
