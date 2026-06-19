---
title: "Chapter 6: Consumer Becomes Provider"
description: "How TowerWorks uses the same dataspace pattern to publish its own tower-section dossier."
---

TowerWorks has now retrieved GreenSteel's GS-87 steel mill certificate. That certificate becomes one input into TowerWorks's own work.

TowerWorks fabricates tower section **TS-42** from the steel. For that tower section, it creates its own dossier: fabrication specifications, welding records, quality evidence, safety information, and references to the material evidence it used.

Now another company needs data from TowerWorks. NorthSea Wind Systems will eventually use TS-42 in the NSW-15 offshore wind turbine and needs the tower-section dossier for compliance and product-passport work.

TowerWorks therefore changes roles. It was just a consumer. Now it becomes a provider.

## The same participant can play both roles

Nothing special happens to TowerWorks's identity when its role changes. It remains the same dataspace participant.

The difference is the action it takes:

- when it requested GreenSteel's certificate, TowerWorks acted as a **consumer**;
- when it publishes the TS-42 dossier, TowerWorks acts as a **provider**.

Provider and consumer are not fixed company categories. They are roles in a particular interaction.

## TowerWorks publishes a tower-section dossier

TowerWorks follows the same provider pattern GreenSteel used.

First, it keeps the TS-42 dossier in its own environment. The files remain under TowerWorks's control.

Second, it describes the dossier as a dataspace asset. The metadata can say that the asset relates to tower section TS-42, includes fabrication and quality documentation, and references GS-87 as an input material.

Third, it defines access policies. TowerWorks may choose a broad policy, such as active WindData Alliance membership, or a narrower one, such as access only for companies with a customer relationship for the tower section. The dataspace does not force one policy for every provider.

Finally, TowerWorks publishes the offer in its catalog.

## The chain becomes discoverable

NorthSea Wind does not need to know how TowerWorks stores tower-section documents internally. It only needs to know how to ask TowerWorks's catalog what is available.

The dataspace creates a chain of controlled offers:

```text
GreenSteel publishes GS-87 steel mill certificate
        │
        ▼
TowerWorks consumes the certificate
        │
        ▼
TowerWorks publishes TS-42 tower-section dossier
        │
        ▼
NorthSea Wind can discover and request the tower-section dossier
```

The chain is not a central workflow controlled by WindData Alliance. It emerges because each participant publishes and consumes through the same rules.

## Why this is different from forwarding files

TowerWorks could forward GreenSteel's certificate to NorthSea Wind by email. Sometimes business processes do exactly that. But forwarding creates two problems.

First, GreenSteel loses visibility into how its certificate is being distributed. Second, NorthSea Wind may not know whether it is receiving the current certificate from the source or a stale copy forwarded through the chain.

In a dataspace, TowerWorks can publish its own tower-section dossier while GreenSteel remains the source for the steel mill certificate. NorthSea Wind can retrieve each item from the participant responsible for it.

That does not mean documents can never be packaged or referenced together. It means the source of authority stays clear.

## What this step shows

The story has moved from a single exchange to a small network.

GreenSteel is a provider. TowerWorks is both consumer and provider. NorthSea Wind is about to become a consumer of several sources.

The dataspace still has not required a new integration for each arrow. Each participant uses the same basic interaction model, while keeping control of its own data and policies.
