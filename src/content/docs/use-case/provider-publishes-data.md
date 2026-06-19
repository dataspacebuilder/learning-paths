---
title: "Chapter 4: Provider Publishes Data"
description: "How VeloForge makes a material certificate discoverable without sending the document to every partner."
---

VeloForge Materials has produced a batch of recycled aluminum alloy called **ALX88**. The batch comes with a material certificate that describes the alloy composition, origin, recycled content, and relevant compliance information.

FerroLink will eventually need that certificate because it uses ALX88 to manufacture a battery housing. LumenDrive may need it later for vehicle compliance evidence. NebulaFlow may need selected information for analytics.

VeloForge does not want to guess every future recipient and email the certificate to all of them. It publishes the certificate as a dataspace offer.

## What VeloForge does

VeloForge takes four steps.

### 1. It keeps the certificate in its own environment

The PDF remains in VeloForge's document store, content system, or storage service. The dataspace does not require VeloForge to upload the document into a shared repository.

VeloForge's data plane can reach the document and serve it when an authorized transfer is approved.

### 2. It describes the certificate

VeloForge creates an **asset** in its control plane. The asset is a description of the data, not the data itself.

The description can include information such as:

- document name: `ALX88 Material Certificate`;
- document type: material certificate;
- alloy batch: `ALX88`;
- provider: VeloForge Materials;
- version and validity dates;
- technical location used by VeloForge's data plane.

This is what makes the certificate discoverable. A consumer can learn that the certificate exists without receiving the certificate itself.

### 3. It defines the access policy

VeloForge attaches a policy to the offer.

For the first version of the story, the policy is simple:

> Any participant with an active TrustGrid membership credential may request access to this certificate.

The policy does not list every possible company by name. It refers to a trusted credential. That means a new participant can become eligible by receiving the required credential from TrustGrid, without VeloForge changing the offer for that participant specifically.

### 4. It publishes the offer in the catalog

Finally, VeloForge binds the asset and policy into a catalog offer. The offer says, in effect:

> This certificate exists. Here is what it describes. Here is the policy for accessing it.

The certificate is now available for discovery by eligible participants.

## What has not happened yet

No one has downloaded the certificate.

No copy has been sent to FerroLink, LumenDrive, or NebulaFlow. The document has not moved to TrustGrid. It has not become public.

Only the offer has been published.

That separation is the key. Publication in a dataspace means making controlled data discoverable under stated terms. It does not mean broadcasting the data itself.

## The dataspace concepts in this step

| Story element | Dataspace concept |
|---|---|
| VeloForge | Provider participant |
| ALX88 certificate description | Asset metadata |
| The rule requiring active membership | Access policy |
| The catalog entry visible to consumers | Contract offer |
| VeloForge's document store and serving endpoint | Data plane |
| The control software managing the offer | Control plane |

At this point, VeloForge has done what every provider needs to do first: it has turned a private document into a controlled dataspace offer.

The next question is what happens when another participant wants to use it.
