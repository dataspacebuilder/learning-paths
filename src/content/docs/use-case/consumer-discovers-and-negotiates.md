---
title: "Chapter 5: Consumer Discovers and Negotiates"
description: "How TowerWorks finds GreenSteel's certificate, proves eligibility, negotiates access, and retrieves the document."
---

TowerWorks Fabrication is fabricating tower section **TS-42** from GreenSteel's GS-87 steel. To document the tower section properly, TowerWorks needs the GS-87 steel mill certificate.

Without a dataspace, TowerWorks might email a request to GreenSteel, log into a supplier portal, or use a custom integration built only for this relationship.

In the dataspace, TowerWorks uses the same pattern it can use with any provider: discover, negotiate, and transfer.

## 1. TowerWorks asks what GreenSteel offers

TowerWorks does not browse GreenSteel's internal systems. It asks its own connector to request GreenSteel's catalog.

The request goes from TowerWorks's control plane to GreenSteel's control plane. During that exchange, the participants can prove who they are and present the credentials needed to see relevant offers.

GreenSteel's catalog response includes the GS-87 steel mill certificate offer because TowerWorks satisfies the visibility rules for that offer.

From TowerWorks's point of view, the important result is simple:

> GreenSteel has a steel mill certificate for GS-87, and the offer says an active WindData Alliance membership credential is required.

## 2. TowerWorks requests access

Seeing an offer is not the same as receiving the document.

TowerWorks starts a contract negotiation for the certificate. Its connector sends a request for the specific offer. GreenSteel evaluates the policy attached to that offer.

Because TowerWorks has an active WindData Alliance membership credential, the policy is satisfied. The two control planes record a contract agreement.

No person at GreenSteel manually approves the request in this basic flow. The provider already expressed its access rule in the policy. The negotiation applies that rule consistently.

## 3. GreenSteel authorizes the transfer

After the contract is agreed, TowerWorks starts a transfer process. GreenSteel's control plane coordinates with GreenSteel's data plane.

The data plane prepares a controlled way for TowerWorks to retrieve the certificate. In many implementations, the consumer receives an endpoint and a short-lived access token. The details can vary, but the principle stays the same:

> The consumer receives only the access needed for the agreed transfer.

TowerWorks then retrieves the PDF directly from GreenSteel's data plane.

The document has moved from provider to consumer, but the trust decision happened before the bytes were released.

## What TowerWorks did not need

TowerWorks did not need:

- a GreenSteel portal account;
- a shared user database;
- a custom GreenSteel-specific API client;
- a manual email approval;
- a permanent download URL;
- a copy of GreenSteel's internal data store.

It needed a participant identity, the required credential, and a connector that could speak the shared dataspace protocol.

## Why this matters

The same sequence can work when TowerWorks needs data from another supplier.

The catalog contents, policies, and documents may differ. The interaction pattern does not:

1. ask the provider's catalog what is available;
2. choose an offer;
3. negotiate access under the provider's policy;
4. retrieve the data from the provider's data plane.

This is the first payoff of the dataspace model. A new partner no longer means inventing a new integration pattern. It means applying the same shared flow to a different provider and a different offer.
