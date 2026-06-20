---
title: "Build a Dataspace Application"
description: "Developer path for building software that publishes, consumes, and serves data through dataspace APIs."
---

This learning path is for the team that turns a participant context into useful software.

In the offshore wind story, TowerWorks does not want engineers to publish every tower-section dossier by hand. It wants an application that watches its evidence system, publishes controlled offers into WindData Alliance, consumes GreenSteel certificates when needed, and serves approved documents to NorthSea Wind or GridSight after a contract is in place.

That is a dataspace application.

It uses the platform handoff — endpoints, OAuth credentials, participant context ID, DID, and data-plane options — and builds business behavior on top of it.

## Who this path is for

This path is for:

- application developers building participant-facing software;
- system integrators connecting ERP, PLM, MES, document-management, analytics, or data-lake systems to a dataspace;
- participant IT teams automating publish, discover, negotiate, and transfer flows;
- data plane developers;
- platform teams building customer portals or managed data-plane services.

You should understand the high-level dataspace model. If you are new to dataspaces, start with [A Dataspace Use Case](../use-case/). If you need to operate the infrastructure itself, read [Set Up a Dataspace Platform](../platform-setup/).

## What you will build

The path follows a concrete application shape: **TowerWorks Evidence Bridge**.

The application can:

- publish the `TS-42` tower-section dossier as a controlled dataspace asset;
- consume the `GS-87` steel mill certificate from GreenSteel;
- read catalog offers from other participants;
- negotiate contracts under WindData Alliance policies;
- initiate transfer processes;
- serve dossier files from a backend document system;
- optionally act as the data plane for the domain workflow.

You can apply the same patterns to other domains: sustainability dashboards, certificate-management apps, supply-chain evidence portals, maintenance-data APIs, or industrial data products.

## What you need before starting

You need a provisioned participant context, either from a managed platform or from a self-hosted connector stack.

You should have:

- a participant context ID;
- OAuth2 client credentials and token endpoint;
- a Management API base URL;
- an Identity Hub API URL if your application needs identity information;
- your participant DID;
- at least one provider DSP endpoint to query;
- a decision about data-plane placement: managed, standalone, or application-as-data-plane.

## What you will learn

By the end of this path, you will be able to:

- design an application around dataspace APIs;
- authenticate with participant-scoped OAuth tokens;
- publish assets, policies, and contract definitions;
- request catalogs, negotiate contracts, and start transfers;
- work with JSON-LD payloads and ODRL policy basics;
- handle asynchronous negotiation and transfer states;
- understand what an application developer needs from Identity Hub;
- choose policy patterns for common application use cases;
- decide whether to use, deploy, or implement a data plane;
- build an application that is itself the data plane;
- operate the application safely with secrets, retries, observability, and environment-specific configuration.

## Chapters

| # | Chapter | What you will learn |
|---|---|---|
| 1 | [What You Are Building](./what-you-are-building/) | The application roles: provider automation, consumer automation, backend integration, and data serving. |
| 2 | [What You Receive from the Platform](./platform-handoff/) | The endpoints, credentials, identifiers, and profile information your application uses. |
| 3 | [Application Architecture](./application-architecture/) | How the app, Management API, Identity Hub, data plane, and backend systems fit together. |
| 4 | [Publishing Data](./publishing-data/) | Assets, data addresses, policies, and contract definitions. |
| 5 | [Consuming Data](./consuming-data/) | Catalog requests, offer selection, contract negotiation, transfer initiation, and retrieval. |
| 6 | [Working with the Management API](./management-api/) | JSON-LD, ODRL, resource groups, async state machines, polling, and errors. |
| 7 | [Working with Identity Hub](./identity-hub/) | DIDs, credentials, status checks, and what stays outside application scope. |
| 8 | [Policy Design for Applications](./policy-design/) | Common policy patterns and how application behavior should align with them. |
| 9 | [Data Plane Architecture](./data-plane-architecture/) | Control plane vs. data plane, Data Plane Signaling, and transfer options. |
| 10 | [Build or Deploy a Data Plane](./build-or-deploy-data-plane/) | Registering, operating, and implementing standalone data planes. |
| 11 | [Application as Data Plane](./application-as-data-plane/) | How a domain app can implement Data Plane Signaling and serve data directly. |
| 12 | [Deployment and Operations](./deployment-and-operations/) | Runtime configuration, token handling, retries, observability, and support boundaries. |
| 13 | [End-to-End Example](./end-to-end-example/) | A complete TowerWorks flow from consumed certificate to published dossier and transfer. |

## What this path does not cover

This path is not a complete API reference, a production-hardening checklist, or a governance manual. It explains how to build applications against dataspace platform surfaces. For exact endpoint details, use the upstream EDC documentation and samples for your deployed version. For trust-framework and credential-schema decisions, use [Design Trust, Credentials, and Dataspace Profiles](../trust-and-profiles/).
