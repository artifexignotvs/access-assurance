# Evaluation and limitations

**Status:** private controlled alpha. **Recorded evaluation:** 20 October 2026.

This is a newly written public summary of an internal evaluation. The implementation, raw logs, signed case records, credentials, and internal reports remain private. Readers cannot independently reproduce the implementation results from this repository. Any visual replay is an annotated presentation of the recorded result, not a live application or a recording of its interface.

## Actual integration

The evaluation used one isolated Keycloak realm and one controlled OIDC resource, with a test subject and a separate positive-control identity. No customer environment or public network target was used.

The original subject JWT remained usable after the identity was disabled. Explicit denial at the resource blocked that subject while the positive control continued to work. Later tests restored access and interrupted resource availability: the resulting observations became `RESIDUAL` and `UNKNOWN`, respectively. A later successful check could establish a new bounded result without rewriting earlier signed history.

The positive control helps distinguish subject-specific denial from a broken resource. It does not prove that the resource, host, identity provider, or operator is trustworthy.

## Reported validation

| Layer | Recorded result | Scope |
| --- | --- | --- |
| Assurance Python suite | 528 tests passed | Isolated suite; provider behavior was simulated where applicable. |
| PostgreSQL suite | 14 tests passed | Actual independent connections, concurrency, and artifact checks in disposable schemas. |
| Provider workflow | 11 checks passed | Actual configured realm and resource, including residual-token acceptance, denial, returned access, and outage. |
| Terminal and browser | Completed | Authenticated workflows and historical export; browser role checks used separate account contexts. |
| Signing and recovery | Completed | Stopped-worker key rotation and encrypted restore into a separate database; historical records survived and restored authority was quarantined. |
| Finite workflow model | Passed within the explored bounds | The declared state space and fault variants only; not a proof about the entire application. |

The network-free Python run skipped the two PostgreSQL modules that were executed separately. The listed counts concern different validation layers and are not an adoption metric or an external assessment. Focused checks can overlap broader suites and must not be added as separate coverage.

## Decision boundaries

- **Scope:** observations concern the configured subject, credential, resource, and generation. Undeclared applications and access paths are outside the result.
- **Freshness:** observation validity is at most 60 seconds and cannot outlive the bound credential or snapshot. Historical evidence remains historical after expiry.
- **Planning:** optimization uses a finite declared graph and a deterministic work budget. It can return a feasible plan without proving optimality, or return `UNKNOWN` when the budget is exhausted.
- **Authorization:** different account roles enforce separation of duties. They do not establish that different human beings control the accounts.
- **Remote effects:** database coordination cannot make a separate provider request atomic, retract an accepted operation, or stop another administrator from restoring access later.
- **Evidence:** signatures rely on the supplied trust root and honest source observations. Offline verification cannot establish current access state.
- **Recovery:** the actual restore dataset had no pending job. In-flight cancellation was exercised separately with isolated tests. Provider restoration and production failover were not demonstrated.

## Outside the evaluated scope

Arbitrary enterprise connectors, high availability, production load, independent key custody, hardware signing, and regulatory certification are not included. Package advisory checks were point-in-time checks, not evidence of an absence of vulnerabilities. No customer deployment, external audit, commercial traction, or service-level guarantee is claimed.

The next useful evidence would be an independently reviewed pilot against another clearly scoped application. This public showcase does not promise its availability or outcome.
