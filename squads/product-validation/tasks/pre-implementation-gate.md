---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: preImplementationGate()
responsavel: Steve (Validation Chief)
responsavel_type: Agente
atomic_layer: Organism

Entrada:
- campo: artifact_path
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Path to the artifact(s) being gated

- campo: validation_results
  tipo: array
  origem: Previous validation runs
  obrigatorio: false
  validacao: Results from individual specialist validations

- campo: threshold
  tipo: number
  origem: config
  obrigatorio: false
  validacao: Minimum average score to pass (default 7.0)

Saida:
- campo: gate_decision
  tipo: enum
  destino: stdout + file
  valores: [GO, NO-GO, CONDITIONAL-GO]
```

---

## Pre-Implementation Gate Task

Final gate before development begins. Aggregates all validation results into a GO/NO-GO decision.

### Step 1: Collect Validation Results

Check if specialist validations have been run. If not, run them:

| Dimension | Required For | Source |
|-----------|-------------|--------|
| Requirements | PRD, Spec | requirements-analyst |
| Stories | Story files | story-validator |
| Scope | MVP scope | scope-guardian |
| Risk | All artifacts | risk-assessor |
| UX | UI/frontend stories | ux-validator |
| Architecture | Architecture decisions | architecture-reviewer |
| Release | Release readiness | release-readiness |

### Step 2: Score Aggregation

Collect scores from each dimension that applies:

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Requirements | 2.0 | ?/10 | ? |
| Stories | 2.0 | ?/10 | ? |
| Scope | 1.5 | ?/10 | ? |
| Risk | 1.5 | ?/10 | ? |
| UX | 1.0 | ?/10 | ? |
| Architecture | 1.5 | ?/10 | ? |
| Release | 1.0 | ?/10 | ? |
| **Average** | | | **?/10** |

### Step 3: Blocker Check

Regardless of average score, check for absolute blockers:
- Any dimension scoring < 4.0 is an automatic BLOCKER
- No Invention violations (Constitution Article IV) are automatic BLOCKERs
- Security fragility classified CRITICAL is an automatic BLOCKER
- Irreversible migration without rollback plan is an automatic BLOCKER

### Step 4: Gate Decision

| Condition | Decision | Action |
|-----------|----------|--------|
| Average >= threshold AND no blockers | **GO** | Proceed to implementation |
| Average >= threshold - 1.0 AND no blockers | **CONDITIONAL-GO** | Proceed with noted concerns |
| Average < threshold - 1.0 OR any blockers | **NO-GO** | Fix issues before proceeding |

### Step 5: Generate Gate Report

Output:
```
## Pre-Implementation Gate Decision

**Artifact:** {artifact_path}
**Date:** {date}
**Decision:** GO / CONDITIONAL-GO / NO-GO

### Score Summary
{dimension scores table}

### Blockers
{list of blockers if any}

### Conditions (for CONDITIONAL-GO)
{list of conditions that must be monitored}

### Recommendations
{prioritized list of improvements}

### Next Steps
{clear action items based on decision}
```

### Step 6: Route

Based on decision:
- **GO:** "Route to @dev for implementation. Story is validated."
- **CONDITIONAL-GO:** "Route to @dev with conditions. Monitor {conditions} during implementation."
- **NO-GO:** "Return to {specialist} to address {blockers}. Re-run gate after fixes."
