---
title: "Chapter 1: The Problem"
description: "Why ordinary document sharing breaks down when many companies need controlled access to changing product information."
---

LumenDrive Motors is preparing a new electric vehicle model for market. Before the vehicle can be approved, sold, serviced, and reported on, LumenDrive needs evidence from the companies upstream in its supply chain.

The battery housing uses a specific alloy. That alloy has a material certificate. The housing itself has component documentation. An independent lab has issued a test report. Later, analytics partners may need selected facts from the same document chain to monitor risk and compliance.

The request sounds simple: send us the product information we need.

In practice, that request turns into a coordination problem.

## The usual ways do not scale

The first answer is email. A supplier attaches a PDF, someone forwards it, someone else stores a copy, and the document starts living in several inboxes and shared folders. That works until the certificate changes, the recipient list is incomplete, or nobody can prove which copy is current.

The second answer is a portal. A larger customer asks every supplier to upload documents into its own system. That helps the customer, but it pushes complexity onto suppliers. A mid-size supplier can end up with dozens of customer portals, each with its own login, template, naming convention, and upload process.

The third answer is a direct API integration. This can be powerful when two companies have a stable, high-volume relationship. But every new partner means another project: authentication, data mapping, access rules, monitoring, maintenance, and change management. When one side changes its API, the integration breaks until both sides coordinate a fix.

All three approaches share the same weakness: every relationship becomes its own special case.

## The trust problem is just as important as the data problem

The documents are not all public. A material certificate may be available to qualified customers. A test report may be available only to active consortium members. A component specification may be restricted to manufacturers using the component in an approved product line.

So the question is not only:

> Where is the file?

It is also:

> Who is asking, what are they allowed to do, and what proof do they have?

If every supplier answers those questions differently, the ecosystem becomes hard to govern. One supplier relies on email history. Another uses portal accounts. A third asks for a purchase-order number. A fourth requires a certificate. None of those choices is wrong in isolation, but together they create a patchwork of trust rules.

## Updates make the patchwork worse

Product information changes.

A supplier updates a material certificate after improving the recycled content of an alloy. A test lab corrects a report. A component maker releases a new version of an assembly specification. A consortium suspends a participant's membership. A policy changes because a document becomes more sensitive.

With email, old copies remain in circulation. With portals, every portal needs its own update. With direct integrations, each integration needs to handle change events in a compatible way.

The result is a familiar pattern:

- each new partner creates a new connection;
- each connection has its own access model;
- each document exists in too many uncontrolled copies;
- each update relies on manual coordination;
- each trust decision is hard to verify across the whole network.

## What would have to change

The companies do not need one giant shared database. They need a shared way to interact while each company keeps control of its own systems.

A better model would let a company:

1. publish a description of data it can share;
2. define the policy that controls access;
3. let authorized partners discover the offer;
4. negotiate access automatically;
5. transfer the data from the owner's system;
6. signal updates without sending uncontrolled copies to everyone.

That is the role of a dataspace.

A dataspace does not remove the need for business agreements, governance, or careful implementation. It gives the participants a common pattern for data sharing so that every new partner does not require a new one-off integration.

The rest of this path follows one supply-chain story to show how that pattern works.
