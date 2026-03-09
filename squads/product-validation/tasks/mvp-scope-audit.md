---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: mvpScopeAudit()
responsavel: Eric (Scope Guardian)
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
- campo: scope_source
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Path to PRD, epic, or backlog to audit

Saida:
- campo: scope_report
  tipo: object
  destino: stdout
  persistido: false
```

---

## MVP Scope Audit Task

Validate MVP scope boundaries using Eric Ries' Lean Startup methodology.

### Step 1: Scope Inventory

1. Read the scope source (PRD, epic, or backlog)
2. List ALL features/stories/requirements
3. Categorize each as: ESSENTIAL, IMPORTANT, NICE-TO-HAVE, UNKNOWN

### Step 2: Hypothesis Mapping

For each feature in scope:
1. **Hypothesis:** What are we testing with this feature?
2. **Measurement:** How will we know if the hypothesis is true?
3. **Success Criteria:** What metric value = success?
4. **Verdict:** MAPPED (has hypothesis) or UNMAPPED (no hypothesis)

Features without a hypothesis mapping are candidates for removal.

### Step 3: Complexity Assessment

Run 5-dimension complexity scoring (aligned with `spec-assess-complexity.md`):

| Dimension | Score (1-5) | Notes |
|-----------|------------|-------|
| Scope | ? | Files/components affected |
| Integration | ? | External APIs/services |
| Infrastructure | ? | Infra changes needed |
| Knowledge | ? | Team familiarity |
| Risk | ? | Criticality level |
| **Total** | ?/25 | Classification |

**Classification:**
- <= 8: SIMPLE
- 9-15: STANDARD
- >= 16: COMPLEX

### Step 4: Scope Health Check

**Green indicators:**
- Each feature maps to a hypothesis
- Walking skeleton identifiable
- Team can deliver in target timeframe
- Pivot options preserved

**Yellow indicators:**
- Some features lack hypothesis
- Nice-to-haves mixed with essentials
- Complexity > 12
- Measurement unclear

**Red indicators:**
- Features without justification
- No measurement approach
- Complexity > 18
- No pivot ability

### Step 5: Cut Recommendations

For each UNMAPPED or NICE-TO-HAVE feature:
1. Justify why it can be cut
2. State what you lose by cutting
3. State what you gain (reduced complexity, faster learning)
4. Provide recommended scope boundary

### Step 6: Generate Report

Output:
- Feature inventory with categorization
- Hypothesis mapping table
- Complexity assessment
- Scope health indicators
- Recommended cuts with justification
- Final recommended scope vs original
- Score and verdict
