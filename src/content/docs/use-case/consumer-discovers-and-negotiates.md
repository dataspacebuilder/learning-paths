---
title: "Chapter 5: Consumer Discovers and Negotiates"
description: "How FerroLink finds VeloForge's certificate, proves eligibility, negotiates access, and retrieves the document."
---

FerroLink Industries is building battery housing **BH-2026** from VeloForge's ALX88 alloy. To document the component properly, FerroLink needs the ALX88 material certificate.

Without a dataspace, FerroLink might email a request to VeloForge, log into a supplier portal, or use a custom integration built only for this relationship.

In the dataspace, FerroLink uses the same pattern it can use with any provider: discover, negotiate, and transfer.

## 1. FerroLink asks what VeloForge offers

FerroLink does not browse VeloForge's internal systems. It asks its own connector to request VeloForge's catalog.

The request goes from FerroLink's control plane to VeloForge's control plane. During that exchange, the participants can prove who they are and present the credentials needed to see relevant offers.

VeloForge's catalog response includes the ALX88 material certificate offer because FerroLink satisfies the visibility rules for that offer.

From FerroLink's point of view, the important result is simple:

> VeloForge has a material certificate for ALX88, and the offer says an active TrustGrid membership credential is required.

## 2. FerroLink requests access

Seeing an offer is not the same as receiving the document.

FerroLink starts a contract negotiation for the certificate. Its connector sends a request for the specific offer. VeloForge evaluates the policy attached to that offer.

Because FerroLink has an active TrustGrid membership credential, the policy is satisfied. The two control planes record a contract agreement.

No person at VeloForge manually approves the request in this basic flow. The provider already expressed its access rule in the policy. The negotiation applies that rule consistently.

## 3. VeloForge authorizes the transfer

After the contract is agreed, FerroLink starts a transfer process. VeloForge's control plane coordinates with VeloForge's data plane.

The data plane prepares a controlled way for FerroLink to retrieve the certificate. In many implementations, the consumer receives an endpoint and a short-lived access token. The details can vary, but the principle stays the same:

> The consumer receives only the access needed for the agreed transfer.

FerroLink then retrieves the PDF directly from VeloForge's data plane.

The document has moved from provider to consumer, but the trust decision happened before the bytes were released.

## What FerroLink did not need

FerroLink did not need:

- a VeloForge portal account;
- a shared user database;
- a custom VeloForge-specific API client;
- a manual email approval;
- a permanent download URL;
- a copy of VeloForge's internal data store.

It needed a participant identity, the required credential, and a connector that could speak the shared dataspace protocol.

## Why this matters

The same sequence can work when FerroLink needs data from another supplier.

The catalog contents, policies, and documents may differ. The interaction pattern does not:

1. ask the provider's catalog what is available;
2. choose an offer;
3. negotiate access under the provider's policy;
4. retrieve the data from the provider's data plane.

This is the first payoff of the dataspace model. A new partner no longer means inventing a new integration pattern. It means applying the same shared flow to a different provider and a different offer.
