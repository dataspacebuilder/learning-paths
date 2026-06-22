---
title: "Chapter 5: Legal vs. Technical Onboarding"
description: "How approval, evidence, provisioning, DID setup, and credential issuance fit together."
---

Onboarding turns an outside organization into an active dataspace participant.

It has two different phases:

1. **Legal or business onboarding** decides whether the organization is allowed to join.
2. **Technical onboarding** creates the participant context, identity material, credentials, endpoints, and platform access.

Keep these phases separate even if one portal automates both.

## The two phases

| Phase | Main question | Output |
|---|---|---|
| Legal onboarding | Does this organization meet the dataspace participation rules? | Approved applicant, organization record, accepted agreements, evidence trail. |
| Technical onboarding | Can this approved applicant act as a participant in the runtime environment? | Participant context, DID, credentials, API access, DSP endpoint, handoff package. |

WindData Alliance may approve TowerWorks after checking its company registration, supply-chain role, signed participation agreement, and product-program relationship. The platform then provisions TowerWorks as a participant and requests the initial membership credential.

The platform should not provision a production participant just because a form was submitted. The approval state must be clear.

## Legal onboarding

Legal onboarding is the governance workflow.

It may include:

- applicant registration;
- organization identity checks;
- commercial register or legal entity evidence;
- accepted terms and participation agreements;
- proof of certifications or accreditations;
- data protection or security questionnaires;
- human review;
- approval, rejection, or request for more evidence.

For WindData Alliance, SafeLoad Labs may need extra evidence before it can receive an `AccreditedLabCredential`. GridSight may need an analytics-provider approval before it can access summary data. NorthSea Wind may need product-program approval for the `NSW-15` evidence pack.

The [IDSA Rulebook onboarding pattern](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/140_Decentralized_Patterns_Onboarding.md) describes broader onboarding patterns. This chapter focuses on what the trust-design team must hand to operators.

## Technical onboarding

Technical onboarding starts after approval.

A typical managed-platform flow is:

1. create a tenant record for the organization;
2. create a participant profile linked to the correct dataspace profile;
3. create or register the participant DID;
4. create participant-scoped API clients;
5. create Control Plane and Identity Hub contexts;
6. register the holder with the issuer, if needed;
7. request initial credentials;
8. deliver credentials to the participant's Identity Hub;
9. validate DSP, Management API, and Identity Hub endpoints;
10. hand over endpoints, identifiers, and credentials to the participant or application team.

This is the platform workflow described in [Provision Participants](../platform-setup/10-provisioning-participants/). The trust team defines the rules that workflow follows.

## The handoff between phases

The most important design boundary is the handoff from legal approval to technical provisioning.

A clean handoff package from the onboarding workflow to the platform operator should include:

| Input | Why the platform needs it |
|---|---|
| Approved organization identifier | Creates or links the tenant record. |
| Approved participant name | Used for display, support, and handoff. |
| Dataspace profile | Determines protocol, credential, and policy expectations. |
| Identifier strategy | Determines DID method, hostname, or pre-existing DID registration. |
| Credential requests | Tells issuer integration which credentials to issue. |
| Evidence references | Links technical issuance back to reviewed legal evidence without copying documents into runtime components. |
| Approval timestamp and reviewer | Supports audit and support. |
| Restrictions or conditions | Example: sandbox-only, pilot-only, product-program-specific. |

Avoid sending raw onboarding documents into every platform component. Keep legal evidence in the onboarding or governance system. Send the minimum references needed for technical traceability.

## Onboarding states

Use explicit states. They help applicants, operators, issuers, and support teams understand where a participant is blocked.

| State | Meaning | Typical owner |
|---|---|---|
| `draft` | Applicant started but has not submitted. | Applicant. |
| `submitted` | Application is waiting for validation. | Registration service. |
| `needs-evidence` | Required evidence is missing or insufficient. | Applicant and reviewer. |
| `approved` | Legal or business criteria are satisfied. | Dataspace authority or delegate. |
| `provisioning` | Technical participant setup is running. | Platform operator and CFM. |
| `credential-pending` | Infrastructure exists, but required credential issuance is incomplete. | Issuer and platform integration. |
| `active` | Participant can use the dataspace profile. | Participant and platform operator. |
| `suspended` | Participant is intentionally blocked from new use. | Dataspace authority, issuer, operator. |
| `offboarded` | Participation ended and records are archived according to policy. | Dataspace authority and operator. |

Your exact state names can differ. The distinction matters more than the labels.

## Onboarding models

There is more than one valid model.

| Model | Description | When useful |
|---|---|---|
| Centralized onboarding | One registration workflow handles applications for the dataspace. | Small pilots, strong consistency requirements, regulated communities. |
| Delegated onboarding | Multiple approved providers perform onboarding under the same rules. | Larger ecosystems, regional service providers, SME onboarding. |
| Decentralized credential-based onboarding | Participants prove eligibility with accepted credentials from external trust frameworks. | Communities that want minimal central dependency and already have trusted credentials. |
| Hybrid onboarding | A lightweight dataspace membership check plus external credentials for domain roles. | Most growing industrial dataspaces. |

The choice is a governance decision. The platform can support different models, but it cannot decide which model is acceptable.

## Credential issuance during onboarding

The initial technical onboarding usually requests one or more credentials:

- membership credential;
- role credential;
- profile-specific credential;
- technical conformance credential, if used;
- product-program access credential, if approved during onboarding.

Not every credential must be issued at join time. For example, TowerWorks may join with membership and fabricator role credentials, then later request `ProgramAccessCredential(NSW-15)` when it starts that program.

Design both flows:

| Credential timing | Example |
|---|---|
| Issued during initial onboarding | WindData membership credential. |
| Issued after additional review | Accredited lab credential. |
| Issued by external issuer | Security certification credential. |
| Issued per project or relationship | Program access credential. |
| Reused from another trust framework | Existing legal entity or industry certification credential. |

## What to document for operators

Before technical provisioning is automated, the trust team should provide:

1. onboarding states and transitions;
2. evidence requirements per credential;
3. approval authority per state;
4. mapping from approval output to CFM tenant and participant profile input;
5. issuer integration requirements;
6. credential delivery expectations;
7. failure handling for rejected issuance;
8. suspension and offboarding triggers;
9. audit retention expectations;
10. participant-facing messages for common failures.

If an applicant is rejected by the issuer, the operator should not have to guess whether the problem is technical or governance-related.

## What not to automate too early

Avoid automating approval decisions before the criteria are stable.

For a pilot, it is acceptable to automate technical provisioning while keeping legal approval manual. That is often safer than encoding immature governance rules in software.

A good first milestone is:

```text
manual legal approval
        │
        ▼
approved onboarding record
        │
        ▼
automated CFM provisioning and credential request
        │
        ▼
operator validation and participant handoff
```

As confidence grows, parts of evidence collection, validation, and issuance can become more automated.
