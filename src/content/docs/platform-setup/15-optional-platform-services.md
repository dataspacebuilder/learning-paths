---
title: "Chapter 15: Optional Platform Services"
description: "Issuer Service, federated catalog, onboarding frontends, and other services that may turn a baseline deployment into a broader offering."
---

The baseline platform needs Control Plane, Identity Hub, provisioning automation, infrastructure, and at least one way to transfer data. Many real offerings add optional services around that baseline.

Add them because they solve a clear operating or user problem, not because every dataspace must contain every component.

## Issuer Service

If the platform or dataspace authority issues verifiable credentials, you may operate the **Issuer Service**.

The service can support:

- credential definitions and schemas;
- issuance workflows;
- holder registration;
- credential status and revocation support;
- integration with onboarding automation;
- multiple credential types for different roles or certifications.

There are three common models:

| Model | Description |
|---|---|
| Operator-run issuer | The platform operator runs the Issuer Service on behalf of the dataspace authority. |
| External issuer | The dataspace authority, trust framework, or another organization operates the issuer. The platform integrates with it. |
| Multiple issuers | Different credentials come from different trusted issuers, such as membership, lab accreditation, or compliance evidence. |

The choice is a governance decision as much as a deployment decision. The platform path covers how the service fits operationally. Credential schema design and trust framework decisions belong in [Design Trust, Credentials, and Dataspace Profiles](../trust-and-profiles/).

## Federated Catalog

Participants can query each other's catalogs directly over DSP. That is enough when they know which provider to ask.

A **Federated Catalog** adds search convenience for larger ecosystems. It can crawl participant catalogs into a queryable cache so users and applications can discover offers across many providers.

Consider it when:

- participants do not know all possible providers;
- the dataspace has many providers and offers;
- portal search is a key user experience;
- discovery should work without manually entering every DSP endpoint.

Operating a federated catalog requires decisions about crawl scope, crawl frequency, access control, cache freshness, and visibility of restricted offers.

## Onboarding frontend

An onboarding frontend collects applicant information and guides organizations through joining a dataspace.

It may support:

- organization registration;
- evidence uploads;
- agreement acceptance;
- approval workflows;
- status tracking;
- handoff generation after provisioning;
- support escalation.

Keep legal approval separate from technical provisioning. A frontend can automate both, but the states should remain distinct.

## Policy and asset templates

A platform can provide templates for common publishing patterns:

- member-only document access;
- approved-customer access;
- accredited-lab-only offers;
- summary data for analytics providers;
- restricted evidence packs for regulators or manufacturers.

Templates reduce errors, but they should not hide the policy meaning. The provider still needs to understand who can access the data.

## Example and sandbox environments

A serious platform offering benefits from non-production environments:

| Environment | Purpose |
|---|---|
| Local sandbox | Developer learning, demos, and quick validation. |
| Shared test dataspace | Integration testing among participants. |
| Staging platform | Operator testing before production changes. |
| Conformance environment | Validates that participants meet profile expectations. |

These environments should use clearly separate credentials, endpoints, and data. Do not let pilot secrets or test credentials bleed into production.

## Add services gradually

A good implementation order is:

1. baseline connector and identity services;
2. provisioning automation;
3. customer handoff and API documentation;
4. minimal data-plane capability;
5. observability;
6. portal or onboarding UI;
7. issuer integration;
8. federated discovery;
9. domain-specific applications and richer data-plane portfolio.

Each optional service adds value, but also adds operational responsibility.
