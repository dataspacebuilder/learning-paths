---
title: "Chapter 2: The Companies"
description: "The fictional participants in the use case and the roles they play in the dataspace."
---

The use case follows six fictional organizations. They are deliberately ordinary: suppliers, manufacturers, a lab, an analytics provider, and a consortium that defines the rules of the shared data ecosystem.

## The cast

| Participant | Business role | Dataspace role |
|---|---|---|
| **VeloForge Materials** | Produces recycled aluminum alloy. | Publishes material certificates for alloy batches. |
| **FerroLink Industries** | Machines battery housings from supplier materials. | Consumes material certificates and publishes component documentation. |
| **QuantisSeal Labs** | Runs independent product and component tests. | Publishes test reports that other participants can rely on. |
| **LumenDrive Motors** | Builds electric vehicles. | Consumes upstream documents to assemble compliance and product-passport evidence. |
| **NebulaFlow Cloudworks** | Runs supply-chain analytics dashboards. | Consumes selected documents and metadata for risk and compliance analytics. |
| **TrustGrid Consortium** | Defines the rules for this industry dataspace. | Acts as the dataspace authority and credential issuer for membership. |

The company names are fictional, but the shape is realistic. Many real ecosystems have the same mix: upstream suppliers, intermediate manufacturers, final manufacturers, service providers, auditors, and governance bodies.

## The supply-chain story

VeloForge produces alloy. FerroLink uses that alloy to make a battery housing. QuantisSeal tests the housing. LumenDrive needs all of that evidence for the vehicle. NebulaFlow needs selected information to provide analytics.

```text
VeloForge Materials            QuantisSeal Labs
(material certificates)        (test reports)
        │                            │
        ▼                            ▼
FerroLink Industries ───────────────────────► LumenDrive Motors
(component documentation)                       (product evidence)
        │                                            │
        └───────────────┐                 ┌──────────┘
                        ▼                 ▼
                 NebulaFlow Cloudworks
                 (analytics and dashboards)
```

Without a dataspace, each arrow could become a separate integration, portal upload, or email thread. The use case shows how the companies can use one shared interaction model instead.

## Participants, not accounts in one system

In a dataspace, each company is a **participant**. A participant is not just a user account in someone else's portal. It is an organization that can prove its identity, publish data, consume data, and make its own access decisions.

Each participant uses a digital identity. In many dataspace architectures this identity is represented by a **DID**, a decentralized identifier. You can think of it as a verifiable business identity used during machine-to-machine interactions.

The identity alone is not enough. The participants also need trusted claims about status and rights. In this story, TrustGrid issues a membership credential that says a company is an active member of the dataspace. Other credentials can represent stronger or more specific claims, such as laboratory accreditation, service-partner status, or permission to access a restricted document class.

## TrustGrid does not become the data owner

TrustGrid defines the rules and issues membership credentials. It does not collect all product documents into a central store.

That distinction matters:

- VeloForge keeps its material certificates.
- FerroLink keeps its component documentation.
- QuantisSeal keeps its test reports.
- LumenDrive and NebulaFlow retrieve data only after access has been agreed.
- TrustGrid supplies the common trust framework that lets policies mean the same thing across the network.

The dataspace therefore connects independent organizations without turning the consortium into a data warehouse.

## Provider and consumer are roles

A company is not permanently a provider or permanently a consumer.

FerroLink consumes VeloForge's material certificate because it needs supplier evidence. Later, FerroLink publishes its own battery-housing documentation because LumenDrive needs component evidence. The same organization plays both roles in the same dataspace.

This is one of the most important ideas in the path: a dataspace is not a pipeline from fixed suppliers to fixed customers. It is a network where participants can publish, discover, negotiate, and transfer data according to shared rules.
