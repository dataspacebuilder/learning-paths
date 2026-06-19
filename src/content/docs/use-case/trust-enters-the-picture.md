---
title: "Chapter 7: Trust Enters the Picture"
description: "How credentials, issuers, and independent evidence make access decisions more reliable than portal accounts or email history."
---

So far, the story has used one simple trust rule: active TrustGrid members may access certain offers.

That is enough for some documents, but not for every situation. Product information often needs stronger evidence. A company may need to prove that it is a current member, that it has a specific role, that it is accredited for a task, or that a document came from an independent source.

This is where credentials and issuers become important.

## QuantisSeal adds independent evidence

FerroLink sends battery housing BH-2026 to **QuantisSeal Labs** for testing. QuantisSeal runs impact, thermal, and environmental checks and produces a test report.

The test report matters because QuantisSeal is not the supplier and not the vehicle manufacturer. It is an independent lab. LumenDrive can use the report as neutral evidence when it assembles compliance documentation.

QuantisSeal publishes the report through the dataspace in the same way VeloForge and FerroLink published their documents:

1. the report stays in QuantisSeal's environment;
2. QuantisSeal creates an asset description;
3. QuantisSeal attaches an access policy;
4. the offer appears in QuantisSeal's catalog.

The publication pattern is the same. The trust meaning is different.

## Credentials carry trusted claims

A credential is a verifiable statement issued by a trusted authority.

In this story, TrustGrid can issue a credential that says a company is an active dataspace member. A different authority could issue a credential that says a laboratory is accredited. A manufacturer could issue a service-partner credential to approved repair companies. A regulator could issue a legal-entity credential.

The exact credential types depend on the dataspace. The important idea is that policies can refer to credentials instead of relying on informal trust.

For example:

| Business rule | Credential-based expression |
|---|---|
| Only active TrustGrid members may access basic product documents. | Require a valid TrustGrid membership credential. |
| Only accredited labs may publish official test reports. | Require a valid lab-accreditation credential. |
| Only approved vehicle manufacturers may access detailed component specifications. | Require a role or customer-relationship credential. |
| Suspended participants must not receive new data. | Reject revoked or expired credentials. |

The policy does not need to know every future company in advance. It can ask for a kind of proof.

## The issuer does not have to serve the data

TrustGrid may issue membership credentials, but it does not serve VeloForge's certificate or FerroLink's component documentation. An accreditation body may issue a lab credential, but it does not serve QuantisSeal's test report.

Issuing trust and serving data are separate responsibilities.

That separation keeps the model flexible:

- a consortium can define who counts as a member;
- a regulator can define legal identity;
- a lab authority can define accreditation;
- each provider can decide which credentials its offers require;
- each provider still controls its own data plane.

## Trust is checked when it matters

Credentials are useful because they can be checked during catalog access, contract negotiation, and transfer authorization.

If FerroLink has a valid membership credential, VeloForge's policy can allow the negotiation. If NebulaFlow's membership is suspended later, a future negotiation can fail without VeloForge manually editing a partner list.

This is the shift from account-based sharing to credential-based sharing:

- an account says someone has access inside one system;
- a credential says something verifiable about an organization across systems.

The dataspace uses those verifiable claims to make policy decisions consistently between independent participants.

## What trust adds to the story

The use case now has three kinds of value:

1. **Data value** — documents can be discovered and retrieved.
2. **Source value** — documents come from the participant responsible for them.
3. **Trust value** — access decisions depend on credentials that can expire, be renewed, or be revoked.

That third value is what lets the network scale beyond a set of friendly companies exchanging files manually.
