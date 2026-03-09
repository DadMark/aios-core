# Pre-Implementation Validation Checklist

Comprehensive checklist for the pre-implementation gate. All items must be validated before development begins.

## 1. Requirements Validation (Marty)

- [ ] PRD reviewed using four-risk framework (Value, Usability, Feasibility, Viability)
- [ ] All requirements are outcome-focused (not output-focused)
- [ ] Evidence exists for each requirement (user research, data, or validated assumption)
- [ ] No Invention compliance verified (Constitution Article IV)
- [ ] Requirements are testable and unambiguous
- [ ] Solution-agnostic (WHAT not HOW)

## 2. Story Quality (Jeff)

- [ ] All stories pass INVEST criteria
- [ ] Acceptance criteria are testable with clear pass/fail
- [ ] Stories are vertical slices (not horizontal layers)
- [ ] Story map shows coherent user narrative
- [ ] Walking skeleton identified for Sprint 1
- [ ] Dependencies explicitly listed with no circular chains

## 3. MVP Scope (Eric)

- [ ] Each feature maps to a testable hypothesis
- [ ] Measurement approach defined for each feature
- [ ] Complexity assessment completed (SIMPLE/STANDARD/COMPLEX)
- [ ] Nice-to-haves separated from essentials
- [ ] Scope preserves pivot readiness
- [ ] Team can deliver in target timeframe

## 4. Risk Profile (Nassim)

- [ ] Fragility assessment completed for all subsystems
- [ ] No CRITICAL risks without mitigation
- [ ] Tail risks identified and acknowledged
- [ ] Rollback strategy defined for reversible changes
- [ ] Via negativa applied (removed unnecessary fragilities)
- [ ] Skin in the game -- accountability for risk decisions clear

## 5. UX Validation (Don)

- [ ] Norman's 7 principles reviewed for key user flows
- [ ] WCAG AA compliance checked (POUR framework)
- [ ] Error states designed with constraints (not just error messages)
- [ ] User journey has clear entry, task, exit, and recovery points
- [ ] No color-only information conveyance

## 6. Architecture Review (Martin)

- [ ] Architecture decisions documented with trade-offs
- [ ] Patterns appropriate for problem context and team
- [ ] Coupling minimized between modules
- [ ] Architecture supports evolutionary change
- [ ] No architectural smells (God Module, Distributed Monolith, etc.)
- [ ] Technical debt is deliberate and tracked (not accidental)

## 7. Release Readiness (Gene)

- [ ] Quality gates defined (tests, lint, types, build)
- [ ] Migration strategy is reversible
- [ ] Rollback plan exists and is executable
- [ ] Monitoring and health checks planned
- [ ] Deployment batch size is appropriate

## Gate Decision

| Score | Verdict |
|-------|---------|
| >= 7.0 avg, no blockers | **GO** -- Proceed to implementation |
| >= 5.5 avg, no blockers | **CONDITIONAL-GO** -- Proceed with conditions |
| < 5.5 avg OR blockers | **NO-GO** -- Fix issues first |

**Decision:** _______________
**Date:** _______________
**Validated by:** _______________
