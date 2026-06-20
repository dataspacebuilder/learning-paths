---
title: "Chapter 3: Dataspace Profiles"
description: "How a profile turns governance choices into platform, protocol, credential, and policy configuration."
---

A dataspace profile is the bridge between governance and runtime behavior.

It says: for this dataspace, these are the protocol expectations, credential requirements, trusted issuers, policy vocabularies, onboarding rules, and operational constraints that participants must follow.

In the platform path, a profile is configured so CFM and the connector services can provision participants correctly. In this trust path, the profile is designed before it becomes configuration.

## What a profile contains

A practical profile includes at least these decisions:

| Area | Example decision for WindData Alliance |
|---|---|
| Profile identifier | `winddata-alliance` |
| Protocols | DSP profile and version accepted for participant interactions. |
| Credential protocol | DCP expectations for credential presentation and verification. |
| Identity model | Accepted DID methods, DID document requirements, key rotation expectations. |
| Required credentials | Membership credential required for ordinary participation. |
| Optional credentials | Lab accreditation, manufacturer role, analytics provider, project-specific access. |
| Trusted issuers | WindData issuer for membership; external accreditation body for lab credentials. |
| Credential schemas | Claim names, value formats, validity periods, status mechanisms, versioning. |
| Policy vocabulary | Names and meanings for constraints used in access and contract policies. |
| Onboarding rules | Evidence required, approval states, technical provisioning trigger. |
| Revocation rules | Who can suspend or revoke credentials and how quickly verifiers must react. |
| Data-plane expectations | Allowed transfer types or security requirements, if the dataspace mandates them. |

Do not treat the profile as only a YAML file. The file is one representation. The profile is the set of decisions behind it.

## Four views of the same profile

Different teams see the profile through different lenses.

| View | What it means |
|---|---|
| Governance view | The rules and expectations the dataspace authority approves. |
| Platform view | CFM, Control Plane, Identity Hub, issuer, and data-plane configuration. |
| Application view | The policy templates, credential names, endpoints, and error explanations the app uses. |
| Participant view | The requirements an organization must meet to join and remain active. |

All four views must refer to the same profile. If governance says `WindDataMembershipCredential`, the issuer, policy templates, and application messages should use the same meaning.

## Profile example

A compact first version for WindData Alliance might look like this:

```text
profile: winddata-alliance
purpose: offshore wind product-passport evidence exchange
technical profile:
  protocol profile: dataspace-protocol-http:2025-1
  credential exchange: DCP-compatible credential presentation
  accepted DID methods: did:web
  policy language: ODRL profile used by WindData policy templates
trust profile:
  required credentials:
    - WindDataMembershipCredential v1
  optional credentials:
    - AccreditedLabCredential v1
    - TurbineManufacturerCredential v1
    - AnalyticsProviderCredential v1
  trusted issuers:
    - WindData Alliance membership issuer
    - recognized lab accreditation issuer
onboarding:
  legal approval required before technical provisioning
  membership credential issued after approval
lifecycle:
  membership validity: 12 months
  suspension blocks future negotiation
  revoked credentials must fail future policy checks
```

This is illustrative, not a normative format. Use the actual configuration format required by your platform and component versions.

## How this maps to CFM

CFM's architecture models tenants, participant profiles, identifiers, dataspace profiles, virtual participant agents, and cells. A participant profile binds an organization to an identifier, one or more dataspace profiles, and the deployment context where the participant runs.

In practical terms:

```text
Tenant: TowerWorks Fabrication
        │
        ▼
Participant profile
  ├─ identifier: did:web:ih.platform.example:towerworks
  ├─ dataspace profile: winddata-alliance
  ├─ cell: eu-west-managed
  └─ provisioned runtime contexts
```

That platform configuration should be downstream of the trust-design work. The trust team defines what `winddata-alliance` means. The platform team configures it.

For the component model, see the [CFM system architecture](https://github.com/eclipse-cfm/cfm/blob/main/docs/developer/architecture/system.architecture.md) and the platform chapter [Dataspace Profiles and Cells](../platform-setup/dataspace-profiles-and-cells/).

## How this maps to EDC protocol contexts

EDC's **Dataspace Profile Context** decision record introduces a runtime concept for serving multiple dataspaces with different combinations of protocol version, authentication, vocabulary, policy functions, scopes, and identifier resolution.

The important design implication is this:

> If two dataspaces require different protocol, vocabulary, authentication, or policy behavior, model them as separate profile contexts rather than hiding differences in ad hoc application code.

A profile context can be represented by a distinct protocol endpoint and advertised to peers. The [EDC decision record on Dataspace Profile Context](https://github.com/eclipse-edc/Connector/tree/main/docs/developer/decision-records/2025-05-28-dataspace-profile-context) is the authoritative reference for that implementation direction.

## Profile boundaries

Profiles should be explicit about what is mandatory and what is optional.

| Category | Recommended treatment |
|---|---|
| Must-have interoperability rules | Put them in the profile. Participants need them to interact. |
| Optional convenience services | Reference them, but do not make them mandatory unless governance requires them. |
| Provider-specific restrictions | Let providers add stricter asset policies. Do not hard-code every provider rule into the dataspace profile. |
| Experimental features | Put them in a sandbox or versioned draft profile. |
| Legal templates | Reference the approved legal process, but do not bury legal interpretation in connector configuration. |

A profile that is too vague cannot be implemented. A profile that is too broad becomes impossible to evolve.

## Version the profile

Profiles change. WindData Alliance might start with member-only document access and later add project-specific credentials, new policy operands, or a new DSP version.

Use explicit profile versions or compatibility statements:

```text
winddata-alliance:v1
  DSP: 2025-1
  credentials: membership v1, lab-accreditation v1
  policy templates: member.use.v1, lab.report.publish.v1

winddata-alliance:v2
  adds: product-program credential
  changes: manufacturer access policy template
  migration: v1 credentials accepted until 2027-01-01
```

The versioning rule should say:

- which participants must upgrade;
- whether old credentials remain valid;
- whether old policy templates remain negotiable;
- how applications should identify incompatible offers;
- how sandbox testing happens before production change.

## Design checklist

Before the platform team configures a profile, the trust team should be able to answer:

1. What is the profile name and scope?
2. Which protocol versions and identity mechanisms are required?
3. Which credential types are required at onboarding?
4. Which credential types are optional but policy-relevant?
5. Which issuers are trusted for each credential type?
6. Which claims and vocabularies are stable enough for policy templates?
7. Which onboarding states exist before provisioning?
8. What revocation and suspension behavior is expected?
9. How will profile changes be versioned and communicated?
10. How will participants test conformance before production use?

If these answers are not ready, create a sandbox profile first. Do not pretend a production trust framework exists just because the technical platform can provision participants.
