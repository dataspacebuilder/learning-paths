---
title: "Chapter 8: Policy Design for Applications"
description: "Common policy patterns and the application behavior needed to use them safely."
---

Policies are where business intent meets machine-readable access control.

An application does not usually invent the dataspace's trust model. It applies approved policy patterns to the assets it publishes and interprets policy offers when it consumes data.

## What policy design means for an app

For TowerWorks Evidence Bridge, policy design answers questions like:

- Who may see the `TS-42` dossier offer?
- Who may negotiate access?
- Are analytics providers allowed to receive the full dossier or only selected metadata?
- Does NorthSea Wind need a product-line credential?
- Are there obligations after access, such as no onward sharing?
- What happens when a credential expires?

Those choices should come from governance and product rules. The application turns them into repeatable templates.

## Common policy patterns

| Pattern | When useful | Application behavior |
|---|---|---|
| Member-only access | Any active dataspace member may access a general document. | Use a standard membership policy template. |
| Role-based access | Only manufacturers, labs, service partners, or analytics providers may access. | Choose template based on asset class and intended audience. |
| Product-line access | Only participants working on a specific product or project may access. | Include product or project metadata in policy and asset metadata. |
| Accredited-source access | Only accredited labs may publish or access certain evidence. | Check credential availability before publishing or negotiating. |
| Purpose-limited access | Data may be used for compliance, analytics, maintenance, or audit only. | Surface obligations to users and downstream systems. |
| Time-bound access | Access expires after a date or review period. | Track agreement validity and refresh if needed. |

Keep policy templates versioned. A policy used for `TS-42` in June should be traceable later, even if the template changes in July.

## Access policy and contract policy

A contract definition references two policies.

| Policy | Question it answers |
|---|---|
| Access policy | Should this consumer see the offer in the catalog? |
| Contract policy | Can this consumer negotiate these terms? |

For example:

- access policy: any active WindData member can see that a dossier exists;
- contract policy: only turbine manufacturers with `NSW-15` program access can negotiate the full dossier.

Applications should not assume visibility means access. A catalog entry is not the same as a completed contract.

## Policy templates

Represent policy templates as application configuration or database records, not scattered constants.

```text
policy template: winddata.member.use.v1
  description: Active WindData Alliance members may use the asset.
  required credential: WindDataMembershipCredential(status=active)
  action: use
  obligations: none
```

```text
policy template: winddata.analytics.summary.v1
  description: Approved analytics providers may use selected summary data.
  required credentials:
    - WindDataMembershipCredential(status=active)
    - AnalyticsProviderCredential(status=active)
  action: use
  obligations:
    - no onward sharing
    - retain only derived indicators
```

The application can then select a template based on asset class and audience.

## Consuming policy offers

When consuming data, the application must decide whether an offer is acceptable.

Do not negotiate automatically unless the policy is known and allowed. Check:

- action requested;
- constraints;
- obligations;
- provider identity;
- target asset;
- allowed purpose;
- retention or usage restrictions;
- whether the consuming organization can comply.

If an obligation says data may only be used for compliance evidence, do not route it into an analytics data lake unless that is allowed.

## Human approval points

Some flows can be fully automated. Others should pause for approval.

| Flow | Automation recommendation |
|---|---|
| Low-risk recurring certificate retrieval | Automate after policy allow-list is configured. |
| Publishing public metadata under member-only policy | Automate from backend release event. |
| Negotiating high-value commercial data | Require human approval. |
| Accepting new obligations | Require approval from data owner, compliance, or legal role. |
| Changing policy on an existing asset | Require review and audit record. |

The application should make approval state visible. A stalled negotiation waiting for legal approval is different from a failed connector call.

## Do not overpromise enforcement

Some policy conditions can be technically evaluated before access. Some obligations require organizational compliance after data is received.

For example, a provider may express "do not onward-share" as an obligation. The dataspace can record and communicate that obligation, but your application and organization must still enforce it in downstream behavior.

This is why policy design is both technical and organizational.
