---
title: "Chapter 9: Dataspace Profiles and Cells"
description: "Configure deployment zones and dataspace-specific settings before provisioning participants."
---

Participant provisioning needs two kinds of platform configuration: **where** the participant context should run and **which dataspace rules** it should follow.

CFM models those concerns with cells and dataspace profiles.

## Cells

A **cell** is a deployment zone that can host participant contexts. In a simple setup, a cell might represent one Kubernetes cluster. In a larger platform, cells can represent regions, cloud accounts, availability zones, regulated environments, or separate operational domains.

Examples:

| Cell | Meaning |
|---|---|
| `eu-west-managed` | Shared managed connector services in an EU region. |
| `de-industrial` | Deployment zone close to industrial customer networks. |
| `sandbox` | Non-production test environment. |
| `customer-owned-greensteel` | A cell representing an approved self-hosted participant environment. |

Cells help the platform decide where resources are created and which operational constraints apply.

## Dataspace profiles

A **dataspace profile** is the platform expression of a dataspace's technical and trust rules.

It may include:

- protocol versions and endpoint conventions;
- accepted DID methods;
- credential types required for membership;
- trusted issuers and trust anchors;
- policy templates or policy constraints;
- default onboarding activities;
- issuer integration settings;
- revocation and renewal expectations;
- data-plane requirements or allowed transfer types.

The dataspace profile does not replace the governance document. It makes selected governance decisions executable by the platform.

## Participant profiles

A **participant profile** binds a tenant to a cell and one or more dataspace profiles.

```text
Tenant: TowerWorks Fabrication
        │
        ▼
Participant profile
  ├─ cell: eu-west-managed
  ├─ identifier: did:web:ih.platform.example:towerworks
  ├─ dataspace profile: winddata-alliance
  └─ status: active after provisioning activities complete
```

The participant profile is the object that drives provisioning. It tells CFM what identity to create, where to create it, and which dataspace-specific steps to run.

## Multi-dataspace participants

A participant can join more than one dataspace. There are two common approaches:

| Approach | Description | When useful |
|---|---|---|
| One profile per dataspace | Separate participant profile, possibly separate DID and credentials per dataspace. | Strong separation, different trust frameworks, different operational zones. |
| One profile spanning multiple dataspaces | Same participant identity and platform context linked to multiple dataspace profiles. | Closely related dataspaces with shared identity and compatible trust rules. |

Do not assume one model for every customer. The dataspace authority and operator should define which identity boundaries are acceptable.

## What to configure before onboarding

Before provisioning real participants, configure at least:

1. one production-like cell;
2. one sandbox or test cell if you offer test onboarding;
3. a dataspace profile for each supported dataspace;
4. allowed DID method and hostname strategy;
5. trusted issuers and credential requirements;
6. default activity sequence for the participant profile;
7. policy templates or references used by onboarding and examples.

If these inputs are incomplete, provisioning may still create technical contexts, but participants will not be able to complete meaningful dataspace interactions.
