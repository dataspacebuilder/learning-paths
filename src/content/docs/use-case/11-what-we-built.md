---
title: "Chapter 11: What We Built"
description: "A summary of the use case and how the story maps to core dataspace concepts."
---

The story started with a familiar problem: several companies needed to share product information, but email, portals, and custom integrations would not scale.

By the end, the companies had a dataspace pattern.

GreenSteel published steel mill certificates. TowerWorks consumed material evidence and published a tower-section dossier. SafeLoad published independent weld and fatigue reports. NorthSea Wind assembled turbine evidence from multiple sources. GridSight consumed selected data for analytics. WindData Alliance defined the shared trust rules and issued membership credentials.

No central party became the owner of all documents. No provider built a custom integration for every consumer. No consumer needed a different access pattern for every provider.

## The full flow

The use case followed this sequence:

1. **GreenSteel publishes data** — the GS-87 steel mill certificate becomes a catalog offer under a membership policy.
2. **TowerWorks consumes data** — it discovers the offer, negotiates access, and retrieves the certificate from GreenSteel.
3. **TowerWorks becomes a provider** — it publishes the TS-42 tower-section dossier using the same pattern.
4. **SafeLoad adds independent evidence** — its weld and fatigue report becomes another trusted source in the network.
5. **NorthSea Wind assembles the picture** — it retrieves documents from several providers for compliance and product-passport work.
6. **GridSight uses the data differently** — it consumes allowed data for analytics rather than manufacturing.
7. **Updates are signaled** — providers notify eligible consumers that new versions exist.
8. **Trust changes are reflected** — expiration, revocation, and policy changes affect future access.

That sequence is not a one-off workflow hard-coded by a central operator. It is the result of independent participants using the same shared interaction model.

## Before and after

| Before | With the dataspace pattern |
|---|---|
| New partner means a new integration or portal setup. | New partner uses the same discovery, negotiation, and transfer flow. |
| Documents are emailed, forwarded, and duplicated. | Providers publish offers; data moves only after access is agreed. |
| Access depends on local accounts and manual checks. | Access can depend on verifiable credentials and machine-readable policies. |
| Updates are sent manually to guessed recipient lists. | Updates can be signaled to eligible consumers, who retrieve current data from the source. |
| Revocation requires every system to be changed separately. | Future access can fail automatically when credentials expire or are revoked. |
| Trust rules are hidden in each relationship. | Trust rules are expressed through credentials, issuers, and policies. |

## Concept map

| Story element | Dataspace concept |
|---|---|
| GreenSteel, TowerWorks, SafeLoad, NorthSea Wind, GridSight | Participants |
| WindData Alliance | Dataspace authority and membership issuer |
| GS-87 steel mill certificate, TS-42 tower-section dossier, TS-42 weld and fatigue report | Assets |
| Catalog entries for those documents | Offers |
| Membership or role requirements | Policies |
| Successful access request | Contract agreement |
| Provider storage and serving endpoint | Data plane |
| Catalog, policy, negotiation, and transfer coordination | Control plane |
| Participant identity and credentials | Identity and trust layer |
| Update signals | Notifications |

## What the dataspace did not do

It is just as important to be clear about what was not built.

The dataspace did not replace every company's internal systems. GreenSteel still manages its certificates. TowerWorks still manages its tower-section dossiers. SafeLoad still manages its reports.

The dataspace did not remove governance. WindData Alliance still needs rules for membership, credentials, policies, and participant conduct.

The dataspace did not make all data public. Every offer remains controlled by provider policies.

The dataspace did not guarantee that every implementation is production-ready. Real deployments need security hardening, monitoring, operational processes, legal agreements, and careful integration with existing systems.

## The main lesson

A dataspace is a way for independent organizations to share data under common rules without giving up control of their own systems.

The story can be summarized in one sentence:

> Providers publish controlled offers, consumers negotiate access with credentials, and data moves from the source under agreed policy.

If that sentence describes a problem you recognize, the final chapter will help you decide whether a dataspace is the right fit.
