---
title: "Chapter 4: Publishing Data"
description: "Create assets, policies, and contract definitions so other participants can discover and request data."
---

Publishing data means making an offer discoverable. It does not mean uploading all data into a central dataspace store.

For TowerWorks, the application publishes the `TS-42` tower-section dossier. The dossier remains in TowerWorks' document system or behind a data plane. The Control Plane stores metadata, policies, and the contract definition that turns the asset into an offer.

## The publishing flow

```text
Create asset
   │
   ▼
Create or reuse policy definition
   │
   ▼
Create contract definition
   │
   ▼
Eligible consumers can see an offer in the catalog
```

The exact endpoint paths vary by EDC version and platform configuration. In examples, `{MGMT}` means the Management API base URL from your handoff, such as `/api/mgmt/v4/participants/towerworks-ctx-001`.

## Step 1: create an asset

An asset describes what is being offered and where the data plane can find it.

```http
POST {MGMT}/assets
Authorization: Bearer {token}
Content-Type: application/json
```

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@id": "towerworks:asset:ts-42-dossier",
  "@type": "Asset",
  "properties": {
    "name": "TS-42 tower-section dossier",
    "description": "Approved dossier for offshore wind tower section TS-42",
    "productId": "TS-42",
    "documentType": "tower-section-dossier",
    "contentType": "application/pdf",
    "version": "2026-06-01"
  },
  "dataAddress": {
    "@type": "DataAddress",
    "type": "HttpData",
    "baseUrl": "https://evidence.towerworks.example/internal/dossiers/ts-42.pdf"
  }
}
```

The `dataAddress` is interpreted by the data plane. Do not put secrets in it unless your data-plane design explicitly protects them. Prefer references, vault-backed credentials, or backend adapters.

## Step 2: create or reuse a policy definition

A policy definition describes who may see or negotiate the offer.

For example, TowerWorks may allow only active WindData Alliance members to access the dossier.

```http
POST {MGMT}/policydefinitions
Authorization: Bearer {token}
Content-Type: application/json
```

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@id": "policy:winddata-members-use",
  "@type": "PolicyDefinition",
  "policy": {
    "@type": "Set",
    "permission": [
      {
        "action": "use",
        "constraint": {
          "leftOperand": "MembershipCredential.status",
          "operator": "eq",
          "rightOperand": "active"
        }
      }
    ]
  }
}
```

Policy vocabularies and supported constraints are profile-specific. Treat this as an illustrative shape, not a universal credential syntax.

## Step 3: create a contract definition

A contract definition links assets and policies. It is what makes an asset appear as an offer in a catalog for eligible consumers.

```http
POST {MGMT}/contractdefinitions
Authorization: Bearer {token}
Content-Type: application/json
```

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@id": "contractdef:ts-42-dossier",
  "@type": "ContractDefinition",
  "accessPolicyId": "policy:winddata-members-use",
  "contractPolicyId": "policy:winddata-members-use",
  "assetsSelector": [
    {
      "@type": "Criterion",
      "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
      "operator": "=",
      "operandRight": "towerworks:asset:ts-42-dossier"
    }
  ]
}
```

Some deployments use different JSON-LD terms or DTO names for selector criteria. Use the API reference for your deployed EDC version.

## Access policy vs. contract policy

Many examples use the same policy for both fields, but they have different meanings.

| Policy | Used for | Practical effect |
|---|---|---|
| Access policy | Catalog visibility | Determines whether a consumer can see the offer. |
| Contract policy | Negotiation terms | Determines the terms that must be accepted during negotiation. |

For sensitive assets, you might make catalog visibility broad but negotiation stricter, or keep both strict.

## Publish from business events

Do not publish everything just because it exists in a backend system. Publish when a business rule says the data is ready.

For TowerWorks:

1. dossier is created in draft state;
2. engineering approves the dossier;
3. quality signs the release;
4. Evidence Bridge creates or updates the asset;
5. the contract definition makes it discoverable.

If the dossier is withdrawn, the application should suspend the offer, tighten policy, or remove the contract definition according to business rules.

## Publishing checklist

Before considering an asset published, verify:

- asset ID is stable and traceable to a backend object;
- metadata is enough for consumers to choose the offer;
- policy matches the dataspace profile and governance rules;
- contract definition selects only the intended assets;
- data plane can resolve the data address;
- backend authorization is aligned with dataspace authorization;
- logs record who or what published the offer.
