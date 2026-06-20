---
title: "Chapter 16: From Baseline to Offering"
description: "A maturity model for growing from a baseline deployment into a complete dataspace service."
---

A dataspace platform can start small. It does not need a portal, federated catalog, issuer service, and every possible data plane on day one.

The important thing is to understand what each maturity step adds and which responsibilities come with it.

## Maturity levels

| Level | What is available | What it is good for | New operator responsibilities |
|---|---|---|---|
| **0. Local sandbox** | Single-node or local cluster, sample participants, test credentials. | Learning, demos, development validation. | Keep separate from production; document limitations. |
| **1. API-only baseline** | Control Plane, Identity Hub, CFM, IDP, secret store, PostgreSQL, NATS, basic data plane option. | Technical pilots and integrator-led onboarding. | Secure endpoints, backups, token setup, provisioning runbooks. |
| **2. Managed onboarding and handoff** | Repeatable onboarding workflow, participant profiles, handoff package, status tracking. | Scaling from one-off setup to repeatable participant onboarding. | Approval integration, customer communication, support process. |
| **3. Portal and observability** | Customer portal, dashboards, logs, metrics, alerts, status views. | Non-API-first customers and operated service support. | UX maintenance, tenant-safe views, monitoring and incident response. |
| **4. Data-plane portfolio** | Managed HTTP/S3/protocol data planes, customer-operated data plane guidance, app-as-data-plane support. | More data types and hybrid industrial deployments. | Capability management, capacity planning, transfer diagnostics. |
| **5. Trust and discovery services** | Issuer integration, federated catalog, policy templates, multi-dataspace profiles. | Larger ecosystems with more participants and credentials. | Governance coordination, trust-list updates, cache freshness, credential lifecycle support. |
| **6. Multi-dataspace service** | Multiple profiles, cells, issuers, portals, customer segments, and support tiers. | Mature platform business or shared industry infrastructure. | Strong change management, SLOs, conformance testing, security operations. |

Use the levels as a planning tool, not a strict sequence. Some dataspaces need issuer integration early. Others can pilot with externally issued credentials and direct catalog queries.

## Baseline target

A practical baseline includes:

- Control Plane and Identity Hub;
- CFM and required agents;
- IDP configuration for admin, provisioner, and participant access;
- PostgreSQL, secret store, NATS, ingress, TLS, and DNS;
- at least one cell and one dataspace profile;
- one test participant flow from tenant creation to handoff;
- one data-plane path for simple transfers;
- basic logs, health checks, and backups;
- documentation for participant integrators.

This baseline lets a participant publish data, another participant discover and negotiate, and a transfer complete under an agreed policy.

## What makes it an offering

A deployment becomes an offering when it is repeatable, supportable, and understandable to customers.

That usually means:

- documented onboarding process;
- predictable handoff package;
- customer-safe portal or API documentation;
- clear operating model for managed, self-hosted, and hybrid participants;
- service status and incident communication;
- monitoring and alerting;
- version and upgrade policy;
- support boundaries for data planes and applications;
- templates for common policies and data-sharing patterns;
- clear governance inputs from the dataspace authority.

The technology is necessary, but the service model is what makes it usable.

## Keep boundaries clear

As the platform grows, do not blur these boundaries:

| Boundary | Why it matters |
|---|---|
| Platform vs. application | The platform provides APIs and protocol capabilities. Applications implement business workflows. |
| Control plane vs. data plane | The Control Plane coordinates trust and transfers. Data planes move data. |
| Operator vs. dataspace authority | The operator runs systems. The authority defines membership, trust, and governance rules. |
| Managed vs. self-hosted | Each participant needs a clear support and responsibility model. |
| Sandbox vs. production | Examples and demos should not be mistaken for hardened production deployments. |

## Recommended next steps

After completing this path:

- application teams should continue with [Build a Dataspace Application](../application/);
- trust and governance teams should define credential schemas, issuer roles, trust lists, and dataspace profile rules;
- platform teams should turn the baseline into runbooks, dashboards, backup procedures, and support playbooks;
- product teams should decide which optional services are needed for the first real participants.

A good dataspace platform starts with a small working path and grows deliberately. Avoid building a large platform before you have validated the participant onboarding flow, handoff, and first end-to-end data exchange.
