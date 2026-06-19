---
title: "Chapter 3: How a Dataspace Works"
description: "The basic dataspace pattern: publish descriptions, discover offers, negotiate access, and transfer data from the owner."
---

A dataspace is easier to understand if you start with the interaction, not the technology.

One participant has data. Another participant needs it. The provider wants to stay in control. The consumer wants a predictable way to find and receive the data. Both sides need a shared way to prove identity, evaluate access rules, and record what was agreed.

The dataspace gives them that shared way.

## The five-step pattern

Most interactions in this path follow the same pattern.

1. **Publish** — A provider describes data it is willing to share. The description appears in a catalog. The actual data stays in the provider's system.
2. **Discover** — A consumer asks what the provider offers. The answer depends on the consumer's identity and credentials.
3. **Negotiate** — The consumer requests access to an offer. The provider's policy is evaluated. If the consumer satisfies the policy, a contract is agreed.
4. **Transfer** — The consumer receives the information needed to retrieve the data from the provider's data endpoint.
5. **Update** — If the data changes later, the provider can signal that a new version exists. The consumer still follows the normal access process to retrieve it.

This is the core difference from email. The provider does not push uncontrolled copies to every possible recipient. It publishes an offer and lets eligible participants request access.

## The main building blocks

| Concept | Plain-language meaning |
|---|---|
| **Participant** | An organization that can publish or consume data in the dataspace. |
| **Dataspace authority** | The body that defines participation rules, trusted credentials, and governance expectations. |
| **Credential issuer** | An authority that issues verifiable claims, such as active membership or certification status. |
| **Connector** | The participant-facing software that speaks dataspace protocols and coordinates catalog, contract, and transfer flows. |
| **Control plane** | The part of the connector that manages catalog entries, policies, negotiations, and transfer coordination. |
| **Data plane** | The part that serves the actual data after access has been authorized. |
| **Catalog** | A list of data offers and the terms under which they are available. |
| **Policy** | A machine-readable rule that says who may access something and under what conditions. |
| **Contract agreement** | The result of a successful negotiation between provider and consumer. |

The names can sound technical, but the idea is simple: control decisions and data delivery are separated. The control plane decides whether access is allowed. The data plane delivers the data only after that decision has been made.

## Data is not stored centrally

The story does not create a central TrustGrid document repository.

VeloForge's material certificate stays with VeloForge. FerroLink's component documentation stays with FerroLink. QuantisSeal's test report stays with QuantisSeal.

The catalog contains descriptions and offers, not the full documents. A consumer receives the document from the provider's data plane after a contract is agreed.

This keeps responsibility clear. The provider remains responsible for the data it publishes, the policies it attaches, and the system that serves it.

## Access is negotiated, not assumed

A catalog entry is not an open download link.

When FerroLink requests VeloForge's certificate, VeloForge can check whether FerroLink is an active TrustGrid member. If the policy requires a stronger credential, the same negotiation flow can check for that instead.

The consumer does not manually email a PDF request. The provider does not manually inspect an inbox. The connector software exchanges the required information and records the outcome.

## The protocol creates common behavior

Dataspaces use shared protocols so that participants do not have to invent a custom integration for every partner.

In this path, the important protocol idea is the **Dataspace Protocol**: a common language for catalog requests, contract negotiation, and transfer coordination between participants. Later technical paths can explain specific APIs and implementations. For this use case, it is enough to remember the effect:

> Each company can operate its own systems, but the cross-company interaction follows the same pattern.

That pattern is what allows the story to grow from one document exchange to a multi-party data-sharing network.
