---
title: "Chapter 13: End-to-End Example"
description: "Walk through a complete TowerWorks application flow from consumed certificate to published dossier and transfer."
---

This chapter ties the path together with one concrete flow.

TowerWorks Evidence Bridge needs to assemble and publish the `TS-42` tower-section dossier. The dossier depends on GreenSteel's `GS-87` mill certificate. NorthSea Wind later consumes the completed dossier.

## Cast and systems

| Actor or system | Role in the example |
|---|---|
| TowerWorks Evidence Bridge | The dataspace application you are building. |
| TowerWorks Control Plane | Publishes offers, requests catalogs, negotiates contracts, coordinates transfers. |
| TowerWorks Identity Hub | Provides TowerWorks DID and credentials. |
| TowerWorks document system | Stores the released dossier. |
| GreenSteel | Provides the `GS-87` steel mill certificate. |
| NorthSea Wind | Consumes the `TS-42` tower-section dossier. |
| WindData Alliance | Defines membership credentials and profile rules. |

## Step 1: validate application startup

Evidence Bridge starts and checks its handoff configuration:

1. load participant context `towerworks-ctx-001`;
2. request a token with `management-api:read management-api:write`;
3. call the Management API health or read endpoint;
4. call Identity Hub to confirm TowerWorks DID;
5. check that the WindData membership credential is active;
6. confirm the selected data-plane mode is available.

If any check fails, the app does not start automation.

## Step 2: consume GreenSteel certificate

The TowerWorks backend says dossier `TS-42` requires steel batch `GS-87`.

Evidence Bridge:

1. requests GreenSteel's catalog;
2. filters for asset metadata matching `GS-87` and `steel-mill-certificate`;
3. checks that the policy offer is an approved template;
4. starts contract negotiation;
5. stores the negotiation ID;
6. polls until the negotiation is finalized;
7. stores the contract agreement ID;
8. starts a transfer;
9. retrieves the certificate through the data-plane mechanism;
10. attaches the certificate to the `TS-42` backend record.

If negotiation fails because TowerWorks lacks a credential, the application marks the dossier blocked and shows the missing trust requirement.

## Step 3: publish the TowerWorks dossier

After engineering and quality approve the dossier, Evidence Bridge publishes it.

It creates or updates:

- asset `towerworks:asset:ts-42-dossier`;
- policy `policy:winddata-members-use` or a stricter product-line policy;
- contract definition `contractdef:ts-42-dossier`.

The asset data address points to the data-plane mode:

| Data-plane mode | Data address shape |
|---|---|
| Managed HTTP | Reference to an HTTP/object-storage source supported by the platform data plane. |
| Standalone data plane | Reference understood by TowerWorks' registered data plane. |
| Application as data plane | Domain reference such as `type=TowerWorksDossier`, `dossierId=TS-42`. |

Now eligible consumers can discover the offer.

## Step 4: NorthSea Wind negotiates access

NorthSea Wind's application requests TowerWorks' catalog and sees the `TS-42` offer if its credentials satisfy the access policy.

NorthSea negotiates the offer. TowerWorks Control Plane evaluates policy and finalizes an agreement if the requirements are met.

Evidence Bridge does not have to approve every protocol message. It may still observe the agreement or receive a transfer signal depending on the data-plane model.

## Step 5: serve the dossier

If Evidence Bridge is the data plane, the serving flow is:

1. Control Plane sends a start signal to Evidence Bridge;
2. Evidence Bridge validates the transfer context;
3. Evidence Bridge checks that dossier `TS-42` is still released;
4. Evidence Bridge generates or retrieves the approved export;
5. Evidence Bridge streams the data to NorthSea or exposes a controlled pull endpoint;
6. Evidence Bridge records transfer ID, agreement ID, recipient DID, dossier ID, and version;
7. Evidence Bridge reports completion or failure.

If a standalone or managed data plane is used, Evidence Bridge may instead receive status and audit events while the data plane serves the bytes.

## Step 6: handle updates

Later, TowerWorks releases a new dossier version.

Evidence Bridge should:

- update asset metadata with the new version;
- update backend data address or domain reference if needed;
- keep or revise the policy;
- signal eligible consumers if the platform or application supports notifications;
- require new negotiation if policy or version rules require it;
- preserve audit history for the previous version.

Do not overwrite history so completely that you cannot explain which version was transferred under which agreement.

## Minimal workflow state

A practical application stores a workflow record like this:

```text
workflow: build TS-42 dossier
participant: towerworks-ctx-001
required evidence:
  - provider: GreenSteel
    asset: greensteel:asset:gs-87-certificate
    negotiation: 9f2e...
    agreement: 3fb0...
    transfer: 41aa...
    backend attachment: cert-7781
published offer:
  asset: towerworks:asset:ts-42-dossier
  policy: policy:winddata-members-use
  contract definition: contractdef:ts-42-dossier
  dossier version: 2026-06-01
```

The exact schema is up to your application. The important thing is to connect business state with dataspace state.

## What this example showed

The application did three things:

1. **Consumed data** from GreenSteel under policy control.
2. **Published data** from TowerWorks under policy control.
3. **Served data** to NorthSea through a data plane.

That is the heart of building a dataspace application: use the platform APIs for trust, catalog, negotiation, and transfer coordination, then implement the domain behavior that makes the exchange valuable.

## Where to go next

If you need to operate the platform behind these APIs, continue with [Set Up a Dataspace Platform](../platform-setup/).

If your main work is defining credentials, issuers, onboarding rules, and dataspace profiles, continue with [Design Trust, Credentials, and Dataspace Profiles](../trust-and-profiles/).
