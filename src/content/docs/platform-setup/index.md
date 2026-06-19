---
title: "Set Up a Dataspace Platform"
description: "Platform path for deploying managed dataspace services and provisioning participants."
---

## Who This Is For

You are a developer at a cloud service provider and your job is to set up an Eclipse
Dataspace Components as-a-Service (EDCaaS) offering. You need to deploy a set of
components, provision dataspace participants for your customers, and hand them the
endpoints they need to operate.

You do not need to understand what a dataspace is in detail. You need to know what to
deploy, how to provision participants, and what to give your customers.

## What You Are Building

Your EDCaaS platform lets companies participate in dataspaces without running their own
control plane or identity infrastructure. You host the shared components. Your customers
get API endpoints to manage their assets, policies, and contracts.

```
┌─────────────────────────────────────────────────────┐
│  Your EDCaaS Platform                               │
│  ┌────────────────────────────────────────────┐     │
│  │  EDC Virtual Connector                     │     │
│  │  Control Plane · Identity Hub              │     │
│  └────────────────────────────────────────────┘     │
│                                                     │
│  ┌────────────────────────────────────────────┐     │
│  │  Connector Fabric Manager (CFM)            │     │
│  │  Tenant Mgr · Provision Mgr · Agents       │     │
│  └────────────────────────────────────────────┘     │
│                                                     │
│  ┌────────────────────────────────────────────┐     │
│  │  Infrastructure                            │     │
│  │  PostgreSQL · IDP · Secret Store · NATS    │     │
│  └────────────────────────────────────────────┘     │
└──────────────────────┬──────────────────────────────┘
                       │
              Data Plane Signaling
                       │
              ┌────────┴────────┐
              │  Customer       │
              │  Data Plane     │
              └─────────────────┘
```

The data plane runs outside the core stack. It can be hosted on the customer's own
infrastructure or offered as a separate service by the CSP. Either way, it connects
to the Control Plane via the Data Plane Signaling protocol. This separation is
intentional — data routing stays independent of the control plane. Data planes are
typically set up by system integrators (see the [System Integration](../system-integration/) learning path).

## Chapters

| # | Chapter | What you'll learn |
|---|---------|-------------------|
| 1 | [Prerequisites](./prerequisites/) | Infrastructure you need before deploying |
| 2 | [EDC Services](./edc-services/) | Control Plane and Identity Hub in virtual mode |
| 3 | [Connector Fabric Manager](./connector-fabric-manager/) | Tenant Manager and Provision Manager |
| 4 | [Activity Agents](./activity-agents/) | The workers that execute provisioning |
| 5 | [Identity Provider Setup](./identity-provider-setup/) | JWT claims, roles, and access control |
| 6 | [Onboarding Design](./onboarding-design/) | Legal vs. technical onboarding, Issuer Service options |
| 7 | [Provisioning Participants](./provisioning-participants/) | Creating tenants and deploying participant profiles |
| 8 | [Customer Handoff](./customer-handoff/) | What you give your customer to operate |
