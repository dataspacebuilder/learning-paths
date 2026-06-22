---
title: "Chapter 4: Provider Publishes Data"
description: "How GreenSteel makes a steel mill certificate discoverable without sending the document to every partner."
---

GreenSteel Mill has produced a low-carbon steel batch called **GS-87**. The batch comes with a steel mill certificate that describes the steel composition, production route, origin, declared carbon intensity, and relevant compliance information.

TowerWorks will eventually need that certificate because it uses GS-87 to fabricate tower section TS-42. NorthSea Wind may need it later for NSW-15 turbine compliance evidence. GridSight may need selected information for analytics.

GreenSteel does not want to guess every future recipient and email the certificate to all of them. It publishes the certificate as a dataspace offer.

## What GreenSteel does

GreenSteel takes four steps.

### 1. It keeps the certificate in its own environment

The PDF remains in GreenSteel's document store, content system, or storage service. The dataspace does not require GreenSteel to upload the document into a shared repository.

GreenSteel's data plane can reach the document and serve it when an authorized transfer is approved.

### 2. It describes the certificate

GreenSteel creates an **asset** in its control plane. The asset is a description of the data, not the data itself.

The description can include information such as:

- document name: `GS-87 Steel Mill Certificate`;
- document type: steel mill certificate;
- steel batch: `GS-87`;
- provider: GreenSteel Mill;
- version and validity dates;
- technical location used by GreenSteel's data plane.

This is what makes the certificate discoverable. A consumer can learn that the certificate exists without receiving the certificate itself.

### 3. It defines the access policy

GreenSteel attaches a policy to the offer.

For the first version of the story, the policy is simple:

> Any participant with an active WindData Alliance membership credential may request access to this certificate.

The policy does not list every possible company by name. It refers to a trusted credential. That means a new participant can become eligible by receiving the required credential from WindData Alliance, without GreenSteel changing the offer for that participant specifically.

### 4. It publishes the offer in the catalog

Finally, GreenSteel binds the asset and policy into a catalog offer. The offer says, in effect:

> This certificate exists. Here is what it describes. Here is the policy for accessing it.

The certificate is now available for discovery by eligible participants.

## What has not happened yet

No one has downloaded the certificate.

No copy has been sent to TowerWorks, NorthSea Wind, or GridSight. The document has not moved to WindData Alliance. It has not become public.

Only the offer has been published.

That separation is the key. Publication in a dataspace means making controlled data discoverable under stated terms. It does not mean broadcasting the data itself.

## The dataspace concepts in this step

| Story element | Dataspace concept |
|---|---|
| GreenSteel | Provider participant |
| GS-87 certificate description | Asset metadata |
| The rule requiring active membership | Access policy |
| The catalog entry visible to consumers | Contract offer |
| GreenSteel's document store and serving endpoint | Data plane |
| The control software managing the offer | Control plane |

At this point, GreenSteel has done what every provider needs to do first: it has turned a private document into a controlled dataspace offer.

The next question is what happens when another participant wants to use it.
