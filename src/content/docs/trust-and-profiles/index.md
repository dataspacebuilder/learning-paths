---
title: "Design Trust, Credentials, and Dataspace Profiles"
description: "Governance and trust-design path for defining profiles, credentials, onboarding rules, issuers, and policy patterns."
---

In the [offshore wind story](../use-case/), WindData Alliance does more than name a use case. It decides who may join, which evidence is required, which issuers are trusted, which credentials participants need, and which policy patterns providers can rely on. Without those decisions, GreenSteel, TowerWorks, SafeLoad, NorthSea Wind, and GridSight may have running connectors, but they still cannot make consistent trust decisions.

A platform can provision participants. An application can publish and consume data. The trust model explains **who is allowed to do what, based on which verifiable evidence, under which dataspace profile**.

## Who this path is for

This path is primarily for dataspace designers, governance teams, dataspace authorities, and consortium working groups. Credential issuers, platform operators, and application teams can also use it to understand the decisions they are expected to implement.

You should understand the high-level dataspace model. If you are new to dataspaces, start with [A Dataspace Use Case](../use-case/). If you operate the platform, read [Set Up a Dataspace Platform](../platform-setup/). If you build participant software, read [Build a Dataspace Application](../application/).

## What you will design

The path follows the WindData Alliance example and defines a practical dataspace trust model. By the end, you should have a role model, a profile brief, a membership credential design, onboarding and issuance rules, lifecycle rules, policy patterns, and a plan for growing from pilot to scale.

The dataspace trust model is not only documentation. Selected decisions later become platform configuration, issuer processes, policy templates, support messages, and application behavior. This path focuses on the governance meaning before those decisions become implementation work.

## What you will learn

By the end of this path, you will be able to:

- explain why authentication alone is not enough for dataspace trust;
- identify the functional roles in the trust model;
- define what belongs in a dataspace profile;
- design a first membership credential and its accepted issuer;
- define how organizations join the dataspace and receive their first credential;
- design credential lifecycle rules for issuance, presentation, renewal, revocation, and offboarding;
- map governance rules to policy templates and credential requirements;
- decide when additional issuers, credentials, or profiles are needed;
- grow from a pilot trust model to a scalable operating model.

## Chapters

| # | Chapter | What you will learn |
|---|---|---|
| 1 | [Why Trust Matters](./01-why-trust-matters/) | Why identity, credentials, profiles, and governance are central to sovereign data sharing. |
| 2 | [Roles in the Trust Model](./02-roles-in-the-trust-model/) | The functional roles: dataspace authority, participant, issuer, holder, verifier, registration service, operator, and application team. |
| 3 | [Define the Dataspace Profile](./03-dataspace-profiles/) | How governance teams describe the shared rules participants rely on. |
| 4 | [Design the Membership Credential](./04-credential-types-and-schemas/) | How to define the first credential and the trust anchor for membership proof. |
| 5 | [Onboard Members and Issue the First Credential](./05-legal-vs-technical-onboarding/) | How a dataspace verifies membership rules and issues the first credential. |
| 6 | [Manage Credential Lifecycle](./07-credential-lifecycle/) | How to decide when trust starts, changes, and ends. |
| 7 | [Turn Rules into Policy Patterns](./08-policies-and-credentials/) | How governance rules become reusable policy patterns based on trusted credentials. |
| 8 | [From Pilot to Scale](./09-from-pilot-to-scale/) | How to mature the trust model without turning every issuer, profile, or exception into custom work. |

## Reference material

This path explains design decisions and shows how they connect to the other learning paths. It does not replace the formal IDSA Rulebook.

For the formal treatment, use the relevant IDSA Rulebook chapters:

- [IDSA Rulebook — Trust](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/008_Trust.md)
- [IDSA Rulebook — Dataspace Trust Frameworks](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/009_Dataspace_Trust_Frameworks.md)
- [IDSA Rulebook — Policies](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/105_Policies.md)

## What this path does not cover

This path does not provide legal templates, certification criteria, production security controls, or a complete policy-language reference. It gives trust designers a practical structure for decisions that platform and application teams can implement later.
