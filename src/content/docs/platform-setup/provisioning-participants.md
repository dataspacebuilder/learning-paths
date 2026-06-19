---
title: "Chapter 10: Provision Participants"
description: "Create tenants and participant profiles, then track asynchronous provisioning until the participant is active."
---

Provisioning is the technical act of turning an approved organization into an active dataspace participant on your platform.

It should happen after legal or business onboarding has approved the applicant. The platform does not decide whether TowerWorks may join WindData Alliance. It receives that approval and creates the technical resources TowerWorks needs.

## Before you provision

Make sure these are already in place:

- Control Plane and Identity Hub are deployed and reachable;
- CFM Tenant Manager and Provision Manager are running;
- required activity agents are connected;
- at least one cell exists;
- the relevant dataspace profile exists;
- IDP provisioner credentials work;
- issuer or credential onboarding integration is configured if required;
- the applicant has an approved organization identifier and onboarding record.

## Step 1: create a tenant

A tenant represents the customer organization or organizational unit known to the platform.

```http
POST /api/v1alpha1/tenants
```

```json
{
  "tenantId": "towerworks",
  "displayName": "TowerWorks Fabrication",
  "description": "Fabricates offshore wind tower sections"
}
```

A tenant alone is not yet an active participant. It is the organizational record that participant profiles attach to.

## Step 2: deploy a participant profile

The participant profile binds the tenant to a cell, an identity, and the dataspace profile configuration.

```http
POST /api/v1alpha1/tenants/{tenantId}/participant-profiles
```

```json
{
  "identifier": "did:web:ih.platform.example:towerworks",
  "cellId": "eu-west-managed",
  "dataspaceProfileIds": ["winddata-alliance"]
}
```

The exact payload can vary by CFM version and platform configuration. The important model is stable: the profile says **who** the participant is, **where** it runs, and **which dataspace rules** apply.

## What happens next

After the participant profile is created, CFM starts an asynchronous workflow.

Typical activities:

1. create OAuth2 clients in the IDP;
2. store generated secrets in the secret store;
3. create the participant context in the Control Plane;
4. create the participant context in Identity Hub;
5. create or publish the DID document;
6. register the participant with the issuer or registration service;
7. request initial credentials, such as a membership credential;
8. store or make credentials available through Identity Hub;
9. mark the participant profile active.

## Track status

Provisioning is not complete when the initial API call returns. Poll the participant profile until required activities reach their terminal state.

```http
GET /api/v1alpha1/tenants/{tenantId}/participant-profiles/{profileId}
```

Surface activity state to operators and, where appropriate, to onboarding users.

| State | Meaning |
|---|---|
| `pending` | The activity has not started or is waiting for dependencies. |
| `running` | The agent is executing the activity. |
| `active` | The activity completed successfully. |
| `failed` | The activity could not complete and needs retry, correction, or manual review. |
| `suspended` | The participant or activity is intentionally paused. |

Your exact state names may differ, but the operator experience should make progress and failures clear.

## Validate the participant

Before handoff, validate that:

- participant-scoped tokens can be issued;
- the token contains the expected `participant_context_id`;
- the participant can call its Management API endpoint;
- the participant cannot access another context;
- Identity Hub shows the expected DID;
- required credentials are present or retrievable;
- the DSP endpoint is reachable;
- a simple catalog or self-check flow succeeds;
- monitoring sees the participant context and provisioning activities.

## Changes after provisioning

Provisioning is not a one-time concern. Operators also need flows for:

- adding a participant to another dataspace profile;
- moving a participant to another cell;
- rotating API credentials;
- renewing or reissuing credentials;
- suspending a participant;
- offboarding a participant;
- deleting or archiving tenant records according to policy.

Design those lifecycle operations before the first pilot becomes a production service.
