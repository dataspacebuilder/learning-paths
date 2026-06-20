---
title: "Chapter 2: Roles in the Trust Model"
description: "The functional roles involved in defining, issuing, holding, verifying, operating, and using trust information."
---

A dataspace keeps the technical role model simple: every organization that participates in protocol interactions is a **participant**.

The trust model adds functional roles around that participant. These roles explain who defines rules, who issues credentials, who holds them, who verifies them, and who operates the infrastructure that makes the process usable.

One organization can fill more than one role. Keep the roles separate anyway. It prevents architectural confusion.

## The functional roles

| Role | What it decides or does | WindData example |
|---|---|---|
| Dataspace authority | Defines participation rules, trust framework choices, profile requirements, policy vocabulary, and onboarding criteria. | WindData Alliance working group. |
| Participant | Acts in the dataspace as provider, consumer, or both. | GreenSteel, TowerWorks, SafeLoad, NorthSea Wind, GridSight. |
| Holder | Holds credentials about itself and presents them when needed. | TowerWorks holds a membership credential. |
| Verifier | Evaluates presented credentials against policy. | GreenSteel verifies TowerWorks before negotiating access. |
| Credential issuer | Issues verifiable credentials after checking evidence. | WindData issuer for membership; accreditation body for lab status. |
| Registration or onboarding service | Collects applications, evidence, approvals, and onboarding state. | WindData onboarding portal or delegated onboarding provider. |
| Platform operator | Runs Control Plane, Identity Hub, CFM, data-plane capability, issuer integrations, and observability. | A managed platform team operating participant contexts. |
| Application team | Builds software that applies approved policies and reacts to credential state. | TowerWorks Evidence Bridge team. |

The [IDSA Rulebook roles chapter](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/005_Roles.md) and [Dataspace Builder roles concept](https://dataspacebuilder.github.io/website/docs/concepts/roles-and-participation) explain the broader model. This chapter focuses on the handoffs you need for the learning paths.

## Dataspace authority

The dataspace authority is the owner of the rules. In IDSA terminology this is often called the Dataspace Governance Authority. In this path, we use **dataspace authority** for readability.

It defines:

- who may join;
- which agreements or evidence are required;
- which credential types exist;
- which issuers are accepted;
- which policies and vocabularies providers should use;
- which protocol versions and identity mechanisms are part of the profile;
- how suspension, revocation, renewal, and offboarding work.

It does not have to operate every service itself. A platform operator can run services on its behalf. An external issuer can issue a credential it accepts. Participants still make local policy decisions for their own assets.

## Credential issuer

A credential issuer makes verifiable statements about participants or assets.

For WindData Alliance, examples are:

| Credential | Possible issuer | Meaning |
|---|---|---|
| `WindDataMembershipCredential` | WindData Alliance or delegated onboarding provider | The holder is an active member. |
| `AccreditedLabCredential` | Independent lab accreditation body | The holder may issue official test evidence. |
| `TurbineManufacturerCredential` | WindData Alliance or industry registry | The holder acts as a recognized turbine manufacturer. |
| `CarbonReportingCredential` | Sustainability reporting authority | The holder meets a reporting or audit requirement. |

The issuer is trusted because of the rules and checks behind issuance, not because it runs a special runtime service.

## Holder and verifier

A holder stores credentials and presents them when another participant needs proof.

A verifier checks:

- the credential type;
- the holder binding;
- the issuer signature;
- the issuer's trust status;
- validity period;
- revocation or suspension status;
- relevant claims;
- whether the claims satisfy the policy.

In the runtime architecture, Identity Hub or equivalent credential services help holders assemble presentations and help verifiers check them. Application teams usually do not implement the credential protocol directly, but they need to understand the resulting business state.

## Registration service

The registration or onboarding service handles the business workflow before technical activation.

It may:

- collect organization data;
- collect evidence documents;
- present terms and agreements;
- route applications for review;
- call an issuer after approval;
- trigger technical provisioning after approval;
- show onboarding status to applicants.

Do not confuse this with the platform's Identity Provider. A registration service evaluates membership criteria. An IDP issues API tokens for platform APIs.

## Platform operator

The platform operator turns trust decisions into usable runtime configuration.

Typical responsibilities include:

- deploying Control Plane and Identity Hub;
- configuring CFM cells and dataspace profiles;
- integrating with one or more issuers;
- storing secrets and keys securely;
- exposing the correct participant endpoints;
- handing over profile names, DIDs, credentials, and API access;
- monitoring credential issuance and provisioning workflows.

The operator should not silently invent membership rules or credential schemas. Those are governance inputs.

## Application team

Application teams consume the trust model.

TowerWorks Evidence Bridge should know:

- which policy templates are approved for tower-section dossiers;
- which credential requirements explain catalog or negotiation failures;
- which human approvals are needed before accepting obligations;
- which credential status changes should block publication or transfer;
- where to send users when a credential is missing or expired.

The application team should not create its own alternative membership credential just because a feature needs one. If a new claim is needed, feed that requirement back into the trust-design process.

## Responsibility split

| Decision | Primary owner | Used by |
|---|---|---|
| Membership rules | Dataspace authority | Registration service, issuer, platform operator. |
| Credential schema | Dataspace authority and issuer | Issuer Service, Identity Hub, policy templates, applications. |
| Trust anchor list | Dataspace authority | Control Plane, Identity Hub, operator configuration. |
| Participant provisioning | Platform operator | Applications and participants. |
| Asset-specific policy choice | Data provider | Application, Control Plane, consumer. |
| Obligation compliance | Consumer organization | Consuming application, audit, legal process. |
| Revocation decision | Issuer or dataspace authority | Verifiers, providers, platform support. |

A healthy dataspace has clear handoffs between these roles. If the handoffs are vague, technical teams will build workarounds that weaken the trust model.
