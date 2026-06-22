---
title: "Chapter 5: Consuming Data"
description: "Discover offers, negotiate contracts, start transfers, and route received data into participant systems."
---

Consuming data starts with a business need.

TowerWorks needs GreenSteel's `GS-87` steel mill certificate before it can complete the `TS-42` tower-section dossier. The application should not ask an engineer to download the certificate from a portal. It can discover the offer, negotiate access, and transfer the document through the dataspace.

## The consuming flow

```text
Request catalog from provider
        │
        ▼
Choose a suitable offer
        │
        ▼
Start contract negotiation
        │
        ▼
Poll until finalized or failed
        │
        ▼
Start transfer process
        │
        ▼
Receive or retrieve data and store it in the backend
```

Catalog, negotiation, and transfer calls are made to your participant's Management API. Your Control Plane then communicates with the provider over DSP.

## Step 1: request the provider catalog

```http
POST {MGMT}/catalog/request
Authorization: Bearer {token}
Content-Type: application/json
```

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "CatalogRequest",
  "counterPartyId": "did:web:ih.platform.example:greensteel",
  "counterPartyAddress": "https://cp.platform.example/api/dsp/greensteel-ctx-001/2025-1",
  "protocol": "dataspace-protocol-http:2025-1",
  "querySpec": {
    "offset": 0,
    "limit": 25,
    "filterExpression": [
      {
        "operandLeft": "productId",
        "operator": "=",
        "operandRight": "GS-87"
      }
    ]
  }
}
```

The result contains datasets and one or more policy offers. The provider decides what the consumer can see. If the catalog is empty, the cause may be missing credentials, restrictive access policy, wrong provider endpoint, or simply no matching asset.

## Step 2: choose an offer

Applications should not automatically negotiate every offer they see.

Check:

- asset metadata matches the business need;
- provider identity is expected;
- policy terms are acceptable;
- transfer type is supported;
- version or freshness is acceptable;
- obligations can be honored by the consuming organization.

Save the selected offer policy exactly as returned by the catalog. Negotiation usually requires the offer ID and policy content to match the provider's offer.

## Step 3: start negotiation

```http
POST {MGMT}/contractnegotiations
Authorization: Bearer {token}
Content-Type: application/json
```

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "ContractRequest",
  "counterPartyId": "did:web:ih.platform.example:greensteel",
  "counterPartyAddress": "https://cp.platform.example/api/dsp/greensteel-ctx-001/2025-1",
  "protocol": "dataspace-protocol-http:2025-1",
  "policy": {
    "@type": "Offer",
    "@id": "{offer-id-from-catalog}",
    "assigner": "did:web:ih.platform.example:greensteel",
    "target": "greensteel:asset:gs-87-certificate",
    "permission": [
      { "action": "use" }
    ]
  }
}
```

Use the actual policy offer returned by the catalog. Do not reconstruct it from memory unless your API client preserves all required fields.

## Step 4: poll negotiation state

Negotiation is asynchronous.

```http
GET {MGMT}/contractnegotiations/{negotiationId}
Authorization: Bearer {token}
```

Your application should handle states such as requested, in progress, finalized, declined, or terminated. Exact state names depend on the deployed version and protocol flow.

When negotiation finalizes, store the `contractAgreementId`. You need it to initiate transfer.

## Step 5: start transfer

```http
POST {MGMT}/transferprocesses
Authorization: Bearer {token}
Content-Type: application/json
```

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "TransferRequest",
  "counterPartyId": "did:web:ih.platform.example:greensteel",
  "counterPartyAddress": "https://cp.platform.example/api/dsp/greensteel-ctx-001/2025-1",
  "protocol": "dataspace-protocol-http:2025-1",
  "assetId": "greensteel:asset:gs-87-certificate",
  "contractId": "{contract-agreement-id}",
  "transferType": "HttpData-PULL",
  "dataDestination": {
    "@type": "DataAddress",
    "type": "HttpProxy"
  }
}
```

The transfer process coordinates data movement. Depending on the data-plane design, your application may receive a proxy endpoint, a pushed file, a stream, or an application-specific callback.

## Step 6: route received data

After transfer starts, your application still has work to do:

- download or receive the data through the selected data-plane mechanism;
- validate content type, size, checksum, schema, or signature if required;
- store it in the correct backend object;
- link it to the contract agreement and transfer process ID;
- record obligations or retention requirements;
- notify users or downstream systems.

The dataspace can authorize access. Your application must still process the data responsibly.

## Retry and idempotency

Catalog requests can be repeated. Negotiations and transfers create state. Design idempotency around your own business keys.

For example:

```text
business key: consume GreenSteel GS-87 certificate for TowerWorks dossier TS-42
negotiation id: generated by Control Plane
agreement id: generated after successful negotiation
transfer id: generated by Control Plane
backend record: evidence attachment in PLM system
```

If the application restarts after negotiation but before transfer, it should resume from stored state rather than creating duplicate negotiations blindly.
