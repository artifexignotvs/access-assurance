# Access Assurance — annotated laboratory replay

**20 October 2026 · 90 seconds · silent video with on-screen text.**

**Illustrated result, not live product footage.** These original diagrams summarize a recorded controlled evaluation. They are not screenshots of the implementation, a live service, or evidence of its current state. “Subject A” is a generic presentation label. No customer data, credentials, private receipts, or infrastructure identifiers appear.

The video carries both provenance labels throughout: “Annotated laboratory replay · 20 October 2026” and “Illustrated result, not live product footage.”

## Transcript

### 00:00–00:10 — The Question

Disabling an identity does not establish that every application has stopped accepting previously issued access. Access Assurance checks the specified resource and preserves the observed result.

### 00:10–00:22 — 01 / Identity Disable

In the controlled run, the identity was disabled in one Keycloak realm. The original, still-valid JWT remained usable at the single controlled OIDC resource. The illustrations use the generic label Subject A; they contain no actual credentials or customer data.

### 00:22–00:36 — 02 / Resource Observation

A resource-level denial was then applied. An independent observation required both explicit denial for the subject and successful access for the positive-control identity. VERIFIED described that specific access path during the configured observation window; it was not a claim about all applications.

### 00:36–00:46 — 03 / Access Returns

The denial was deliberately removed. A later observation found access again and replaced the prior success with RESIDUAL. The old receipt remained historical evidence.

### 00:46–00:56 — 04 / Resource Outage

When the controlled resource became unavailable, the current result changed to UNKNOWN. Missing observation was not treated as evidence that access had been removed.

### 00:56–01:06 — 05 / Fresh Observation

After the resource recovered and the intended denial was restored, a new paired observation produced VERIFIED again. This was a fresh bounded observation, not an extension of an old receipt.

### 01:06–01:18 — 06 / Historical Evidence

Signed historical receipts can be verified against a supplied trust root. A valid signature authenticates the recorded evidence under its declared trust assumptions. Offline verification does not establish current access state. Fresh observation is required.

### 01:18–01:30 — Private Controlled Alpha

This is a private controlled alpha evaluated with one Keycloak realm and one controlled OIDC resource. The public showcase contains the presentation, not the private implementation. It makes no production-readiness, broad integration, independent-audit, availability, or scale claim. Explore the evaluation boundary and discuss a suitable pilot at the linked repository.

## Scope

The recorded integration used one Keycloak realm, one controlled OIDC resource, a subject identity, and a positive-control identity. VERIFIED, RESIDUAL, and UNKNOWN are results for the specified path and observation window. They are not certifications of an organization or assurances about unobserved applications.

Historical receipts make no present-tense access claim. This is a private controlled alpha; the implementation is not part of this public presentation. No independent audit, production readiness, broad integration coverage, availability, or scale claim is made.

[Public showcase](https://github.com/artifexignotvs/access-assurance)
