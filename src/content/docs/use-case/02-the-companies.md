---
title: "Chapter 2: The Companies"
description: "The fictional participants in the use case and the roles they play in the dataspace."
---

The use case follows six fictional organizations. They are deliberately ordinary for a wind-energy supply chain: a steel supplier, a tower fabricator, a test lab, a turbine manufacturer, an analytics provider, and an alliance that defines the rules of the shared data ecosystem.

## The cast

| Participant | Business role | Dataspace role |
|---|---|---|
| **GreenSteel Mill** | Produces low-carbon steel for heavy components. | Publishes steel mill certificates for steel batches. |
| **TowerWorks Fabrication** | Fabricates offshore wind tower sections. | Consumes steel mill certificates and publishes tower-section dossiers. |
| **SafeLoad Labs** | Runs independent weld, fatigue, and structural tests. | Publishes reports that other participants can rely on. |
| **NorthSea Wind Systems** | Builds offshore wind turbines. | Consumes upstream documents to assemble compliance and product-passport evidence. |
| **GridSight Analytics** | Runs supply-chain and carbon-footprint dashboards. | Consumes selected documents and metadata for risk, sustainability, and compliance analytics. |
| **WindData Alliance** | Defines the rules for this industry dataspace. | Acts as the dataspace authority and credential issuer for membership. |

The company names are fictional, but the shape is realistic. Many real ecosystems have the same mix: upstream suppliers, intermediate manufacturers, final manufacturers, service providers, auditors, and governance bodies.

## The supply-chain story

GreenSteel produces a low-carbon steel batch. TowerWorks uses that steel to fabricate a tower section. SafeLoad tests the welds and fatigue behavior. NorthSea Wind needs all of that evidence for the NSW-15 turbine. GridSight needs selected information to provide analytics.

```text
GreenSteel Mill             SafeLoad Labs
(steel mill certificates)   (weld and fatigue reports)
        │                            │
        ▼                            ▼
TowerWorks Fabrication ───────────────────────► NorthSea Wind Systems
(tower-section dossiers)                        (turbine evidence)
        │                                            │
        └───────────────┐                 ┌──────────┘
                        ▼                 ▼
                 GridSight Analytics
                 (analytics and dashboards)
```

Without a dataspace, each arrow could become a separate integration, portal upload, or email thread. The use case shows how the companies can use one shared interaction model instead.

## Participants, not accounts in one system

In a dataspace, each company is a **participant**. A participant is not just a user account in someone else's portal. It is an organization that can prove its identity, publish data, consume data, and make its own access decisions.

Each participant uses a digital identity. In many dataspace architectures this identity is represented by a **DID**, a decentralized identifier. You can think of it as a verifiable business identity used during machine-to-machine interactions.

The identity alone is not enough. The participants also need trusted claims about status and rights. In this story, WindData Alliance issues a membership credential that says a company is an active member of the dataspace. Other credentials can represent stronger or more specific claims, such as laboratory accreditation, service-partner status, or permission to access a restricted document class.

## WindData Alliance does not become the data owner

WindData Alliance defines the rules and issues membership credentials. It does not collect all product documents into a central store.

That distinction matters:

- GreenSteel keeps its steel mill certificates.
- TowerWorks keeps its tower-section dossiers.
- SafeLoad keeps its weld and fatigue reports.
- NorthSea Wind and GridSight retrieve data only after access has been agreed.
- WindData Alliance supplies the common trust framework that lets policies mean the same thing across the network.

The dataspace therefore connects independent organizations without turning the consortium into a data warehouse.

## Provider and consumer are roles

A company is not permanently a provider or permanently a consumer.

TowerWorks consumes GreenSteel's steel mill certificate because it needs supplier evidence. Later, TowerWorks publishes its own tower-section dossier because NorthSea Wind needs tower-section evidence. The same organization plays both roles in the same dataspace.

This is one of the most important ideas in the path: a dataspace is not a pipeline from fixed suppliers to fixed customers. It is a network where participants can publish, discover, negotiate, and transfer data according to shared rules.
