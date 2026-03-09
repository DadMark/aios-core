---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: fullProductAudit()
responsavel: Steve (Validation Chief)
responsavel_type: Agente
atomic_layer: Organism

Entrada:
- campo: target
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Path to PRD, story, epic, or artifact to validate

- campo: dimensions
  tipo: array
  origem: config
  obrigatorio: false
  validacao: Subset of [requirements, stories, scope, risk, ux, architecture, release]. Default all.

- campo: threshold
  tipo: number
  origem: config
  obrigatorio: false
  validacao: Minimum score to APPROVE (default 7.0)

Saida:
- campo: validation_report
  tipo: object
  destino: stdout + file
  persistido: true

- campo: verdict
  tipo: enum
  destino: Return value
  valores: [APPROVED, NEEDS_REVISION, BLOCKED]
```

---

## Full Product Audit

End-to-end product validation across ALL dimensions, orchestrated by the Validation Chief.

### Phase 1: Artifact Discovery

1. Read the target artifact (PRD, story file, epic directory)
2. Identify artifact type (PRD, story, epic, spec)
3. Load the validation-dimensions from `data/validation-dimensions.yaml`
4. Determine which dimensions apply to this artifact type

### Phase 2: Specialist Routing

For each applicable dimension, route to the specialist:

| Dimension | Specialist | Task |
|-----------|-----------|------|
| Requirements | Marty (requirements-analyst) | PRD validation, four-risk assessment |
| Stories | Jeff (story-validator) | Story quality, INVEST, AC testability |
| Scope | Eric (scope-guardian) | MVP scope, complexity, hypothesis mapping |
| Risk | Nassim (risk-assessor) | Fragility scan, tail risk, blast radius |
| UX | Don (ux-validator) | Norman's 7 principles, WCAG POUR |
| Architecture | Martin (architecture-reviewer) | Pattern fit, coupling, reversibility |
| Release | Gene (release-readiness) | Deploy readiness, migration safety, DORA |

### Phase 3: Score Aggregation

1. Collect scores from each specialist (1-10 per dimension)
2. Calculate weighted average:
   - Requirements: weight 2.0
   - Stories: weight 2.0
   - Scope: weight 1.5
   - Risk: weight 1.5
   - UX: weight 1.0
   - Architecture: weight 1.5
   - Release: weight 1.0
3. Apply threshold (default 7.0)

### Phase 4: Verdict

| Average Score | Verdict | Action |
|--------------|---------|--------|
| >= threshold | APPROVED | Proceed to implementation |
| >= threshold - 1.5 | NEEDS_REVISION | Fix issues, re-validate |
| < threshold - 1.5 | BLOCKED | Major rework required |

### Phase 5: Report Generation

Generate consolidated report with:

1. **Executive Summary** — Overall verdict, score, key concerns
2. **Dimension Scores** — Table with per-dimension scores and findings
3. **Critical Issues** — Blockers that must be resolved
4. **Recommendations** — Prioritized list of improvements
5. **Specialist Details** — Full findings from each specialist

Output format: Markdown report written to `docs/validation-reports/{artifact-name}-audit.md`

### Phase 6: Decision

Present verdict to user with clear next steps:
- APPROVED: "Ready for implementation. Route to @dev."
- NEEDS_REVISION: "Fix {N} issues and re-run `*full-audit`."
- BLOCKED: "Major concerns in {dimensions}. Address before proceeding."
