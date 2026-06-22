---
title: "Chapter 8: Policies and Credentials"
description: "How governance rules become policy templates that rely on credential claims."
---

Policies are where governance becomes executable.

A policy says what must be true before a participant can see an offer, negotiate a contract, start a transfer, or use data under agreed obligations. Credentials provide the verifiable claims those policies evaluate.

This chapter is not a full ODRL tutorial. It shows how trust designers map rules to policy templates that platform and application teams can use.

For the deeper policy treatment, use the [IDSA Rulebook policy chapter](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/105_Policies.md). Application implementation patterns are covered in [Policy Design for Applications](../application/08-policy-design/).

## The mapping pattern

Use a simple chain:

```text
governance rule
      │
      ▼
credential requirement
      │
      ▼
policy template
      │
      ▼
runtime evaluation during catalog, negotiation, or transfer
```

Example:

| Layer | WindData example |
|---|---|
| Governance rule | Only active WindData members may access basic product evidence. |
| Credential requirement | Holder presents `WindDataMembershipCredential` with `membershipStatus=active`. |
| Policy template | `winddata.member.use.v1` checks accepted credential and status. |
| Runtime behavior | Provider's Control Plane evaluates the presented proof before negotiation succeeds. |

Do this mapping for every common policy pattern. It prevents each provider from inventing a different rule for the same concept.

## Access, contract, and usage policies

Dataspace policies appear at different points.

| Policy type | Question it answers | Example |
|---|---|---|
| Access policy | Can this participant discover or see the offer? | Active members can see that the `GS-87` certificate exists. |
| Contract policy | Can this participant agree to the terms and receive access? | Only approved manufacturers can negotiate the full `TS-42` dossier. |
| Usage policy or obligation | What must happen after access is granted? | Analytics providers may use only summary data and must not onward-share raw evidence. |

A participant may satisfy the access policy but fail the contract policy. That is intentional. Visibility and entitlement are not the same.

## Policy-template catalog

Create a catalog of approved templates.

| Template | Intended use | Credential requirements |
|---|---|---|
| `winddata.member.use.v1` | General member-only documents. | Active `WindDataMembershipCredential`. |
| `winddata.lab-report.publish.v1` | Official weld and fatigue reports. | Active membership and `AccreditedLabCredential`. |
| `winddata.manufacturer.full-dossier.v1` | Full tower-section dossier for manufacturers. | Active membership and `TurbineManufacturerCredential` or program access. |
| `winddata.analytics.summary.v1` | Reduced data for analytics providers. | Active membership and `AnalyticsProviderCredential`. |
| `winddata.program.nsw15.v1` | Program-specific evidence pack. | Active membership and `ProgramAccessCredential(programId=NSW-15)`. |

Templates should have owners, versions, descriptions, and examples. Providers can choose stricter policies for their own assets, but the common templates reduce accidental fragmentation.

## Template sketch

A human-readable template can be enough for design review.

```text
policy template: winddata.program.nsw15.v1
purpose: allow approved NSW-15 program participants to negotiate full evidence packs
applies to: contract policy
required credentials:
  - WindDataMembershipCredential
      memberOf = winddata-alliance
      membershipStatus = active
  - ProgramAccessCredential
      programId = NSW-15
      status = active
allowed action: use
obligations:
  - use only for NSW-15 compliance and product-passport evidence
  - preserve source attribution
not allowed:
  - onward sharing outside approved program participants
```

The platform or application team can translate the approved template into the concrete policy payload for the deployed EDC version. Keep the meaning stable even if syntax changes.

## Credential claims used by policies

Policies depend on claims. Make claim usage explicit.

| Claim | Used in | Notes |
|---|---|---|
| `memberOf` | Member-only access | Should use profile-defined identifier. |
| `membershipStatus` | Access and contract policies | Values must be stable and documented. |
| `role` | Role-based access | Avoid broad roles that hide important distinctions. |
| `programId` | Program-specific policies | Use stable program identifiers. |
| `accreditationScope` | Lab report policies | May come from external issuer. |
| `validUntil` | Lifecycle checks | Should be evaluated with status. |

If a policy needs a claim that no credential provides, do not invent the claim in the policy. Update the credential catalog and issuer configuration first.

## Provider choice and profile rules

The dataspace profile can provide common templates. Providers still control their own assets.

GreenSteel can decide that:

- catalog visibility for `GS-87` is member-only;
- negotiation for detailed carbon data requires an approved customer relationship;
- a reduced metadata offer is available to analytics providers.

The profile should say which policy vocabulary and credential claims are valid. It should not force every provider to expose all assets under the same rule.

## Consumer-side policy checks

Consumers should also evaluate policies before accepting an offer.

TowerWorks Evidence Bridge should check:

- whether the policy template is recognized;
- whether the action matches the intended use;
- whether obligations can be met;
- whether the provider identity is expected;
- whether the data can be routed to the intended backend;
- whether human approval is needed.

A policy that the provider is willing to offer may still be unacceptable to the consumer.

## Obligations and enforcement

Be honest about obligations.

Some conditions can be technically evaluated before access:

- membership credential is valid;
- issuer is trusted;
- required role credential is present;
- transfer type is supported.

Other obligations require organizational or application controls after data is received:

- no onward sharing;
- retention period;
- purpose limitation;
- audit log retention;
- deletion on request;
- use only for a specific program.

The dataspace can communicate and record obligations. It does not automatically guarantee downstream compliance. Choose enforcement based on data sensitivity, legal risk, and operational cost.

## Policy failures

Design failure categories before production use.

| Failure | Likely cause | Who acts |
|---|---|---|
| Offer not visible | Access policy not satisfied or provider has no matching asset. | Consumer support or provider support. |
| Negotiation rejected | Contract policy not satisfied. | Consumer, issuer, or trust owner. |
| Credential not recognized | Wrong issuer, missing trust-list entry, unsupported schema. | Trust owner and operator. |
| Obligation not accepted | Consumer cannot comply or needs approval. | Consumer business owner. |
| Policy vocabulary unknown | Provider or application used a non-profile term. | Trust and application teams. |

Good error categories reduce support guesswork and help improve the profile.

## Design checklist

For each policy template, document:

1. business purpose;
2. policy type: access, contract, usage, or combined;
3. applicable asset classes;
4. required credentials;
5. exact claim names and values;
6. accepted issuers;
7. obligations and enforcement expectations;
8. whether human approval is required;
9. version and migration rule;
10. example provider and consumer behavior.

A policy template is successful when providers can apply it consistently and consumers can understand why access succeeds or fails.
