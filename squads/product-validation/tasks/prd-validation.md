---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: prdValidation()
responsavel: Marty (Requirements Analyst)
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
- campo: prd_path
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Must be a valid file path to PRD document

Saida:
- campo: validation_result
  tipo: object
  destino: stdout
  persistido: false

- campo: score
  tipo: number
  destino: Return value
```

---

## PRD Validation Task

Comprehensive PRD validation using Marty Cagan's four-risk framework combined with the AIOX PM checklist.

### Step 1: Load PRD

1. Read the PRD file from the provided path
2. Identify PRD structure (sections, features, requirements)
3. Load `pm-checklist.md` from `.aiox-core/product/checklists/`

### Step 2: Four-Risk Assessment

For each major feature/requirement in the PRD:

**Value Risk:**
- Is there evidence customers will buy/use this?
- Sources: user research, market validation, prototype testing
- Red flags: no user evidence, only stakeholder opinion

**Usability Risk:**
- Can customers figure out how to use it?
- Sources: usability testing, prototype feedback
- Red flags: no UX validation, complex untested flows

**Feasibility Risk:**
- Can engineering build it with available resources?
- Sources: tech spike, architecture review, capacity check
- Red flags: no technical validation, assumed feasible

**Viability Risk:**
- Does this work for the business?
- Sources: business case, compliance check, revenue model
- Red flags: no business case, regulatory unknowns

### Step 3: Requirement Quality Scoring

For each individual requirement, score against:
1. Outcome-Focused (weight 2.0): Describes change in behavior, not feature built
2. Evidence-Backed (weight 2.0): User research or data supporting it
3. Testable (weight 1.5): QA can write a test for it
4. Unambiguous (weight 1.0): Two developers interpret it the same way
5. Necessary (weight 1.5): Removing it breaks core value proposition
6. Solution-Agnostic (weight 1.0): Describes WHAT not HOW

### Step 4: No Invention Compliance (Constitution Article IV)

Trace every requirement to its source:
- FR-* (Functional Requirements)
- NFR-* (Non-Functional Requirements)
- CON-* (Constraints)
- Research findings

Flag any requirement without traceability as a NO INVENTION VIOLATION.

### Step 5: PM Checklist Cross-Reference

Run the 9-category PM checklist:
1. Problem Definition & Context
2. MVP Scope Definition
3. User Experience Requirements
4. Functional Requirements
5. Non-Functional Requirements
6. Epic & Story Structure
7. Technical Guidance
8. Cross-Functional Requirements
9. Clarity & Communication

### Step 6: Generate Report

Output validation report with:
- Four-Risk Assessment table (per feature)
- Requirement Quality scores (per requirement)
- No Invention compliance check
- PM Checklist category statuses
- Overall score and verdict
- Prioritized recommendations
