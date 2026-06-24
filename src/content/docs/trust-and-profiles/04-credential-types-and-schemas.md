---
title: "Chapter 4: Design the Membership Credential"
description: "How governance teams define the first credential and the trust anchor for membership proof."
---

The dataspace profile says that WindData Alliance members need proof of active membership. This chapter turns that profile rule into a credential design.

The first credential should stay narrow. It should prove membership, not every future role, approval, project, or exception. The goal is to give providers enough reliable proof to apply the member-only policy pattern without creating a complete identity dossier.

Trust is situational, time-bound, and purpose-specific. A credential is evidence for a trust decision. It is not the trust decision by itself. The [IDSA Rulebook trust chapter](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/008_Trust.md) gives the deeper treatment.

## From profile decision to credential

The profile decision is:

> Approved WindData Alliance members can use the member-only access pattern.

The credential design answers the next question:

> What proof can a participant present so another participant can verify active membership?

For the first profile, that proof is `WindDataMembershipCredential`. It should tell a verifier that the holder is an approved WindData Alliance member, that the membership is currently active, and that the credential was issued by the accepted membership issuer.

Do not add additional credential types until a real policy needs them. The first chapter on profiles established the membership baseline; this chapter makes that baseline verifiable.

## Issuer and Accepted Proof

For a credential to be useful, participants need to know who issued it and whether that issuer is accepted for this kind of proof.

When an issuer is accepted as authoritative for a specific credential type, it acts as a **trust anchor** for that proof. This is scoped. The same issuer may be accepted for membership proof, but not for other kinds of proof.

| Question | WindData answer |
|---|---|
| Who creates the credential? | WindData Alliance membership issuer. |
| What is the credential accepted for? | Proving active membership in `winddata-alliance:v1`. |
| What is the trust anchor? | The accepted WindData membership issuer, for membership proof only. |
| Who relies on it? | Providers applying member-only policies. |

Accepting a trust anchor is a governance choice. It does not give that issuer structural control over the dataspace, and it does not make the participant trusted for every interaction.

In this chapter, the practical rule is simple: document the issuer, the trust anchor, and the purpose for which its credential is accepted. For WindData Alliance, the membership issuer is the trust anchor for membership proof. It is not automatically the trust anchor for lab accreditation, program access, or any future role.

## Keep the credential narrow

Do not put every useful value into one membership credential. A large credential reveals more than most policies need, makes changes risky, and makes it difficult to revoke one attribute without disturbing everything else.

Keep the membership credential focused on membership. It should not become the place where every future role, approval, project, or exception is stored.

Later, WindData Alliance may add more targeted credentials for specific policy needs. When it does, each new credential should have its own business question, issuer, trust anchor, accepted purpose, and lifecycle rule.

## Define the credential

Governance teams do not need to write the final technical definition, but they do need to define the meaning. For the membership credential, describe the holder, issuer, trust anchor, accepted purpose, validity period, revocation behavior, and the few values that policies need.

A simple design might say:

```text
Credential: WindDataMembershipCredential
Meaning: the holder is an active member of WindData Alliance
Issuer: WindData Alliance membership issuer
Trust anchor: WindData Alliance membership issuer, for membership proof only
Accepted purpose: membership proof for winddata-alliance:v1
Holder: approved participant organization
Validity: 12 months
Acceptance: active until it expires or is revoked
Used by: member-only access and negotiation policies
Privacy rule: do not include onboarding documents or commercial details
```

This is enough for governance review. Issuers and operators can translate it into the concrete credential format supported by the chosen technology.

## Version the credential deliberately

Credential definitions change as the dataspace matures. A pilot membership credential might later add a clearer validity rule, a membership class, or a different status model.

Never change the meaning silently. If an old credential remains accepted, say for how long. If a new version is required, explain who must renew it and which policy patterns are affected.

The [IDSA Rulebook chapter on attributes and claims](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/104_Attributes_and_claims.md) is the deeper reference for credentials and trust anchors. The [IDSA Rulebook trust chapter](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/008_Trust.md) explains why accepted credential evidence still does not replace contextual trust decisions.

## Handoff to issuers and operators

For the membership credential, the trust team should hand over the business question, issuer, trust anchor, accepted purpose, eligible holders, required values, validity rule, revocation rule, and member-only policies that depend on it.

If you cannot name the onboarding decision or policy that needs a credential value, leave that value out for now. Minimal credentials are easier to govern, easier to explain, and safer to reuse.
