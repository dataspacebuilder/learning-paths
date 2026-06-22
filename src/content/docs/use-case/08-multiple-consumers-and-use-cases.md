---
title: "Chapter 8: Multiple Consumers and Use Cases"
description: "How NorthSea Wind and GridSight use the same published offers for different business purposes."
---

The dataspace now contains offers from several providers.

GreenSteel publishes the GS-87 steel mill certificate. TowerWorks publishes the TS-42 tower-section dossier. SafeLoad publishes the TS-42 weld and fatigue report.

NorthSea Wind Systems needs all three. GridSight Analytics needs selected information for a different purpose.

The providers do not create a separate integration for each consumer. They publish controlled offers once, and eligible consumers use the shared discovery and negotiation flow.

## NorthSea Wind assembles product evidence

NorthSea Wind builds the NSW-15 offshore wind turbine, which uses TowerWorks's TS-42 tower section. To support compliance and product-passport work, it needs upstream evidence from multiple sources.

| Evidence | Source participant |
|---|---|
| GS-87 steel mill certificate | GreenSteel Mill |
| TS-42 tower-section dossier | TowerWorks Fabrication |
| TS-42 independent weld and fatigue report | SafeLoad Labs |

NorthSea Wind queries each provider's catalog, chooses the relevant offers, negotiates access, and retrieves the documents from the providers' data planes.

From NorthSea Wind's point of view, the process is consistent even though the providers are different. It does not learn three custom APIs. It asks its own connector to interact with three provider connectors through the shared dataspace protocol.

## GridSight uses the data differently

GridSight runs analytics dashboards for supply-chain risk, carbon footprint, compliance status, and quality trends. It does not manufacture the turbine. It may not need the same document depth that NorthSea Wind needs.

Depending on the policies, GridSight might be allowed to access:

- summary metadata about steel batches and tower sections;
- selected certificates needed for compliance and sustainability dashboards;
- report status fields rather than full technical reports;
- only documents covered by an analytics-service agreement.

The important point is that GridSight can use the same dataspace interaction model for a different use case.

A provider can publish one asset with one policy, or several related offers with different policies. For example, SafeLoad might expose a full weld and fatigue report to manufacturers and a reduced status summary to analytics providers. The dataspace supports both patterns because access is controlled by policies and credentials.

## Published once does not mean open to everyone

The phrase "publish once" can be misleading if it sounds like public release.

In a dataspace, publishing means making an offer discoverable under conditions. A consumer still needs to satisfy the policy. Some offers may be visible broadly. Others may appear only to participants with a particular credential. Some may be visible but not negotiable unless an additional condition is met.

This lets the same provider serve multiple relationships without creating a separate technical pathway for each one.

## New use cases can appear later

GreenSteel did not need to know in advance that GridSight would become interested in the GS-87 certificate. It published the offer under a policy. When GridSight joins the dataspace and receives the right credentials, it can discover and request the allowed data.

That is very different from a bilateral integration model. In a bilateral model, every new consumer usually creates work for the provider. In the dataspace model, a new consumer creates work mainly around governance and eligibility: should this participant receive the credentials or meet the policy conditions?

The technical interaction stays familiar.

## What this step shows

The story now has:

- multiple providers;
- multiple consumers;
- different business purposes;
- different access policies;
- no central document store;
- no custom integration for every pair of companies.

This is the point where the dataspace starts to look less like a document exchange and more like an ecosystem. Participants can join, publish, discover, negotiate, and reuse the same trusted interaction pattern for new business needs.
