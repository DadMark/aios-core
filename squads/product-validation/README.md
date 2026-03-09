# Product Validation Squad

**Version:** 1.0.0
**Domain:** Product & Technical Artifact Validation
**Philosophy:** "Validate early, validate often, validate right."

## Overview

Squad especialista em validacao shift-left de artefatos de produto. Cada agente e baseado em um expert real cujo framework de pensamento guia a validacao em seu dominio.

Cada defeito encontrado antes do codigo ser escrito economiza 10x em retrabalho.

## Agents (8)

### Tier 0 -- Triage & Orchestration

| Agent | Persona | Icon | Inspired By | Focus |
|-------|---------|------|-------------|-------|
| validation-chief | Steve | ✨ | Steve Jobs | Triage, routing, quality obsession |

### Tier 1 -- Core Validation

| Agent | Persona | Icon | Inspired By | Focus |
|-------|---------|------|-------------|-------|
| requirements-analyst | Marty | 🔍 | Marty Cagan (SVPG) | PRD validation, four-risk framework |
| story-validator | Jeff | 📜 | Jeff Patton | Story quality, INVEST, story mapping |
| scope-guardian | Eric | 🎯 | Eric Ries | MVP scope, lean validation |
| risk-assessor | Nassim | ⚠️ | Nassim Taleb | Fragility, tail risk, antifragile |

### Tier 2 -- Specialist Validation

| Agent | Persona | Icon | Inspired By | Focus |
|-------|---------|------|-------------|-------|
| ux-validator | Don | 👁️ | Don Norman | UX heuristics, WCAG, affordances |
| architecture-reviewer | Martin | 🏛️ | Martin Fowler | Patterns, coupling, evolutionary arch |
| release-readiness | Gene | 🚀 | Gene Kim | Deploy readiness, DORA, flow |

## Activation

```
@product-validation:validation-chief    # Entry point
@product-validation:requirements-analyst # Direct to Marty
@product-validation:story-validator      # Direct to Jeff
@product-validation:scope-guardian       # Direct to Eric
@product-validation:risk-assessor        # Direct to Nassim
@product-validation:ux-validator         # Direct to Don
@product-validation:architecture-reviewer # Direct to Martin
@product-validation:release-readiness    # Direct to Gene
```

## Key Commands

| Command | Agent | Description |
|---------|-------|-------------|
| `*full-audit` | Steve | End-to-end validation across all dimensions |
| `*gate` | Steve | Pre-implementation GO/NO-GO decision |
| `*validate-prd` | Marty | PRD validation with four-risk assessment |
| `*validate-story` | Jeff | Deep story validation (INVEST, ACs) |
| `*validate-epic` | Jeff | Batch validate all stories in an epic |
| `*scope-check` | Eric | MVP scope boundary validation |
| `*risk-assess` | Nassim | Fragility-based risk assessment |
| `*ux-review` | Don | Norman's 7 principles + Nielsen heuristics |
| `*arch-review` | Martin | Architecture decision validation |
| `*release-check` | Gene | Release readiness validation |

## Scoring

All dimensions scored 1-10. Weighted average determines verdict:

| Verdict | Condition |
|---------|-----------|
| APPROVED | Average >= 7.0, no blockers |
| NEEDS_REVISION | Average >= 5.5, no blockers |
| BLOCKED | Average < 5.5 OR has blockers |

**Absolute Blockers:**
- Any dimension < 4.0
- No Invention violation (Constitution Article IV)
- CRITICAL security fragility
- Irreversible migration without rollback

## Structure

```
squads/product-validation/
├── config.yaml                          # Squad manifest
├── README.md                            # This file
├── agents/
│   ├── validation-chief.md              # Tier 0: Steve (Jobs)
│   ├── requirements-analyst.md          # Tier 1: Marty (Cagan)
│   ├── story-validator.md               # Tier 1: Jeff (Patton)
│   ├── scope-guardian.md                # Tier 1: Eric (Ries)
│   ├── risk-assessor.md                 # Tier 1: Nassim (Taleb)
│   ├── ux-validator.md                  # Tier 2: Don (Norman)
│   ├── architecture-reviewer.md         # Tier 2: Martin (Fowler)
│   └── release-readiness.md             # Tier 2: Gene (Kim)
├── tasks/
│   ├── full-product-audit.md            # End-to-end audit
│   ├── prd-validation.md                # PRD validation
│   ├── story-batch-validate.md          # Epic-level story validation
│   ├── mvp-scope-audit.md               # MVP scope audit
│   ├── risk-profile-report.md           # Risk profile generation
│   └── pre-implementation-gate.md       # GO/NO-GO gate
├── data/
│   └── validation-dimensions.yaml       # Scoring framework
├── templates/
│   └── validation-report-tmpl.md        # Report template
└── checklists/
    └── pre-implementation-checklist.md  # Gate checklist
```

## Integration with AIOX

This squad complements (not duplicates) base AIOX agents:
- **@po** validates individual stories -> **Jeff** validates story QUALITY and epic coherence
- **@qa** validates post-implementation -> **Squad** validates pre-implementation (shift-left)
- **@pm** gathers requirements -> **Marty** validates requirement QUALITY
- **@architect** designs architecture -> **Martin** validates architecture DECISIONS

---

*Product Validation Squad v1.0 -- Orchestrated by Steve*
