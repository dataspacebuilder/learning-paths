---
title: "Chapter 10: Build or Deploy a Data Plane"
description: "Register, operate, and implement a standalone data plane for participant applications."
---

A standalone data plane is a service that handles transfer signaling and data movement outside your business application.

Your application may only need to register it and publish compatible data addresses. Or your team may build and operate the data plane itself.

## When a standalone data plane fits

Use a standalone data plane when:

- many applications share the same transfer capability;
- data can be served through a common protocol such as HTTP or S3;
- transfer logic is generic;
- the platform or participant wants a reusable service boundary;
- operations teams prefer to scale transfer infrastructure separately.

For example, TowerWorks might use a standalone HTTP data plane for released PDF dossiers stored in object storage.

## Register the data plane

The Control Plane needs to know where to send signaling messages and which transfer types the data plane supports.

```http
POST {MGMT}/dataplanes
Authorization: Bearer {token}
Content-Type: application/json
```

```json
{
  "@context": ["https://w3id.org/edc/connector/management/v2"],
  "@type": "DataPlaneInstance",
  "url": "https://dp.towerworks.example/api/control/v1/dataflows",
  "allowedSourceTypes": ["HttpData"],
  "allowedTransferTypes": ["HttpData-PULL"]
}
```

Exact registration payloads vary by version and data plane implementation. The important idea is stable: register capabilities and a control endpoint.

## What the data plane must do

A data plane needs to:

1. receive start, suspend, and terminate signals from the Control Plane;
2. validate the signaling request;
3. map the asset data address to an allowed backend source;
4. authorize the consumer's data access according to the transfer context;
5. move or expose the data using the selected transfer pattern;
6. report transfer state and errors;
7. log enough information for audit and troubleshooting.

The data plane should not allow arbitrary backend access just because a URL was present in an asset.

## Use SDKs where available

You do not need to implement protocol mechanics from scratch. Data Plane SDKs can handle signaling, state management, and token validation patterns so your implementation can focus on the actual data source.

| Language | Repository |
|---|---|
| Go | [dataplane-sdk-go](https://github.com/eclipse-dataplane-core/dataplane-sdk-go) |
| Java | [dataplane-sdk-java](https://github.com/eclipse-dataplane-core/dataplane-sdk-java) |
| Rust | [dataplane-sdk-rust](https://github.com/eclipse-dataplane-core/dataplane-sdk-rust) |
| .NET | [dataplane-sdk-net](https://github.com/eclipse-dataplane-core/dataplane-sdk-net) |

Use the SDK version that matches your Control Plane and Data Plane Signaling version.

## Backend integration

A data plane usually needs backend adapters.

| Backend | Design consideration |
|---|---|
| Object storage | Avoid exposing broad bucket credentials; use scoped references or signed access. |
| HTTP APIs | Validate that asset data addresses cannot call arbitrary internal URLs. |
| File systems | Prevent path traversal and control file permissions. |
| Databases | Prefer query-specific endpoints over arbitrary SQL. |
| Streams | Define lifetime, backpressure, and consumer authorization clearly. |
| Industrial systems | Place the data plane near the system and isolate operational networks. |

The safest data address is often not a raw backend credential. It is a reference the data plane resolves through its own controlled configuration.

## Operational checklist

Before using a data plane in a real workflow, verify:

- Control Plane can reach the data plane control endpoint;
- consumers can reach the transfer endpoint if using pull;
- TLS certificates are valid;
- token validation works;
- allowed source and transfer types match published assets;
- backend credentials are stored in a secret manager;
- transfer logs include transfer ID, asset ID, and participant context;
- large files and timeouts are handled;
- failed transfers are reported and visible;
- scaling limits are understood.

## Application responsibilities with standalone data planes

Even if a standalone data plane moves the bytes, your application still owns:

- creating assets with compatible data addresses;
- choosing policies;
- tracking which backend object an asset represents;
- initiating transfers when consuming;
- storing or processing received data;
- responding to business-level errors.

A standalone data plane reduces transfer implementation work. It does not remove application responsibility for the workflow.
