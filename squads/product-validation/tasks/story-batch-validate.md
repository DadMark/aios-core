---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: storyBatchValidate()
responsavel: Jeff (Story Validator)
responsavel_type: Agente
atomic_layer: Molecule

Entrada:
- campo: epic_path
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Path to epic directory or story files

- campo: stories
  tipo: array
  origem: File scan
  obrigatorio: true
  validacao: List of story files in the epic

Saida:
- campo: batch_report
  tipo: object
  destino: stdout
  persistido: false
```

---

## Story Batch Validation Task

Validate multiple stories in an epic for coherence, sequencing, and completeness using Jeff Patton's Story Mapping framework.

### Step 1: Discovery

1. Scan the epic directory for all story files (`*.story.md`)
2. Parse each story for: title, ACs, dependencies, status, tasks
3. Build dependency graph across stories

### Step 2: Individual Story Validation

For each story, evaluate:

**INVEST Compliance:**
- Independent: Can be developed without other stories?
- Negotiable: Room for implementation discussion?
- Valuable: Delivers user or business value?
- Estimable: Team can estimate effort?
- Small: Completable in one sprint?
- Testable: Clear pass/fail criteria?

**AC Quality:**
- Each AC is testable with clear pass/fail
- ACs cover happy path and key error paths
- ACs don't prescribe implementation
- ACs use Given-When-Then or equivalent

**Slicing Quality:**
- Story is a vertical slice (touches all layers)
- Story delivers something a user can experience
- Story is not a horizontal layer

### Step 3: Epic-Level Validation

**Story Map Coherence:**
- Do stories connect to user activities?
- Is the narrative flow logical?
- Are there gaps in the user journey?

**Walking Skeleton:**
- Can a minimal end-to-end path be identified?
- Is the walking skeleton in the earliest stories?

**Dependency Chain:**
- Are dependencies explicitly listed?
- Are there circular dependencies?
- Is the sequence buildable?

**Completeness:**
- Do stories cover all epic acceptance criteria?
- Are there missing stories for the user journey?
- Are there orphan stories (no clear epic connection)?

### Step 4: Generate Batch Report

Output:
- Individual story scores table
- Epic coherence assessment
- Walking skeleton identification
- Dependency graph (text format)
- Gaps and missing stories
- Sequencing recommendations
- Overall verdict and score
