# Task: Brand Equity Briefing

**Task ID:** BRAND-002
**Version:** 1.0.0
**Command:** `*brand-briefing`
**Agent:** David Aaker (Account Director)
**Phase:** 2 of 8
**Purpose:** Transform raw intake into structured Brand Equity Framework and Strategic Brand Brief.

---

## Overview

```
  Intake Brief (Phase 1)
       |
       v
  +----------------------+
  | 1. Equity Assessment  |
  |    4 Dimensions       |
  +----------------------+
       |
       v
  +----------------------+
  | 2. Brand Identity     |
  |    Core + Extended    |
  +----------------------+
       |
       v
  +----------------------+
  | 3. Architecture       |
  |    Model Selection    |
  +----------------------+
       |
       v
  +----------------------+
  | 4. Strategic Brief    |
  |    Full Document      |
  +----------------------+
       |
       v
  Handoff to Phase 3
  (@malcolm-gladwell)
```

---

## Inputs

| Input | Source | Required |
|-------|--------|----------|
| Intake Brief | Phase 1 (@marty-neumeier) | Yes |
| Onliness Statement | Phase 1 | Yes |
| ZAG Score | Phase 1 | Yes |
| Brand Gap Notes | Phase 1 | No |

---

## Step 1: Brand Equity Assessment

Assess the 4 dimensions of brand equity. For new brands, assess target state.

### 1.1 Brand Awareness

| Level | Current/Target | Notes |
|-------|---------------|-------|
| Unaware | | |
| Recognition | | |
| Recall | | |
| Top of Mind | | |

### 1.2 Perceived Quality

| Dimension | Score (1-5) | Notes |
|-----------|------------|-------|
| Product/service quality | | |
| Category comparison | | |
| Quality signals | | |

### 1.3 Brand Associations

| Type | Associations |
|------|-------------|
| Functional | |
| Emotional | |
| Self-expressive | |

### 1.4 Brand Loyalty

| Level | Target | Strategy |
|-------|--------|----------|
| Switcher | | |
| Habitual | | |
| Satisfied | | |
| Committed | | |
| Advocate | | |

---

## Step 2: Brand Identity System

### Core Identity (2-4 dimensions -- timeless)

| Dimension | Description |
|-----------|-------------|
| | |

### Extended Identity (texture and completeness)

| Element | Description |
|---------|-------------|
| Personality | |
| Relationship | |
| Culture | |
| Reflection | |

### Brand Essence (single thought)

> [One sentence that captures the brand's soul]

### Value Proposition

| Level | Proposition |
|-------|-------------|
| Functional | What the brand DOES for you |
| Emotional | How the brand makes you FEEL |
| Self-expressive | What the brand says about YOU |

---

## Step 3: Brand Architecture

Select the appropriate model:

| Model | Fit? | Rationale |
|-------|------|-----------|
| Branded House | | |
| House of Brands | | |
| Endorsed Brands | | |
| Sub-Brands | | |

**Selected Model:** _______________

---

## Step 4: Strategic Brand Brief

Compile all sections into the Strategic Brand Brief document:

1. **Brand Vision** -- Where is the brand going?
2. **Target Audience** -- Detailed profiles (for Malcolm Gladwell to expand)
3. **Competitive Landscape** -- Key competitors and positioning
4. **Brand Equity Baseline** -- 4-dimension assessment
5. **Onliness Statement** -- From Phase 1
6. **Brand Identity** -- Core + Extended + Essence
7. **Value Proposition** -- Functional / Emotional / Self-expressive
8. **Brand Architecture** -- Selected model and rationale
9. **Success Metrics** -- How to measure equity growth
10. **Creative Direction Guardrails** -- Strategic constraints for Phases 5-7

---

## Outputs

| Output | Format | Passed To |
|--------|--------|-----------|
| Strategic Brand Brief | Full document | Phase 3 (@malcolm-gladwell) |
| Equity Baseline | 4-dimension scores | Phase 8 (@marty-neumeier) |
| Identity System | Core + Extended + Essence | Phases 5, 6, 7 |
| Architecture Model | Selection + rationale | Phase 8 |

---

## Handoff

On completion, hand off to **@malcolm-gladwell** for Phase 3 (Audience Research):

```
Passing: Strategic Brand Brief, Equity Baseline, Target Audience definition
Command: @branding:malcolm-gladwell *audience-research
```
