---
title: "Chapter 6: Consumer Becomes Provider"
description: "How FerroLink uses the same dataspace pattern to publish its own component documentation."
---

FerroLink has now retrieved VeloForge's ALX88 material certificate. That certificate becomes one input into FerroLink's own work.

FerroLink machines battery housing **BH-2026** from the alloy. For that component, it creates its own documentation: assembly specifications, quality records, safety information, and references to the material evidence it used.

Now another company needs data from FerroLink. LumenDrive Motors will eventually use BH-2026 in a vehicle and needs the component documentation for compliance and product-passport work.

FerroLink therefore changes roles. It was just a consumer. Now it becomes a provider.

## The same participant can play both roles

Nothing special happens to FerroLink's identity when its role changes. It remains the same dataspace participant.

The difference is the action it takes:

- when it requested VeloForge's certificate, FerroLink acted as a **consumer**;
- when it publishes BH-2026 documentation, FerroLink acts as a **provider**.

Provider and consumer are not fixed company categories. They are roles in a particular interaction.

## FerroLink publishes component documentation

FerroLink follows the same provider pattern VeloForge used.

First, it keeps the BH-2026 documents in its own environment. The files remain under FerroLink's control.

Second, it describes the documents as dataspace assets. The metadata can say that the asset relates to battery housing BH-2026, includes assembly and quality documentation, and references ALX88 as an input material.

Third, it defines access policies. FerroLink may choose a broad policy, such as active TrustGrid membership, or a narrower one, such as access only for companies with a customer relationship for the component. The dataspace does not force one policy for every provider.

Finally, FerroLink publishes the offers in its catalog.

## The chain becomes discoverable

LumenDrive does not need to know how FerroLink stores component documents internally. It only needs to know how to ask FerroLink's catalog what is available.

The dataspace creates a chain of controlled offers:

```text
VeloForge publishes ALX88 material certificate
        │
        ▼
FerroLink consumes the certificate
        │
        ▼
FerroLink publishes BH-2026 component documentation
        │
        ▼
LumenDrive can discover and request the component documentation
```

The chain is not a central workflow controlled by TrustGrid. It emerges because each participant publishes and consumes through the same rules.

## Why this is different from forwarding files

FerroLink could forward VeloForge's certificate to LumenDrive by email. Sometimes business processes do exactly that. But forwarding creates two problems.

First, VeloForge loses visibility into how its certificate is being distributed. Second, LumenDrive may not know whether it is receiving the current certificate from the source or a stale copy forwarded through the chain.

In a dataspace, FerroLink can publish its own component documentation while VeloForge remains the source for the material certificate. LumenDrive can retrieve each item from the participant responsible for it.

That does not mean documents can never be packaged or referenced together. It means the source of authority stays clear.

## What this step shows

The story has moved from a single exchange to a small network.

VeloForge is a provider. FerroLink is both consumer and provider. LumenDrive is about to become a consumer of several sources.

The dataspace still has not required a new integration for each arrow. Each participant uses the same basic interaction model, while keeping control of its own data and policies.
