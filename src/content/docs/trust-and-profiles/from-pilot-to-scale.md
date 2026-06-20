---
title: "Chapter 11: From Pilot to Scale"
description: "How to mature the trust model without turning every rule into custom code."
---

A pilot trust model can be simple. A scaled trust model must be maintainable.

The challenge is to mature without turning every participant, issuer, policy, and profile into custom integration work.

## Maturity levels

Use the levels as a planning tool, not a strict sequence.

| Level | Trust model shape | Good for | Watch out for |
|---|---|---|---|
| 0. Story and assumptions | Participants are known, trust is mostly manual. | Workshops and demos. | Do not confuse with production governance. |
| 1. Pilot profile | One profile, one issuer, one membership credential, a few policy templates. | Controlled pilot. | Hard-coded partner assumptions can creep in. |
| 2. Operational baseline | Explicit onboarding states, issuer integration, lifecycle rules, support messages. | First real participants. | Manual review and technical provisioning must stay aligned. |
| 3. Credential catalog | Multiple credential types, versioned schemas, status and renewal rules. | More use cases and roles. | Schema sprawl and inconsistent claim names. |
| 4. Multiple issuers | Trust lists, external issuers, delegated issuance, issuer change process. | Ecosystem growth. | Broad issuer trust can create hidden risk. |
| 5. Multi-profile operation | Multiple dataspaces or profile versions with separated protocol and policy contexts. | Platform scale and cross-dataspace participation. | Blurred identity and profile boundaries. |
| 6. Interoperability and conformance | Test environments, profile conformance checks, protocol TCK usage, profile migration rules. | Mature operation. | Governance change becomes a release-management problem. |

A dataspace does not need every level immediately. It needs clarity about which level it is at.

## Start with a narrow profile

For the first WindData production-like pilot, a narrow profile is better than a broad one.

Start with:

- one dataspace profile;
- one membership credential;
- one or two role credentials;
- two or three policy templates;
- one issuer or one issuer integration;
- explicit credential validity and suspension rules;
- manual legal approval plus automated technical provisioning;
- a sandbox environment that uses separate test credentials.

This is enough to prove the trust loop:

```text
approve participant
  → issue credential
  → publish offer under policy
  → present credential
  → negotiate agreement
  → transfer data
  → expire or revoke credential
  → future access changes
```

If the pilot cannot complete that loop, adding more credential types will not help.

## Remove hard-coded relationships

Early pilots often start with named participants:

> GreenSteel shares with TowerWorks and NorthSea Wind.

That is fine for a story. At scale, replace named relationships with credential and policy patterns:

| Pilot shortcut | Scalable pattern |
|---|---|
| Allow TowerWorks by name. | Require fabricator role and program access credential. |
| Allow SafeLoad because everyone knows it. | Require accredited lab credential from accepted issuer. |
| Email operator when GridSight should lose access. | Suspend or revoke analytics provider credential. |
| Copy policy JSON between apps. | Publish versioned policy templates. |
| Store trust-list decisions in a spreadsheet only. | Manage versioned trust-list configuration with governance approval. |

The goal is not to remove human judgment. The goal is to put human decisions into repeatable trust artifacts.

## Add governance change management

Trust artifacts change. Treat them as managed releases.

For each change, define:

- owner;
- reason;
- affected profiles;
- affected credential types;
- affected issuers;
- affected policy templates;
- migration deadline;
- sandbox validation plan;
- communication plan;
- rollback or emergency response.

Examples:

| Change | Impact |
|---|---|
| New `ProgramAccessCredential` | Issuer configuration, policy templates, application messages. |
| Remove issuer from trust list | Negotiations may fail for holders of affected credentials. |
| New DSP profile version | Runtime profile context, endpoints, partner compatibility. |
| Shorter credential validity | Renewal process and participant notifications. |
| New obligation in analytics policy | Consumer approval workflow and downstream application controls. |

Governance changes are product changes. Manage them visibly.

## Build conformance into the lifecycle

Participants need to know whether they meet profile expectations before production interactions fail.

A scaled dataspace should provide:

- sandbox profile and endpoints;
- test issuer or test credential set;
- sample policy templates;
- profile conformance checklist;
- protocol compatibility checks;
- negative test cases for missing or revoked credentials;
- support process for failed conformance.

For protocol-level interoperability, use the relevant Technology Compatibility Kits where available, such as DSP and DCP TCKs. The [Protocols concept](https://dataspacebuilder.github.io/website/docs/concepts/protocols) explains the protocol split at a high level.

## Keep profile documentation close to configuration

A profile should have a human-readable document and machine-usable configuration.

Keep these aligned:

| Human-readable artifact | Machine-usable artifact |
|---|---|
| Profile overview | Platform profile configuration. |
| Credential catalog | Issuer credential definitions. |
| Trust-list policy | Verifier trust-anchor configuration. |
| Policy-template catalog | Management API templates or application configuration. |
| Onboarding workflow | Registration and provisioning workflow states. |
| Lifecycle rules | Issuer status, renewal, and support automation. |

If configuration changes but the profile document does not, participants lose shared meaning. If the document changes but configuration does not, the platform enforces old rules.

## Delegate carefully

Delegation helps scale, but it needs boundaries.

| Delegation | Boundary to define |
|---|---|
| Onboarding provider approves applicants | Which membership criteria it may evaluate. |
| External issuer issues credentials | Which credential types and claims it may issue. |
| Platform operator runs issuer | Whether it acts on behalf of the authority and under which process. |
| Application team applies policy templates | Which templates it may use for which asset classes. |
| Participant self-hosts connector | Which profile and conformance checks it must satisfy. |

Delegation without clear scope turns into uncontrolled trust expansion.

## Plan for offboarding and incidents

Scaled trust models need unhappy paths.

Design before they happen:

- participant suspension;
- credential revocation;
- issuer compromise;
- policy violation;
- schema error discovered after issuance;
- wrong credential delivered to a holder;
- profile version rollback;
- participant disputes a failed verification;
- data was transferred before a trust issue was discovered.

For each incident type, define who can act, which systems change, who is notified, and how future access is affected.

## Keep the path boundaries clear

At scale, trust decisions touch every other path:

| Concern | Learning path |
|---|---|
| Why the trust model matters in the story | [A Dataspace Use Case](../use-case/) |
| How profile and issuer decisions become platform configuration | [Set Up a Dataspace Platform](../platform-setup/) |
| How applications apply policy templates and react to credential state | [Build a Dataspace Application](../application/) |
| Which credentials, issuers, policies, and onboarding rules exist | This path |

Do not move every detail into every path. Cross-link and keep responsibilities clean.

## Scale checklist

Before moving beyond a pilot, confirm that you have:

1. a named dataspace profile and version;
2. a credential catalog with owners;
3. schema versions and claim vocabulary;
4. issuer authority matrix;
5. trust-list distribution process;
6. onboarding states and approval responsibilities;
7. credential lifecycle rules;
8. policy-template catalog;
9. sandbox and conformance process;
10. incident and offboarding procedures;
11. profile change-management process;
12. participant-facing documentation.

A mature dataspace trust model is not the largest one. It is the one participants can understand, implement, verify, and evolve without breaking trust every time the ecosystem grows.
