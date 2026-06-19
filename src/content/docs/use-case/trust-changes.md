---
title: "Chapter 10: Trust Changes"
description: "What happens when credentials expire, participants are suspended, policies change, or access needs to be tightened."
---

Real ecosystems are not static. Participants join and leave. Credentials expire. A provider may decide that a document needs stronger protection. A consortium may suspend a member. A regulator may change the evidence required for a claim.

A dataspace should make those changes visible in future access decisions.

## A credential expires

TrustGrid membership credentials have validity periods. That is intentional. Membership should be renewed, not assumed forever.

If NebulaFlow's membership credential expires, its next attempt to negotiate access to a member-only offer can fail. The provider does not need to maintain a separate calendar entry for NebulaFlow. The policy asks for a valid credential, and the expired credential no longer satisfies it.

When NebulaFlow renews its membership and receives a new credential, future negotiations can succeed again if the other policy conditions are met.

## A credential is revoked

Expiration is predictable. Revocation is immediate.

Suppose TrustGrid suspends a participant because it no longer meets the dataspace rules. TrustGrid revokes the participant's membership credential or marks it as no longer valid.

From that point, providers that rely on the membership credential can reject future catalog access, negotiations, or transfers for that participant. The providers do not each need to update a local blocklist for the same basic membership rule.

This is one reason credentials matter. A change at the trusted issuer can affect policy decisions across the dataspace.

## A provider tightens a policy

VeloForge may decide that the ALX88 certificate should no longer be available to every active member. Perhaps the next version contains more sensitive sourcing details.

VeloForge changes the policy from:

> Active TrustGrid membership required.

To:

> Active TrustGrid membership and an approved customer-relationship credential required.

The offer is still published, but fewer consumers can access it. LumenDrive or FerroLink may still qualify. NebulaFlow may not, unless it receives the additional credential or uses a different summary offer designed for analytics.

The important point is that the provider changes the policy on the offer. It does not rebuild every consumer integration.

## A participant leaves the dataspace

If a company leaves TrustGrid, the dataspace authority can stop issuing or renewing its membership credential. Providers may also remove participant-specific offers, rotate access tokens, or end agreements according to the governance rules.

The dataspace model helps with future access. It does not magically erase every copy of data that was already lawfully transferred. If consumers are allowed to retain copies, retention and deletion obligations need to be handled by contracts, governance, technical controls, and the consuming applications.

This distinction is important:

- the dataspace controls discovery, negotiation, and transfer;
- it can make future access reflect current trust;
- it is not a magic remote-delete mechanism for every downstream copy.

## Policies and credentials work together

Trust changes usually involve both sides of the model.

| Change | Who acts | Effect |
|---|---|---|
| Membership expires | Credential issuer and holder | The participant must renew before policies accept the credential again. |
| Membership is revoked | Credential issuer | Policies depending on that credential reject future access. |
| Document becomes more sensitive | Provider | The provider changes the offer policy. |
| New role is required | Dataspace authority or other issuer | A new credential type or claim becomes part of the access rule. |
| Consumer no longer needs data | Consumer and provider | Agreements, subscriptions, and notifications can be ended. |

A dataspace is powerful because these changes can be expressed at the trust and policy layer instead of being hard-coded into every pairwise integration.

## What this step shows

The story now covers the full lifecycle of controlled access:

- a provider publishes data;
- a consumer negotiates access;
- data moves from the source;
- updates are signaled;
- trust conditions change;
- future access reflects the current policy and credential state.

That lifecycle is the practical reason to use a dataspace instead of treating data sharing as a collection of static file transfers.
