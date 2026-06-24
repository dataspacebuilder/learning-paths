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
| Platform operator | Runs the services that make participants, credentials, policies, and monitoring usable. | A managed platform team operating participant contexts. |
| Application team | Builds software that applies approved policies and reacts to credential state. | A participant application team. |

The [IDSA Rulebook roles chapter](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/005_Roles.md) explains the broader model. This chapter focuses on the handoffs you need for this learning path.

## Dataspace authority

The dataspace authority is the owner of the rules. In IDSA terminology this is often called the Dataspace Governance Authority. In this path, we use **dataspace authority** for readability.

It defines who may join, which agreements or evidence are required, which credential types exist, which issuers are accepted, which policy patterns providers should use, and how renewal, revocation, and offboarding work.

It does not have to operate every service itself. A platform operator can run services on its behalf. An external issuer can issue a credential it accepts. Participants still make local policy decisions for their own assets.

## Credential issuer

A credential issuer makes verifiable statements about participants or assets.

For WindData Alliance, examples are:

| Credential | Possible issuer | Meaning |
|---|---|---|
| `WindDataMembershipCredential` | WindData Alliance or delegated onboarding provider | The holder is an active member. |
| `AccreditedLabCredential` | Independent lab accreditation body | The holder may issue official test evidence. |
| `TurbineManufacturerCredential` | WindData Alliance or industry registry | The holder acts as a recognized turbine manufacturer. |

The issuer is trusted because of the rules and checks behind issuance, not because it runs a special technical service.

## Holder and verifier

A holder stores credentials and presents them when another participant needs proof. A verifier checks whether that proof satisfies the policy.

For governance readers, the important point is the relationship. TowerWorks may hold a membership credential. GreenSteel may verify that credential before allowing negotiation. The trust model should make it clear which credentials are meaningful, which issuers are accepted, and which policies depend on the result.

## Registration service

The registration or onboarding service handles the business workflow before technical activation.

It may collect organization data, gather evidence, present terms, route applications for review, call an issuer after approval, trigger technical provisioning, and show onboarding status to applicants.

Do not confuse this with the platform's Identity Provider. A registration service evaluates membership criteria. An IDP issues API tokens for platform APIs.

## Platform operator

The platform operator turns trust decisions into usable platform behavior.

Typical responsibilities include deploying and operating the platform services, configuring approved profiles, integrating with issuers, protecting keys and secrets, handing over participant information, and monitoring provisioning and credential workflows.

The operator should not silently invent membership rules or credential definitions. Those are governance inputs.

## Application team

Application teams consume the trust model when they build participant-facing software.

A participant application should know which policy patterns are approved for the data products it publishes or consumes, which credential requirements explain access failures, which human approvals are needed before accepting obligations, and where to send users when a credential is missing or expired.

The application team should not create its own alternative membership credential just because a feature needs one. If new proof is needed, feed that requirement back into the trust-design process.

## Responsibility split

| Decision | Primary owner | Used by |
|---|---|---|
| Membership rules | Dataspace authority | Registration service, issuer, platform operator. |
| Credential definition | Dataspace authority and issuer | Issuer, policy templates, applications. |
| Accepted issuer scope | Dataspace authority | Operator configuration, policy evaluation, support. |
| Participant provisioning | Platform operator | Applications and participants. |
| Asset-specific policy choice | Data provider | Application and consumer. |
| Obligation compliance | Consumer organization | Consuming application, audit, legal process. |
| Revocation decision | Issuer or dataspace authority | Verifiers, providers, platform support. |

A healthy dataspace has clear handoffs between these roles. If the handoffs are vague, technical teams will build workarounds that weaken the trust model.
