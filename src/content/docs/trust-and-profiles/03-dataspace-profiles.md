---
title: "Chapter 3: Define the Dataspace Profile"
description: "How governance teams define the shared baseline rules for a dataspace."
---

A dataspace profile is the named rule set for one dataspace community. It gives participants a shared answer to a basic question:

> Who belongs to this dataspace, and what proof shows that they belong?

A first profile should be simple. It does not need to describe every future role, approval, and exception. It should define the baseline that every participant and provider can rely on.

A platform can later turn parts of the profile into configuration. In governance terms, the profile comes first. It gives the same meaning to the authority, participants, issuers, operators, and application teams before anyone configures a connector or deploys a participant.

For WindData Alliance, the first profile should answer:

> What must be true before approved organizations can exchange offshore wind product-passport evidence as members of the same dataspace?

## The Membership Baseline

The first useful WindData Alliance profile is a membership profile.

It names the dataspace, explains the purpose, defines who may participate, and describes the proof of membership. It also says who may issue that proof, when an approved organization becomes active, and what happens when membership proof is no longer valid.

That is enough to make the first trust decision consistent. GreenSteel, TowerWorks, SafeLoad, NorthSea Wind, and GridSight can all understand what it means to be an active WindData member. Providers can then use a simple member-only policy pattern without keeping their own private membership lists.

More specific proof can be added as the dataspace matures. Lab accreditation, manufacturer approval, analytics approval, and program-specific access are useful later, but the first profile is clearer if it establishes membership first.

## Profile Brief

A profile brief is a short design artifact that a governance group can review before the platform team translates it into settings.

> **Profile:** WindData Alliance member profile
>
> **ID:** `winddata-alliance:v1`
>
> **Purpose:** let approved members exchange offshore wind product-passport evidence under one shared membership rule.
>
> **Participant scope:** organizations approved by WindData Alliance.
>
> **Membership proof:** active `WindDataMembershipCredential`.
>
> **Issuer:** WindData Alliance membership issuer.
>
> **Onboarding rule:** business approval happens before technical activation.
>
> **Policy pattern:** member-only access.
>
> **Lifecycle rule:** expired or revoked membership credentials must not satisfy future access decisions.
>
> **Provider boundary:** providers choose which offers use the member-only pattern.
>
> **Implementation references:** CFM [Tenant Manager profile model](https://github.com/eclipse-cfm/cfm/blob/main/tmanager/model/v1alpha1/model.go), CFM [system architecture](https://github.com/eclipse-cfm/cfm/blob/main/docs/developer/architecture/system.architecture.md), and EDC [Dataspace Profile Context](https://github.com/eclipse-edc/Connector/tree/main/docs/developer/decision-records/2025-05-28-dataspace-profile-context).

This brief is not a configuration file. It helps the trust team agree on meaning before operators translate the decisions into platform-specific settings.

## Shared Rules and Provider Choices

The profile should contain the rules that need to mean the same thing across the dataspace. Membership is one of those rules. If one provider treats a WindData member differently from another provider, participants will not know what membership actually means.

Provider choices still matter. GreenSteel can decide which of its own offers are member-only. SafeLoad can decide which evidence it publishes. The profile gives those providers a shared membership rule to rely on; it does not force every provider to expose every asset under the same conditions.

## Version the profile

Profiles change as the dataspace matures. WindData Alliance might begin with member-only access and later add lab accreditation, manufacturer roles, analytics approval, or program-specific access.

Use clear profile versions or compatibility statements. A version does not need to expose every technical detail, but it should tell participants what has changed, who is affected, whether old membership credentials remain accepted, and when migration is required.

For example, `winddata-alliance:v2` might add program access credentials while still accepting existing membership credentials from `v1`. That kind of statement gives operators and participants enough time to prepare.

## Handoff to implementation teams

The platform team needs the profile ID, the participant scope, the membership credential specification, the membership issuer, the member-only policy pattern, onboarding state, lifecycle rule, and versioning rule.

Application teams need the same meaning in user-facing language. A failed access attempt should be explainable as a missing, expired, revoked, or not-yet-issued membership credential.

By now, you should have a first dataspace profile that a governance group can approve and that an operator can translate without inventing missing membership rules.
