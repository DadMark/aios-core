---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: riskProfileReport()
responsavel: Nassim (Risk Assessor)
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
- campo: target
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Path to artifact, feature, or system to assess

Saida:
- campo: risk_report
  tipo: object
  destino: stdout
  persistido: false
```

---

## Risk Profile Report Task

Generate structured risk profile using Nassim Taleb's fragility framework.

### Step 1: System Analysis

1. Read the target artifact (architecture doc, PRD, code, etc.)
2. Identify system components and their interactions
3. Map external dependencies and integration points

### Step 2: Fragility Assessment

For each component/subsystem, classify across 5 categories:

**Data Fragility:**
- Single point of failure in data storage?
- Data loss scenario and recovery?
- Migration reversibility?

**Integration Fragility:**
- External API dependency failure modes?
- Rate limiting or throttling risks?
- Schema change vulnerability?

**Scale Fragility:**
- Performance under 10x load?
- Database query degradation at scale?
- Memory/resource exhaustion?

**Security Fragility:**
- Authentication bypass scenarios?
- Data exposure in errors?
- Privilege escalation paths?

**Operational Fragility:**
- Deployment rollback capability?
- Monitoring and alerting coverage?
- Manual intervention requirements?

### Step 3: Risk Scoring

For each identified risk:

| Factor | Scale | Description |
|--------|-------|-------------|
| Impact | 1-5 | Negligible to catastrophic |
| Fragility | 1-5 | Antifragile to extremely fragile |
| Exposure | 1-5 | Rare to constant |
| Reversibility | 1-5 | Easy rollback to irreversible |

**Formula:** Risk Score = (Impact x Fragility x Exposure) / Reversibility

**Thresholds:**
- < 10: LOW
- 10-25: MEDIUM
- 26-50: HIGH
- > 50: CRITICAL

### Step 4: Tail Risk Identification

Identify low-probability, high-impact scenarios:
- What's the WORST case, not the average?
- Black swan scenarios specific to this system
- Cascading failure paths

### Step 5: Via Negativa Recommendations

For each HIGH/CRITICAL risk:
1. What can be REMOVED to reduce fragility?
2. Is there a simpler design that eliminates the risk?
3. Barbell strategy: extreme safety for critical path + controlled risk elsewhere

### Step 6: Generate Report

Output:
- Fragility assessment matrix (component x category)
- Risk score table with severity classification
- Tail risk identification
- Via negativa recommendations
- Optionality assessment
- Overall risk profile verdict
