---
title: "Chapter 4: Credential Types and Schemas"
description: "How to define credential families, claims, validity, status, and versioning without over-collecting data."
---

Credentials are the evidence that policy decisions use.

A credential should say one clear thing about a participant, role, capability, compliance state, relationship, or asset. It should be issued by an appropriate issuer, have a defined validity period, and contain only the claims needed for the dataspace purpose.

The goal is not to create a huge identity dossier. The goal is to provide reliable, minimal, verifiable claims.

## Start with the credential catalog

Before writing schemas, create a catalog of credential types.

For WindData Alliance, an initial catalog could be:

| Credential type | Purpose | Typical holder | Possible issuer |
|---|---|---|---|
| `WindDataMembershipCredential` | Proves active membership in the dataspace. | Every active participant. | WindData Alliance issuer. |
| `SupplierRoleCredential` | Proves the holder acts as an upstream supplier. | GreenSteel and similar providers. | WindData Alliance or accepted industry registry. |
| `TowerFabricatorCredential` | Proves the holder fabricates tower sections. | TowerWorks. | WindData Alliance or industry authority. |
| `AccreditedLabCredential` | Proves the holder is allowed to publish official test evidence. | SafeLoad Labs. | External accreditation issuer. |
| `TurbineManufacturerCredential` | Proves the holder is an approved turbine manufacturer. | NorthSea Wind. | WindData Alliance or manufacturer registry. |
| `AnalyticsProviderCredential` | Proves the holder may receive analytics-oriented summaries. | GridSight. | WindData Alliance. |
| `ProgramAccessCredential` | Proves access to a specific product, project, or program. | Selected suppliers and manufacturers. | Program owner or delegated issuer. |

Do not create all possible credentials on day one. Create the credentials needed for the first sharing policies, then add more as real access rules require them.

## Credential families

Most dataspaces need several families of credentials.

### Membership credentials

Membership credentials answer:

> Is this participant an active member of the dataspace?

They are usually the first credential issued after onboarding. Many access policies depend on them.

Common claims:

- holder identifier;
- dataspace membership identifier;
- membership status;
- membership level, if levels exist;
- valid-from and valid-until dates;
- issuer identifier;
- status or revocation reference.

### Role credentials

Role credentials answer:

> What role is this participant allowed to play in this dataspace?

Examples include supplier, manufacturer, accredited lab, service partner, analytics provider, auditor, or maintenance provider.

Role credentials should not be vague. A generic `trustedPartner=true` claim is hard to evaluate later. Prefer claims that match policy and business meaning.

### Compliance and certification credentials

Compliance credentials answer:

> Does this participant meet a specific external or internal requirement?

Examples include security certifications, jurisdictional attestations, sustainability reporting capability, or lab accreditation.

These often come from external issuers. The dataspace authority decides whether to accept them and for which policies.

### Domain-specific credentials

Domain credentials answer:

> Does this participant have access to a specific product line, project, asset class, or evidence flow?

For WindData Alliance:

- a `ProgramAccessCredential` could permit access to `NSW-15` product-passport evidence;
- a `TowerSectionEvidencePublisherCredential` could permit publishing tower-section dossiers;
- a `CarbonIntensityDataConsumerCredential` could permit analytics providers to consume summary carbon data.

Use these when ordinary membership is too broad.

### Technical capability credentials

Some dataspaces may use credentials to express technical capabilities:

- conformance test passed;
- supported protocol profile;
- security baseline met;
- data-plane capability certified.

Use them carefully. Some technical capabilities are better represented by runtime registration, health checks, or conformance evidence than by long-lived credentials.

## Schema design principles

A schema defines the structure of a credential type. Good schemas are boring in the best way: stable, clear, minimal, and easy to evaluate.

| Principle | Why it matters |
|---|---|
| Use stable names | Policy templates depend on consistent claim names. |
| Minimize claims | Do not expose data that policies do not need. |
| Define value formats | Avoid one issuer using `active` while another uses `ACTIVE_MEMBER`. |
| Include validity | Credentials should not imply permanent trust. |
| Include status support | Suspension and revocation need a technical hook. |
| Bind to the holder | A credential must be presented by the participant it was issued to. |
| Version schemas | Changes should not break existing policies without a migration plan. |
| Document issuer authority | A credential type is only meaningful if the issuer is trusted for that type. |

The [IDSA Rulebook chapter on attributes and claims](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/104_Attributes_and_claims.md) is the deeper reference for claims. The [Decentralized Identity concept](https://dataspacebuilder.github.io/website/docs/concepts/decentralized-identity) explains DIDs and verifiable credentials at a conceptual level.

## Example schema sketch

A first membership credential can be simple.

```text
credential type: WindDataMembershipCredential
version: 1
issuer: WindData Alliance membership issuer
holder: participant DID
claims:
  memberOf: winddata-alliance
  membershipStatus: active | suspended
  membershipClass: standard | operator | observer
  organizationId: governance-approved organization identifier
  validFrom: date-time
  validUntil: date-time
status:
  revocation or suspension status reference
privacy:
  do not include onboarding documents or commercial details
```

This sketch is not a required JSON-LD format. It is a design artifact. The issuer and platform team then translate it into the concrete schema and credential definition supported by the selected issuer technology.

## Claim vocabulary

Credential schemas and policy templates share a vocabulary. If the policy says `memberOf = winddata-alliance`, the credential must expose a compatible claim.

Create a small vocabulary table:

| Claim | Meaning | Allowed values | Used by |
|---|---|---|---|
| `memberOf` | Dataspace or community the credential relates to. | `winddata-alliance` | Member-only policies. |
| `membershipStatus` | Current membership state. | `active`, `suspended` | Access and contract policies. |
| `role` | Role recognized by the profile. | `supplier`, `fabricator`, `lab`, `manufacturer`, `analytics-provider` | Role-based policies. |
| `programId` | Product program or project. | Profile-defined identifiers such as `NSW-15` | Project-specific access. |
| `accreditationScope` | Scope of an accreditation. | Profile-defined lab scopes | Evidence-publication policies. |

Keep this vocabulary in the profile documentation. Application teams need it for user messages and policy selection. Platform teams need it for policy templates. Issuers need it for credential definitions.

## Avoid overloaded credentials

Do not put every possible claim into one membership credential.

A large credential creates problems:

- it reveals more than a policy needs;
- it becomes hard to renew or revoke only one attribute;
- every schema change becomes risky;
- different issuers cannot easily own different claims;
- policies become unclear.

Prefer several targeted credentials:

```text
WindDataMembershipCredential
AccreditedLabCredential
ProgramAccessCredential
AnalyticsProviderCredential
```

A provider policy can require one or more of them. That keeps the model composable.

## Versioning and migration

Schemas change as the dataspace matures.

For each credential type, define:

- current version;
- accepted previous versions;
- migration deadline;
- claim compatibility rules;
- issuer migration responsibility;
- policy-template compatibility.

Example:

| Credential | Accepted versions | Migration rule |
|---|---|---|
| `WindDataMembershipCredential` | v1, v2 | v1 accepted until the end of the pilot; v2 required for production profile. |
| `AccreditedLabCredential` | v1 | v2 draft adds `accreditationScope`; policies must not require it until v2 is issued. |
| `ProgramAccessCredential` | v1 | Issued per program; revoked at program end. |

Never change the meaning of a claim silently. If `role=lab` used to mean general lab status and later means accredited lab status, create a new claim or credential version.

## Design checklist

For each credential type, document:

1. What business question does this credential answer?
2. Who is allowed to issue it?
3. Who can hold it?
4. Which claims does it contain?
5. Which claims are mandatory?
6. Which policies rely on it?
7. How long is it valid?
8. How can it be suspended or revoked?
9. How is renewal requested?
10. Which previous versions remain accepted?

If you cannot name a policy or onboarding decision that needs a claim, do not include the claim yet.
