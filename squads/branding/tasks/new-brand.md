# Task: New Brand Intake & ZAG Test

**Task ID:** BRAND-001
**Version:** 1.0.0
**Command:** `*new-brand`
**Agent:** Marty Neumeier (Brand Chief)
**Phase:** 1 of 8
**Purpose:** Collect brand briefing through structured intake, craft Onliness Statement, run ZAG differentiation test.

---

## Overview

```
  Client Input
       |
       v
  +------------------+
  | 1. Intake         |
  |    Questionnaire   |
  +------------------+
       |
       v
  +------------------+
  | 2. Craft Onliness |
  |    Statement       |
  +------------------+
       |
       v
  +------------------+
  | 3. ZAG Test       |
  |    17 Checkpoints  |
  +------------------+
       |
       v
  +------------------+
  | 4. GO/NO-GO       |
  |    Decision        |
  +------------------+
       |
       v
  Handoff to Phase 2
  (@david-aaker)
```

---

## Step 1: Intake Questionnaire

**elicit: true** -- Ask the user each question and wait for answers.

### Core Questions

1. **What problem do you solve?** -- Describe the pain point your product/service addresses.
2. **For whom?** -- Who is your primary audience? Be specific beyond demographics.
3. **What exists today?** -- What solutions do people currently use? Who are your competitors?
4. **What makes you different?** -- Why would someone choose you over the alternatives?
5. **What is your ambition?** -- Where do you want this brand to be in 5 years?
6. **What do you stand for?** -- What belief or value drives everything you do?
7. **What is your offering?** -- Products, services, or experiences you provide.
8. **What is your category?** -- The market space you operate in.
9. **Budget & timeline context** -- Any constraints that affect brand scope?
10. **Inspiration** -- Brands you admire (in any industry) and why.

### Output: Intake Brief

Compile answers into a structured brief document.

---

## Step 2: Craft Onliness Statement

Using intake answers, draft the Onliness Statement:

**Template:** `Our [offering] is the only [category] that [differentiator].`

### Validation Criteria

| Criterion | Question | Pass? |
|-----------|----------|-------|
| TRUE | Can you back this up with evidence? | |
| RELEVANT | Does the audience care about this differentiator? | |
| COMPELLING | Does it create desire or curiosity? | |
| DIFFERENT | Can NO competitor honestly claim the same? | |

Iterate until all 4 criteria pass. If the differentiator isn't clear, push back with:
> "That's what you DO. But what makes you the ONLY one doing it THIS way?"

---

## Step 3: ZAG 17-Checkpoint Test

Score each checkpoint 0 (no answer) or 1 (clear answer):

| # | Checkpoint | Answer | Score |
|---|-----------|--------|-------|
| 1 | WHO are you? | | /1 |
| 2 | WHAT do you do? | | /1 |
| 3 | WHAT is your vision? | | /1 |
| 4 | WHAT wave are you riding? | | /1 |
| 5 | WHO shares the brandscape? | | /1 |
| 6 | WHAT makes you the only? | | /1 |
| 7 | WHAT should you add or subtract? | | /1 |
| 8 | WHO loves you? | | /1 |
| 9 | WHO is the enemy? | | /1 |
| 10 | WHAT do they call you? | | /1 |
| 11 | HOW do you explain yourself? | | /1 |
| 12 | HOW do you spread the word? | | /1 |
| 13 | HOW do people engage with you? | | /1 |
| 14 | WHAT do they experience? | | /1 |
| 15 | HOW do you earn their loyalty? | | /1 |
| 16 | HOW do you extend your success? | | /1 |
| 17 | HOW do you protect your portfolio? | | /1 |

**ZAG Score: ___/17**

---

## Step 4: GO/NO-GO Decision

| Score | Decision | Action |
|-------|----------|--------|
| 14-17 | STRONG GO | Proceed to Phase 2 with high confidence |
| 10-13 | GO | Proceed with noted gaps to address |
| 7-9 | CONDITIONAL | Address critical gaps before proceeding |
| 0-6 | NO-GO | Brand needs fundamental rethinking |

---

## Outputs

| Output | Format | Passed To |
|--------|--------|-----------|
| Intake Brief | Structured document | Phase 2 (@david-aaker) |
| Onliness Statement | Single sentence | ALL phases |
| ZAG Score | Number /17 | Phase 8 (@marty-neumeier) |
| Brand Gap Notes | Text | Phase 2 (@david-aaker) |

---

## Handoff

On GO decision, hand off to **@david-aaker** for Phase 2 (Brand Equity Framework):

```
Passing: Intake Brief, Onliness Statement, ZAG Score, Brand Gap Notes
Command: @branding:david-aaker *brand-briefing
```
