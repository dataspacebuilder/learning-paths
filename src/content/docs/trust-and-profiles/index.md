---
title: "Design Trust, Credentials, and Dataspace Profiles"
description: "Governance and trust-design path for defining profiles, credentials, onboarding rules, issuers, and policy patterns."
---

This learning path is for the people who define what it means to be trusted in a dataspace.

 In the [offshore wind story](../use-case/), WindData Alliance does more than name a use case. It decides who may join, which evidence is required, which issuers are trusted, which credentials participants need, and which policy patterns providers can rely on. Without those decisions, GreenSteel, TowerWorks, SafeLoad, NorthSea Wind, and GridSight may have running connectors, but they still cannot make consistent trust decisions.

A platform can provision contexts. An application can publish and consume data. The trust model explains **who is allowed to do what, based on which verifiable evidence, under which dataspace profile**.

## Who this path is for

This path is for:

- dataspace designers and governance teams;
- dataspace authorities and consortium working groups;
- credential issuers and trust-framework owners;
- architects defining onboarding and participation rules;
- platform operators configuring dataspace profiles, issuers, and trust anchors;
- application teams that need to understand why a policy or credential requirement exists.

You should understand the high-level dataspace model. If you are new to dataspaces, start with [A Dataspace Use Case](../use-case/). If you operate the runtime platform, read [Set Up a Dataspace Platform](../platform-setup/). If you build participant software, read [Build a Dataspace Application](../application/).

## What you will design

The path follows the WindData Alliance example and builds a practical trust-design package:

```text
WindData Alliance trust-design package
  ├─ roles and responsibility model
  ├─ dataspace profile
  ├─ credential catalog and schema decisions
  ├─ onboarding workflow
  ├─ issuer and trust-list model
  ├─ credential lifecycle rules
  ├─ policy templates
  └─ scale and versioning plan
```

The package is not only documentation. Selected decisions become configuration in platform components, issuer services, identity services, policy templates, and application behavior.

## What you will learn

By the end of this path, you will be able to:

- explain why authentication alone is not enough for dataspace trust;
- identify the functional roles in the trust model;
- define what belongs in a dataspace profile;
- choose credential types for membership, roles, compliance, certifications, and domain-specific claims;
- separate legal onboarding from technical onboarding;
- decide whether to operate an Issuer Service, integrate with an external issuer, or support multiple issuers;
- design credential lifecycle rules for issuance, presentation, renewal, suspension, revocation, and offboarding;
- map governance rules to policy templates and credential requirements;
- maintain trusted issuer lists and trust anchors;
- support participants that join multiple dataspaces or profiles;
- grow from a pilot trust model to a scalable operating model.

## Chapters

| # | Chapter | What you will learn |
|---|---|---|
| 1 | [Why Trust Matters](./01-why-trust-matters/) | Why identity, credentials, profiles, and governance are central to sovereign data sharing. |
| 2 | [Roles in the Trust Model](./02-roles-in-the-trust-model/) | The functional roles: dataspace authority, participant, issuer, holder, verifier, registration service, operator, and application team. |
| 3 | [Dataspace Profiles](./03-dataspace-profiles/) | How a profile turns governance choices into platform, protocol, credential, and policy configuration. |
| 4 | [Credential Types and Schemas](./04-credential-types-and-schemas/) | How to define credential families, claims, validity, status, and versioning without over-collecting data. |
| 5 | [Legal vs. Technical Onboarding](./05-legal-vs-technical-onboarding/) | How approval, evidence, provisioning, DID setup, and credential issuance fit together. |
| 6 | [The Role of the Issuer Service](./06-issuer-service/) | How credential issuance can be operated, delegated, or integrated across multiple issuers. |
| 7 | [Credential Lifecycle](./07-credential-lifecycle/) | How credentials are issued, stored, presented, renewed, suspended, revoked, and retired. |
| 8 | [Policies and Credentials](./08-policies-and-credentials/) | How governance rules become policy templates that rely on credential claims. |
| 9 | [Multiple Issuers and Trust Lists](./09-multiple-issuers-and-trust-lists/) | How to decide which issuers are trusted for which credential types and how to handle change. |
| 10 | [Multi-Dataspace Configuration](./10-multi-dataspace-configuration/) | How one organization can participate in multiple dataspaces with separate profiles, credentials, and protocol contexts. |
| 11 | [From Pilot to Scale](./11-from-pilot-to-scale/) | How to mature the trust model without turning every rule into custom code. |

## Reference material

This path explains design decisions and shows how they connect to the other learning paths. It does not replace the formal IDSA Rulebook.

For the formal treatment, use the relevant IDSA Rulebook chapters:

- [IDSA Rulebook — Trust](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/008_Trust.md)
- [IDSA Rulebook — Dataspace Trust Frameworks](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/009_Dataspace_Trust_Frameworks.md)
- [IDSA Rulebook — Policies](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/105_Policies.md)

## What this path does not cover

This path does not provide legal templates, certification criteria, production security controls, or a complete ODRL reference. It gives trust designers a practical structure and shows how trust decisions become platform and application inputs.
