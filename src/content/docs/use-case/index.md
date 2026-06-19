---
title: "A Dataspace Use Case"
description: "A story-first introduction to dataspaces through a cross-company product information sharing scenario."
---

This learning path explains dataspaces through one fictional but realistic use case.

A group of manufacturing companies needs to share product documents across company boundaries: material certificates, component documentation, independent test reports, product-passport evidence, and analytics inputs. They do not want to email uncontrolled copies, maintain one portal per partner, or build a new integration for every relationship.

Instead, they use a dataspace. Each company keeps control of its own data, publishes descriptions of what it can share, and lets authorized partners discover, negotiate, and retrieve data through a shared protocol.

## Who this path is for

Start here if you want to understand what a dataspace is before you deploy infrastructure or write code.

This path is for:

- newcomers to dataspaces;
- decision makers evaluating whether the model fits their problem;
- product owners and business architects;
- technical architects who need the end-to-end picture;
- developers, operators, and governance teams who want shared context before going deeper.

You do not need prior knowledge of Eclipse Dataspace Components, the Dataspace Protocol, decentralized identifiers, verifiable credentials, ODRL policies, control planes, or data planes.

## What you will understand

By the end of the path, you will be able to explain:

- why email, portals, and bilateral API integrations do not scale well for cross-organization data sharing;
- how participants publish data without sending it to a central repository;
- how consumers discover data and negotiate access;
- why credentials and policies matter;
- how one company can be both a data consumer and a data provider;
- how updates, notifications, expiration, and revocation change access over time;
- when a dataspace approach is useful, and when it is probably unnecessary.

## Chapters

| # | Chapter | What you will learn |
|---|---|---|
| 1 | [The Problem](./the-problem/) | Why product-document sharing becomes brittle across many partners. |
| 2 | [The Companies](./the-companies/) | The participants in the story and the roles they play. |
| 3 | [How a Dataspace Works](./how-a-dataspace-works/) | The basic rules: publish, discover, negotiate, transfer, and stay in control. |
| 4 | [Provider Publishes Data](./provider-publishes-data/) | How the first company makes a document available without sending it anywhere. |
| 5 | [Consumer Discovers and Negotiates](./consumer-discovers-and-negotiates/) | How another company finds the offer, proves eligibility, and receives access. |
| 6 | [Consumer Becomes Provider](./consumer-becomes-provider/) | Why provider and consumer are roles, not fixed company types. |
| 7 | [Trust Enters the Picture](./trust-enters-the-picture/) | How credentials, issuers, and trusted evidence shape access decisions. |
| 8 | [Multiple Consumers and Use Cases](./multiple-consumers-and-use-cases/) | How the same published data can support different downstream needs. |
| 9 | [Updates and Notifications](./updates-and-notifications/) | How changes are signaled without bypassing access control. |
| 10 | [Trust Changes](./trust-changes/) | What happens when credentials expire, access is revoked, or policies tighten. |
| 11 | [What We Built](./what-we-built/) | How the full story maps to dataspace concepts. |
| 12 | [Is a Dataspace Right for You?](./is-a-dataspace-right-for-you/) | A practical checklist for deciding whether this model fits your problem. |

## What this path does not cover

This path does not teach API calls, deployment steps, production hardening, or policy syntax in detail. It gives you the mental model first. Later paths can then explain how to operate the platform, build applications, and design the trust model.
