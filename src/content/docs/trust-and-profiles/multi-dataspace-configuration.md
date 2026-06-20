---
title: "Chapter 10: Multi-Dataspace Configuration"
description: "How one organization can participate in multiple dataspaces with separate profiles, credentials, and protocol contexts."
---

Many organizations will join more than one dataspace.

TowerWorks might participate in WindData Alliance for offshore wind evidence, a logistics dataspace for shipping data, and a sustainability reporting dataspace for carbon data. Each dataspace can have different protocols, credentials, issuers, policy vocabularies, and onboarding rules.

The trust model must make those differences explicit.

## The main design question

For each organization, decide whether participation in multiple dataspaces uses:

| Model | Description | When useful |
|---|---|---|
| One identity per dataspace | Separate participant identity, profile, credentials, and endpoints per dataspace. | Strong separation, different trust frameworks, different legal boundaries. |
| One identity across related dataspaces | Same participant identity linked to multiple profiles. | Closely related dataspaces with compatible identity and governance rules. |
| Hybrid | Shared identity for some profiles, separate identity for others. | Large participants with different business units, jurisdictions, or risk classes. |

The CFM architecture discusses this as participant profiles linked to identifiers and dataspace profiles. The constraint is practical: a participant identity must be clear within each dataspace interaction.

## Profile matrix

Create a matrix before configuring anything.

| Profile | Purpose | Required credentials | Trusted issuers | Protocol context |
|---|---|---|---|---|
| `winddata-alliance:v1` | Offshore wind product evidence. | Membership, role credentials. | WindData issuer, lab accreditation issuer. | DSP 2025-1 profile. |
| `green-supply-reporting:v1` | Carbon reporting across materials. | Sustainability reporting credential. | Reporting authority. | Same or different protocol context. |
| `industrial-logistics:v1` | Shipping and delivery events. | Logistics member credential. | Logistics dataspace issuer. | Potentially different vocabulary and policies. |

If two profiles use the same protocol version but different policy vocabulary and credential schemas, they are still different profiles.

## Identity separation

Identity separation is a governance and risk decision.

Use separate identities when:

- the dataspaces have incompatible trust frameworks;
- the organization wants separate operational responsibility;
- different business units participate;
- legal obligations require separation;
- different DID methods or key-management rules apply;
- credentials from one dataspace must not be presented in another.

Use a shared identity when:

- the dataspaces are coordinated;
- credential reuse is intentional;
- the same organizational representation is acceptable;
- the platform and participant can manage profile-specific presentation safely.

Do not assume one approach for every participant.

## Credential scoping

A credential should say which profile, community, or purpose it applies to.

Examples:

```text
WindDataMembershipCredential
  memberOf: winddata-alliance
  holder: did:web:ih.platform.example:towerworks

GreenSupplyReportingCredential
  memberOf: green-supply-reporting
  holder: did:web:ih.platform.example:towerworks

ProgramAccessCredential
  memberOf: winddata-alliance
  programId: NSW-15
  holder: did:web:ih.platform.example:towerworks
```

Profile-scoped claims help prevent accidental reuse. A membership credential for one dataspace should not satisfy membership in another unless there is an explicit mutual-recognition rule.

## Policy vocabulary separation

Different dataspaces may use similar words with different meanings.

For example, `approvedSupplier` might mean:

- supplier approved for offshore wind tower sections in WindData;
- supplier approved for logistics service events in a logistics dataspace;
- supplier approved for sustainability reporting in another profile.

Do not reuse unqualified claim names or policy operands when meanings differ. Use profile-scoped vocabulary or stable namespaces.

## Runtime profile contexts

EDC's Dataspace Profile Context direction matters here. A connector runtime may need to serve requests for multiple dataspaces with different combinations of:

- wire protocol;
- protocol version;
- authentication protocol;
- policy functions;
- JSON-LD vocabulary;
- scopes;
- identifier resolution.

Each profile can have its own protocol endpoint. A peer should know which profile it is using.

The design implication is simple:

> Multi-dataspace support is not only a list of names. It can require separate runtime contexts.

Read the [EDC Dataspace Profile Context decision record](https://github.com/eclipse-edc/Connector/tree/main/docs/developer/decision-records/2025-05-28-dataspace-profile-context) before designing advanced multi-profile deployments.

## CFM participant-profile mapping

In CFM terms, a tenant can have one or more participant profiles. Each participant profile is associated with an identifier and one or more dataspace profiles.

Two common shapes:

```text
One identity per dataspace

Tenant: TowerWorks
  ├─ Participant profile: winddata
  │    ├─ identifier: did:web:...:towerworks-winddata
  │    └─ dataspace profile: winddata-alliance
  └─ Participant profile: logistics
       ├─ identifier: did:web:...:towerworks-logistics
       └─ dataspace profile: industrial-logistics
```

```text
One identity across related dataspaces

Tenant: TowerWorks
  └─ Participant profile: towerworks-shared
       ├─ identifier: did:web:...:towerworks
       ├─ dataspace profile: winddata-alliance
       └─ dataspace profile: green-supply-reporting
```

Choose deliberately. Changing identity boundaries later can be disruptive.

## Asset and offer scoping

A provider may publish different offers under different profiles.

GreenSteel might publish:

| Asset | Profile | Policy |
|---|---|---|
| `GS-87` steel certificate | `winddata-alliance` | Active WindData members. |
| `GS-87` carbon summary | `green-supply-reporting` | Reporting credential required. |
| Shipment event stream | `industrial-logistics` | Logistics member credential required. |

The same source document can result in different dataspace offers with different policies. Keep the asset metadata, policy templates, and profile selection explicit.

## Credential reuse and mutual recognition

Credential reuse can reduce onboarding burden, but only if the profile allows it.

Examples:

| Reuse pattern | Requirement |
|---|---|
| Accept external legal-entity credential | Profile lists issuer and accepted schema. |
| Accept lab accreditation across two dataspaces | Both profiles trust the accreditation issuer for the same scope. |
| Accept membership from parent dataspace | Child profile defines inheritance or mutual-recognition rule. |
| Reuse DID across profiles | Participants and profiles accept the identity boundary. |

If mutual recognition is not documented, do not infer it.

## Operational separation

Multi-dataspace configuration affects operations.

Define:

- separate sandbox and production profiles;
- profile-specific issuer configuration;
- profile-specific policy templates;
- profile-specific endpoint discovery;
- log and audit filters by profile;
- support ownership per profile;
- conformance checks per profile;
- migration plan when one profile changes protocol version.

A single platform can operate multiple dataspaces, but the user and support experience should make profile boundaries visible.

## Design checklist

Before adding a second dataspace profile, answer:

1. Is identity shared or separate?
2. Which credentials are profile-specific?
3. Which credentials can be reused?
4. Which issuers are trusted per profile?
5. Which policy vocabulary is profile-specific?
6. Does the protocol context differ?
7. Are there separate DSP endpoints?
8. Which applications may publish into each profile?
9. How are assets scoped to profiles?
10. How are support, audit, and conformance handled?

Multi-dataspace capability should reduce duplication for participants, not blur the trust boundaries between unrelated communities.
