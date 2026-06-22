---
title: "Chapter 9: Multiple Issuers and Trust Lists"
description: "How to decide which issuers are trusted for which credential types and how to handle change."
---

Most serious dataspaces do not have one issuer for every claim.

WindData Alliance may issue membership credentials. A lab accreditation body may issue accreditation credentials. A security certification authority may issue security credentials. A product-program owner may issue program access credentials.

The trust model needs to say which issuers are trusted for which credential types and under which profile.

## Trust anchor, issuer, and trust list

Use the terms carefully.

| Term | Meaning |
|---|---|
| Issuer | The entity that signs a credential. |
| Trust anchor | An issuer or authority whose credentials are accepted as evidence for a purpose. |
| Trust list | The profile-specific list of accepted issuers and what each is trusted to issue. |
| Trust framework | The broader rules that define acceptable evidence, issuer processes, and policy reconciliation. |

A trusted issuer is not trusted for everything. It is trusted for a defined credential type or evidence category.

## Issuer scope matrix

Create a matrix like this:

| Issuer | Trusted for | Not trusted for | Notes |
|---|---|---|---|
| WindData membership issuer | `WindDataMembershipCredential`, `AnalyticsProviderCredential` | Lab accreditation | Operated for the dataspace authority. |
| NorthSea program office | `ProgramAccessCredential(programId=NSW-15)` | General membership | May issue only program-scoped access. |
| Independent lab accreditation body | `AccreditedLabCredential` | Product-program access | External issuer accepted by the profile. |
| Security certification issuer | `SecurityBaselineCredential` | Membership | May be accepted only for high-sensitivity offers. |

This matrix prevents broad trust by accident.

## Trust-list entries

A useful trust-list entry includes more than an issuer name.

```text
issuer: did:web:issuer.winddata.example
trusted for:
  - WindDataMembershipCredential v1
  - AnalyticsProviderCredential v1
profile: winddata-alliance:v1
status: active
valid from: 2026-01-01
key material: resolved from DID document
status endpoint or status list: profile-defined
contact and support owner: WindData trust operations
change policy: 30-day notice for non-emergency removal
```

Use the concrete format required by your verifier and platform components. Keep the design information explicit regardless of format.

## Adding an issuer

Do not add an issuer only because an integration works.

Before adding one, confirm:

1. Which credential types will it issue?
2. Which evidence process does it follow?
3. Who audits or governs the issuer?
4. How are issuer keys managed and rotated?
5. How are credentials suspended or revoked?
6. How do verifiers check status?
7. How are incidents reported?
8. Which profiles accept this issuer?
9. Does acceptance apply to sandbox, pilot, or production?
10. How will participants learn about the new issuer?

For example, accepting a lab accreditation issuer affects SafeLoad's ability to publish official reports and NorthSea Wind's confidence in those reports. It is not just a connector setting.

## Removing or suspending an issuer

Issuer trust can change.

Reasons include:

- issuer key compromise;
- process failure;
- governance dispute;
- expired delegation agreement;
- replaced credential schema;
- regulatory issue;
- issuer no longer supports required status mechanisms.

Define the consequences:

| Action | Effect |
|---|---|
| Suspend issuer | New credentials from issuer are not accepted; existing credentials may be treated according to risk rule. |
| Remove issuer | Credentials from issuer no longer satisfy policies for the profile. |
| Restrict issuer scope | Issuer remains trusted for one credential type but not another. |
| Require reissuance | Holders must obtain replacement credentials from an accepted issuer. |
| Emergency block | High-risk incident; future negotiations fail until trust is restored. |

Emergency removal can break active business flows. That is sometimes necessary. Plan the communication path before it happens.

## Multiple credentials from multiple issuers

A policy can require credentials from more than one issuer.

Example:

```text
Full TS-42 dossier access requires:
  - active WindDataMembershipCredential from WindData issuer
  - ProgramAccessCredential(programId=NSW-15) from NorthSea program office
  - if requesting lab details, AccreditedLabCredential from accepted accreditation issuer
```

This lets the dataspace compose trust without making one organization responsible for every claim.

## External trust frameworks

A dataspace can accept credentials from external trust frameworks.

This is useful when:

- the external framework already verifies a claim well;
- participants already hold those credentials;
- the dataspace wants to reduce duplicate onboarding;
- legal or industry standards require independent certification.

The dataspace profile should say exactly what is accepted. Do not write "accepts external trust framework credentials" without naming credential types, issuers, versions, and claim mappings.

The [IDSA Rulebook chapter on Dataspace Trust Frameworks](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/009_Dataspace_Trust_Frameworks.md) provides the broader foundation.

## Key rotation

Issuer keys change. The trust list should support that.

Design for:

- planned key rotation;
- emergency key replacement;
- DID document updates;
- credential signatures produced by older keys;
- overlap periods;
- verifier cache invalidation;
- audit evidence for key changes.

If a verifier caches issuer metadata, define how long it may cache and how revocation or key-change signals are propagated.

## Trust-list distribution

Participants and platform services need current trust-list information.

Common patterns:

| Pattern | Description |
|---|---|
| Profile configuration | Platform operator configures accepted issuers in the runtime services. |
| Published governance document | Dataspace authority publishes a signed or controlled list. |
| DID-based resolution | Issuer identity and keys are resolved from DID documents. |
| Versioned trust bundle | Profile version contains issuer list, credential schemas, and policy vocabulary. |
| Managed service update | Platform operator updates verifier configuration after governance approval. |

Choose a pattern that matches the operating model. A self-hosted participant still needs access to the same trust-list decisions as a managed participant.

## Failure modes

Design for these cases:

| Failure | Response |
|---|---|
| Credential from unknown issuer | Reject or request known credential. |
| Issuer trusted for different credential type | Reject for this policy. |
| Issuer key cannot be resolved | Fail safely or retry according to profile. |
| Status endpoint unavailable | Use profile-specific fallback based on risk class. |
| Conflicting credentials | Apply profile-defined precedence or require human review. |
| Trust-list version mismatch | Surface compatibility error, not generic negotiation failure. |

The conservative default is to reject if required trust evidence cannot be verified. If the profile allows fallback behavior, document it clearly.

## Design checklist

For each trusted issuer, define:

1. issuer identifier;
2. credential types and schema versions accepted;
3. profiles that accept the issuer;
4. evidence or governance process behind issuance;
5. key and DID resolution method;
6. status and revocation mechanism;
7. support contact;
8. onboarding and reissuance process for holders;
9. suspension and removal rules;
10. communication process for changes.

Trust lists are living configuration. Treat them like critical governance data, not a static appendix.
