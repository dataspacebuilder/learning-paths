---
title: "Chapter 6: The Role of the Issuer Service"
description: "How credential issuance can be operated, delegated, or integrated across multiple issuers."
---

Credentials need issuers.

An issuer checks some evidence and creates a signed credential. The credential holder stores it and presents it later. Verifiers check the credential against policies.

The **Issuer Service** is the software component that can automate this issuance workflow. It is not the trust model by itself. It implements part of the trust model.

## What the Issuer Service does

In a typical Eclipse-based setup, an Issuer Service can:

- define credential definitions and schemas;
- register holders;
- receive issuance requests;
- gather or map claim values;
- sign verifiable credentials;
- deliver credentials to Identity Hub;
- maintain credential status information for suspension or revocation;
- support asynchronous issuance workflows.

During WindData onboarding, CFM or an onboarding backend can request a `WindDataMembershipCredential` for TowerWorks. The Issuer Service creates and signs the credential, then delivers it to the participant's identity infrastructure.

For component-specific details, use the [Dataspace Builder Issuer Service concept](https://dataspacebuilder.github.io/website/docs/components/issuer-service) and upstream EDC documentation for your version.

## What the Issuer Service does not decide

The Issuer Service does not decide governance on its own.

It should not invent:

- who may join the dataspace;
- which evidence is sufficient;
- which credential types exist;
- which claims mean what;
- how long membership lasts;
- which external issuers are trusted;
- which policies depend on which credentials.

Those decisions come from the dataspace authority and trust-design work. The Issuer Service is configured to implement them.

## Operating models

There are three common models.

| Model | Description | When useful |
|---|---|---|
| Operator-run issuer | The platform operator runs the Issuer Service on behalf of the dataspace authority. | Managed platforms, pilots, tightly integrated onboarding. |
| Authority-run issuer | The dataspace authority or its operating company runs issuance directly. | The authority wants direct control over membership credentials. |
| External issuer | A third party issues a credential accepted by the profile. | Lab accreditation, legal entity credentials, security certifications. |
| Multiple issuers | Different credential types come from different issuers. | Mature ecosystems where no single organization owns all trust claims. |

A managed platform may start with an operator-run issuer for membership credentials and later integrate external issuers for accreditation or compliance credentials.

## Issuance flow

A simple initial flow looks like this:

```text
approved onboarding record
        │
        ▼
issuer request
        │
        ▼
Issuer Service
  ├─ validates request source
  ├─ maps approved claims
  ├─ signs credential
  ├─ creates status entry
  └─ delivers credential to Identity Hub
        │
        ▼
participant can present credential during dataspace interactions
```

The issuer should be able to explain why a credential was issued. Keep a trace from the credential back to the approval record or attestation source.

## Claim sources

Credential claims need source data.

For WindData Alliance, sources might include:

| Claim | Source |
|---|---|
| `memberOf` | Dataspace profile that approved the application. |
| `membershipStatus` | Membership system or onboarding state. |
| `organizationId` | Approved organization record. |
| `role` | Reviewer decision or accepted external credential. |
| `programId` | Product-program access approval. |
| `accreditationScope` | External lab accreditation credential or registry. |

The issuer should not scrape arbitrary application data. It should read from defined attestation sources that the governance model accepts.

## Issuer integration points

A platform or onboarding system may integrate with the issuer at several points:

| Integration point | Purpose |
|---|---|
| Holder registration | Create or link the participant as a credential holder. |
| Credential definition management | Configure supported credential types and claim mappings. |
| Issuance request | Ask the issuer to create a credential after approval. |
| Delivery to Identity Hub | Store the credential where the participant can present it. |
| Status update | Suspend, revoke, or reactivate issued credentials. |
| Audit query | Explain what was issued and why. |

The exact API depends on the issuer implementation and version. Keep this path at the design level and link to component documentation for API specifics.

## Issuer authority matrix

Define which issuer may issue which credential type.

| Credential type | Accepted issuer(s) | Notes |
|---|---|---|
| `WindDataMembershipCredential` | WindData Alliance membership issuer | Required for active participation. |
| `AccreditedLabCredential` | Recognized lab accreditation issuer | WindData does not self-certify lab independence. |
| `AnalyticsProviderCredential` | WindData Alliance issuer | Based on governance approval for analytics use case. |
| `ProgramAccessCredential` | Program owner or delegated issuer | May be scoped to `NSW-15` or another product program. |
| `SecurityBaselineCredential` | External security certification issuer | Accepted only if profile lists that issuer. |

This matrix later becomes trust-list configuration and policy guidance.

## Runtime dependency

Credential issuance is usually not in the critical path of every data transfer.

Once a credential is issued and stored in Identity Hub, participants can present it during catalog requests or negotiations. Verifiers check the credential, including status where required.

The issuer still matters for:

- new issuance;
- renewal;
- suspension;
- revocation;
- status publication;
- audit and support.

Do not design every negotiation to depend on a live issuer API unless the profile explicitly requires synchronous checks for high-risk data. That increases coupling and can weaken resilience.

## When not to operate your own issuer

A platform operator should not run an issuer just because the component exists.

Use an external issuer when:

- another authority owns the claim;
- the dataspace depends on an existing trust framework;
- regulation or accreditation requires issuer independence;
- participants already hold acceptable credentials;
- operating issuance would create a conflict of interest.

For example, SafeLoad's lab accreditation should likely come from an independent accreditation issuer, not from SafeLoad itself and not necessarily from the platform operator.

## Design checklist

For each issuer model, answer:

1. Who is legally and operationally responsible for issuance?
2. Which credential types may this issuer issue?
3. Which evidence or attestation sources are used?
4. How are holder identities bound to credentials?
5. How are credentials delivered to Identity Hub?
6. How are status, suspension, and revocation represented?
7. How are issuer keys rotated?
8. How are credentials renewed?
9. How are failed issuance requests handled?
10. How do verifiers discover that this issuer is trusted for this profile?

If the answers are unclear, do not hide the uncertainty in code. Put it back into the trust-design backlog.
