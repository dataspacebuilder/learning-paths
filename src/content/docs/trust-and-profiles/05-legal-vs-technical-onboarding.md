---
title: "Chapter 5: Onboard Members and Issue the First Credential"
description: "How a dataspace verifies membership rules and issues the first credential."
---

Onboarding is the process by which an organization joins the dataspace and receives the first credential it needs to participate.

This chapter follows the dataspace side of onboarding: the applicant reviews the rules, provides evidence, receives a membership decision, and gets a membership credential. The governance question is:

> Has this organization satisfied the membership rules, and should it receive a membership credential?

The [IDSA Rulebook onboarding pattern](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/140_Decentralized_Patterns_Onboarding.md) describes onboarding as the step where a future participant understands the rules of the dataspace, provides evidence that it satisfies those rules, and receives the credentials it can later present to other participants.

## Joining the Dataspace

Joining a dataspace should be a voluntary decision by the participant. The applicant decides to join WindData Alliance, reviews the participation rules, and submits the evidence required by the `winddata-alliance:v1` profile.

For the first WindData profile, the evidence should stay focused on membership. TowerWorks may need to provide organization information, accept the participation terms, and show that it belongs in the offshore wind evidence exchange. The onboarding process does not need to solve every future role or program approval.

The output of this review is a membership decision. If the applicant satisfies the rules, the dataspace can issue or request the first membership credential.

## The Onboarding Entity

Many dataspaces use an onboarding entity to manage this process. That entity may be run by the dataspace authority, a delegated onboarding provider, or another organization acting under the authority's rules.

The onboarding entity checks the applicant against the membership rules. It may collect evidence, route a review, record approval, and notify the issuer that a membership credential should be created.

This entity should not become a permanent gatekeeper for every dataspace interaction. In a decentralized dataspace, participants should not need an ongoing central service just to evaluate every future contract. The onboarding service is mainly the joining point.

## Issuing the Membership Credential

Once membership is approved, a credential issuer creates the membership credential. For the first WindData profile, that credential is `WindDataMembershipCredential`.

The issuer does not decide who may join on its own. It issues the credential based on the approved onboarding record. The governance team should therefore define the evidence source behind issuance: which approval record, which profile, which participant, which validity period, and which status rules apply.

In a simple pilot, the onboarding entity and the membership issuer may be operated by the same organization. That is acceptable if the responsibility is clear: onboarding checks the membership rules; issuance creates verifiable proof of the approved decision.

## Onboarding models

There is more than one valid onboarding model. A small pilot may use one onboarding workflow operated by the dataspace authority. A larger ecosystem may delegate review to approved onboarding providers. In some decentralized models, a participant may prove eligibility directly to another participant according to the dataspace rules.

The choice is a governance decision. The important point is that the membership rule, evidence requirement, issuer responsibility, and credential result are clear.

## Do not automate judgment too early

Automation is useful once criteria are stable. Before that, it can make weak governance look precise.

For a pilot, it is often better to keep membership approval manual while automating only the issuance step that follows approval. As confidence grows, evidence collection, validation, and credential issuance can become more automated.

By now, you should have defined how an organization joins the dataspace, which evidence is required for membership, who approves membership, who issues the membership credential, and which states explain where an applicant is in the process.
