---
title: "Chapter 9: Updates and Notifications"
description: "How providers signal that data changed while keeping catalog, contract, and transfer controls in place."
---

Product information does not stay still.

GreenSteel improves the low-carbon production route for GS-87. The declared carbon intensity drops from 1.20 to 0.95 tCO₂e per tonne, and GreenSteel issues a new version of the steel mill certificate.

That update matters downstream. TowerWorks used GS-87 to fabricate TS-42. NorthSea Wind uses TS-42 in the NSW-15 turbine. GridSight monitors material, carbon, and compliance indicators. If those participants keep using the old certificate, the product record becomes stale.

The question is not only how to share data once. It is how to keep a network in sync when the source changes.

## GreenSteel updates the source

GreenSteel replaces or versions the certificate in its own environment. It updates the asset metadata in its catalog so consumers can see that a newer version exists.

The new certificate still belongs to GreenSteel. The policy still applies. Consumers do not automatically receive the document just because it changed.

Instead, GreenSteel sends a notification.

## A notification is a signal, not the document

A notification can say:

> A new version of the GS-87 steel mill certificate is available.

It does not need to include the PDF. It should not bypass the normal access decision.

The notification tells eligible consumers that something changed. Consumers can then follow the same flow as before: check the catalog, negotiate if needed, and retrieve the new version from the provider's data plane.

This keeps the layers separate.

| Layer | What it carries |
|---|---|
| **Notification** | A signal that something changed. |
| **Catalog** | Metadata about what is available and under what terms. |
| **Contract negotiation** | The access decision for a specific offer. |
| **Transfer** | The controlled movement of the actual data. |

The notification improves awareness. It does not replace authorization.

## Updates can cascade without becoming one central workflow

TowerWorks receives the signal that GreenSteel's certificate changed. It retrieves the new certificate through the normal dataspace flow and updates the TS-42 tower-section dossier if the change affects its own record.

TowerWorks can then signal that its tower-section dossier has a new version.

NorthSea Wind and GridSight react according to their own needs and permissions.

```text
GreenSteel updates GS-87 certificate
        │
        ├── notifies TowerWorks
        │        │
        │        └── TowerWorks updates TS-42 dossier
        │                 │
        │                 ├── notifies NorthSea Wind
        │                 └── notifies GridSight if eligible
        │
        └── notifies other eligible consumers directly
```

There is no single central orchestrator that rewrites every participant's records. Each participant remains responsible for its own data and its own reaction to changes.

## Not everyone receives every signal

Notifications should follow the same trust model as the rest of the dataspace.

If a participant is not allowed to know that a restricted document exists, it should not receive a detailed update notification about that document. If a participant can see an offer but cannot retrieve the data without an additional credential, the notification should not grant access by itself.

The exact notification design depends on the implementation and governance rules, but the principle is stable:

> Signals should make authorized consumers aware of change without leaking data or bypassing policy.

## Why this is better than resending files

With email, the update process often means sending another attachment and hoping it reaches the right people. Old copies remain in folders. Some recipients miss the message. Others forward the new file to places the provider does not know about.

With a dataspace, the provider keeps one authoritative publication point. Consumers learn that a new version exists and retrieve it under the current policy.

That does not automatically solve every records-management problem. Consumers may still store copies they are allowed to keep. But the path to the current source is clear, and future access follows the current trust rules.
