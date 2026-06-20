---
title: "Chapter 1: What You Are Building"
description: "Frame the path around a participant application that publishes, consumes, and serves data through a dataspace."
---

A dataspace application is ordinary business software with one important extra responsibility: it uses dataspace APIs to exchange data with other organizations under policy control.

It is not the dataspace platform itself. It does not run the whole trust framework. It does not replace the participant's backend systems. It connects those systems to the dataspace.

## The example application

This path uses **TowerWorks Evidence Bridge** as the example application.

TowerWorks fabricates offshore wind tower sections. For each section, the application needs to:

1. consume GreenSteel's mill certificate for the steel batch used in the section;
2. attach that evidence to TowerWorks' internal dossier;
3. publish the completed `TS-42` tower-section dossier as a dataspace offer;
4. allow NorthSea Wind to discover and negotiate access;
5. serve the dossier only after a valid contract exists;
6. keep the published offer aligned when the dossier changes.

That is a realistic application workload: it combines backend integration, provider behavior, consumer behavior, and data serving.

## Four application roles

A participant application can play one or more roles.

| Role | What the application does | Example |
|---|---|---|
| Provider automation | Publishes assets, policies, and contract definitions. | TowerWorks publishes `TS-42` dossier metadata when a dossier reaches approved status. |
| Consumer automation | Queries catalogs, negotiates contracts, and starts transfers. | TowerWorks retrieves GreenSteel's `GS-87` certificate before releasing its own dossier. |
| Backend integration | Maps dataspace resources to internal systems. | The app maps a dossier in the PLM system to a dataspace asset ID. |
| Data serving | Delivers data after the control plane authorizes a transfer. | The app streams the dossier PDF from TowerWorks' document store. |

Small applications may do one role. Domain applications often do all four.

## What the platform handles

The platform provides the shared dataspace capabilities:

- Management API;
- DSP protocol endpoint;
- identity and credential infrastructure;
- policy evaluation and contract negotiation machinery;
- transfer coordination;
- optional managed data planes;
- participant-context isolation.

Your application uses those capabilities through APIs. It should not connect directly to platform databases, NATS, CFM internals, or another participant's private infrastructure.

## What your application handles

Your application owns the business behavior:

- which backend events trigger asset publication;
- how internal data is mapped to dataspace assets;
- which policy template is used for each offer;
- when to request a catalog from another participant;
- which offers are acceptable for automated negotiation;
- where received data goes inside the customer's systems;
- how transferred data is validated, stored, or displayed;
- what domain-specific logs, alerts, and approvals are needed.

The dataspace platform can enforce technical policy checks. It does not know that a tower-section dossier should only be published after engineering approval. That rule belongs in the application or the customer's business system.

## The main design question

Before writing code, decide which boundary your application should take:

| Boundary | Meaning |
|---|---|
| API client only | The app publishes and consumes through the Management API, but uses a managed or separate data plane for actual transfer. |
| Data plane operator | The app deploys or manages a standalone data plane and registers it with the Control Plane. |
| Application as data plane | The app implements Data Plane Signaling and serves data directly as part of its domain workflow. |

This path covers all three, with special attention to the last model because it is common for domain-specific applications.
