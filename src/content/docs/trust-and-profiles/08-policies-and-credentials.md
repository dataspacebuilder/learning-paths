---
title: "Chapter 7: Turn Rules into Policy Patterns"
description: "How governance rules become reusable policy patterns based on trusted credentials."
---

Policies are where governance becomes actionable. A policy says what must be true before a participant can see an offer, negotiate access, start a transfer, or accept obligations for later use.

Credentials provide the proof that policies rely on. The governance team does not need to write the final policy payload, but it does need to define the reusable patterns that providers and applications should use.

For the deeper policy treatment, use the [IDSA Rulebook policy chapter](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/105_Policies.md). Application implementation patterns are covered in [Policy Design for Applications](../application/08-policy-design/).

## From rule to pattern

Start with the rule in plain language. Then identify the proof needed to apply it. Only after that should teams translate the pattern into a platform-specific policy.

For example:

| Governance rule | Required proof | Policy pattern |
|---|---|---|
| Only active members may access basic product evidence. | Active WindData membership. | Member-only access. |
| Only accredited labs may publish official test evidence. | Active membership and accepted lab accreditation. | Accredited publisher. |
| Only approved manufacturers may receive full dossiers. | Active membership and manufacturer or program approval. | Approved manufacturer access. |
| Analytics providers may receive only summary data. | Active membership and analytics approval. | Analytics summary access. |

This mapping prevents every provider from inventing a different rule for the same trust decision.

## Access, contract, and usage

Policies appear at different moments. An access policy controls whether a participant can discover or see an offer. A contract policy controls whether the participant can agree to terms and receive access. A usage policy or obligation describes what must happen after access is granted.

A participant may satisfy the access policy but fail the contract policy. That is intentional. Visibility and entitlement are not the same.

For WindData Alliance, a member might see that a steel certificate exists, while only an approved manufacturer can negotiate the full tower-section dossier. An analytics provider may receive summary data but must not onward-share raw evidence.

## Be clear about obligations

Some policy conditions can be checked before access. Membership can be verified. Issuer trust can be checked. A required role credential can be presented.

Other obligations depend on behavior after data is received. No onward sharing, purpose limitation, retention periods, and deletion duties need organizational and application controls. The dataspace can communicate and record those obligations, but it does not automatically guarantee downstream compliance.

Governance teams should be honest about this distinction. Overstating technical enforcement creates false confidence.

## Provider choice within profile rules

The dataspace profile provides common patterns. Providers still control their own assets.

GreenSteel can decide which of its offers are member-only, which require a stronger customer relationship, and which are available as reduced metadata. What the profile should control is the shared vocabulary and the accepted proof behind those choices.

That balance gives providers flexibility without fragmenting the trust model.

## Handoff to applications and operators

Operators need the approved policy patterns and the credential requirements behind them. Application teams need the same patterns in language users can understand, especially when access fails or an obligation needs human approval.

Good failure categories reduce support guesswork. "Missing membership credential", "credential from untrusted issuer", "expired credential", and "obligation not accepted" are more useful than a generic negotiation failure.

By now, you should have a small policy-pattern catalog that connects governance rules to credential requirements and explains how providers should apply them.
