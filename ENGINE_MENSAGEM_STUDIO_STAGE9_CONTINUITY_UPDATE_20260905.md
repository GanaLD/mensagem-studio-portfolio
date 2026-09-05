# ENGINE MENSAGEM STUDIO — STAGE 9 CONTINUITY UPDATE

**Project:** EMS EDITOR / StudioFrame Editor Engine 12  
**Line:** R2.2  
**Operational state:** `R2.2_STAGE9_CANDIDATE_ARTIFACT_READY_GITHUB_SITE_COMMIT_PENDING`  
**Date:** 2026-09-05

## 1. Supersession notice

This file supersedes only the **Stage 8 identity and Stage 9 source-recovery diagnosis** in
`ENGINE_MENSAGEM_STUDIO_MASTER_CONTINUITY_R2_2_STAGE9_20260904.md`.

The architecture, contracts, project history, owners, routes, UI/UX rules, Drive policy,
Player policy, Immersive policy, rollback policy and Windows-final gate in the master
handoff remain valid.

A later Stage 8 closure was discovered and verified after the master handoff was written.
Therefore the earlier `b184...` artifact and the `static/admin.js` recovery gate are historical,
not the current operational blocker.

## 2. Canonical Stage 8

```text
artifact_id:
r22-7e8bf3667496-ed448d516239e489

artifact_sha256:
ed448d516239e4896a6c49f55f76d33d75426fa0b8c2fe8c9cad4f7666cc6056

editorial_revision:
7e8bf36674964235ffb7

build_id:
V74-V75-EDITOR-MOTION-VIDEO
```

The later Stage 8 report declares:

```text
PASS_WITH_FINAL_WINDOWS_PHYSICAL_PENDING
Stage8 selftest: 39/39 PASS
Stage7 regression: 83/83 PASS
Stage6 regression: 99/99 PASS
Stage5 regression: PASS
Global app.selftest: PASS exit 0
Canonical source Drive read-back: PASS exact size + SHA-256
```

## 3. Canonical Stage 8 source files recertified

```text
static/admin.js
bytes  = 1,137,129
sha256 = 769dca90ad1e250f40fd559371e07af5838bed4021e21bef55560cdb983d8c89

app/server.py
bytes  = 151,643
sha256 = 8dffb767019605c30641d2dda55b125a527c125e98b4a773e7e8352b659fd4b0

app/exporter.py
bytes  = 173,488
sha256 = ad96d8242d58a73583ba3f453d1d180e462e46f33b3ea1b7e9e4599bbef1f001
```

These values supersede the earlier Stage 8 source hashes.

## 4. Stage 9 reconstruction performed

Canonical R2 ZIP was reconstructed and verified.

Runtime/editor last-writer map:

```text
37 / 37 paths exact SHA-256
```

Immersive runtime:

```text
public_assets/immersive/immersive-v31.js
bytes  = 17,651
sha256 = 7fb9a828ec22937c9ecc5675c57b0e4d714e8c19b3f31964ab47fc556dea191b
```

The final Stage 8 build also materializes the same runtime as:

```text
assets/immersive-v31.js
assets/immersive/immersive-v31.js
```

With that exact materialization, the official Stage 8 selftest was rerun locally:

```text
39 / 39 PASS
artifact reproduced exactly
artifact_sha256 = ed448d516239e4896a6c49f55f76d33d75426fa0b8c2fe8c9cad4f7666cc6056
```

## 5. Frozen Stage 9 candidate

Exact `/site/` artifact frozen as:

```text
R2_2_STAGE9_CANDIDATE_SITE_ed448d516239e489.zip
bytes:
10,466,636
zip_sha256:
ccf1d4f6e3f1e6dd9d07765dcf714a9f48f78fd309ba0f9a27b6869c07fb1b0a
Drive ID:
1Xj0oY0VY3k-It2GQ4-70UKPlHqC17N7o
```

The ZIP is stored in the Stage 8/9 evidence folder and is the artifact to materialize in GitHub.
The promote step is forbidden from rebuilding another site.

## 6. GitHub Stage 9

Repository:

```text
GanaLD/mensagem-studio-portfolio
```

Candidate branch:

```text
r22-stage9-candidate-20260904
```

Production rollback commit:

```text
b6bd9a71f235448bfe860af57ca5b537860c08c7
```

Completed:

```text
candidate branch isolation          PASS
GitHub connector write              PASS
GitHub connector read-back          PASS
canonical Stage 8 correction        PASS
candidate receipt persisted         PASS
production main touched             NO
```

Pending:

```text
materialize exact frozen site in candidate branch
candidate site verification
promote to main
Pages/live HTTP + DOM + buildId verification
Windows physical final validation
MSE2_RELEASE_CURRENT promotion
```

## 7. Current gate

The current blocker is **not source recovery**.

Current state:

```text
R2.2_STAGE9_CANDIDATE_ARTIFACT_READY_GITHUB_SITE_COMMIT_PENDING
```

The exact candidate exists and is certified. The remaining task is to materialize that exact
artifact through the GitHub publication channel without triggering a rebuild.

## 8. Absolute rules still active

- `main` stays untouched until candidate verification passes.
- Do not rebuild during promote.
- Do not rotate or log credentials.
- Drive remains read-only for portfolio media.
- Player remains StudioPlayer / HTMLMediaElement, never Drive Viewer.
- Preview must remain the exact Build artifact.
- `MSE2_RELEASE_CURRENT` remains unchanged until final Windows + public verification.
- Rollback commit must remain available.
