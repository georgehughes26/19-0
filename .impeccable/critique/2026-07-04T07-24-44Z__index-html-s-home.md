---
target: home screen (s-home, index.html)
total_score: 25
p0_count: 0
p1_count: 2
timestamp: 2026-07-04T07-24-44Z
slug: index-html-s-home
---
Method: dual-agent (A: general-purpose design review · B: general-purpose detector/browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No visible focus indicator on any control |
| 2 | Match System / Real World | 4 | Domain language fits |
| 3 | User Control and Freedom | 2 | No reset-to-default, one-way funnel into the draft |
| 4 | Consistency and Standards | 3 | `.setting-label` eyebrow style contradicts DESIGN.md's own "Broadcast Caps Rule" |
| 5 | Error Prevention | 2 | Team-name field truncates at 20 chars silently, no counter |
| 6 | Recognition Rather Than Recall | 3 | Live setting-desc text is strong; "Rating mode" blue-on-blue carries no meaning |
| 7 | Flexibility and Efficiency | 2 | Settings reset every visit |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and on-brand, but a lot of vertical real estate before CTA |
| 9 | Error Recovery | 2 | No confirmation before irreversible "Start" |
| 10 | Help and Documentation | 1 | No in-context help for budget/respins/rating modes |
| **Total** | | **25/40** | **Acceptable** |

## Anti-Patterns Verdict

LLM assessment: not generic slop overall, but `.setting-label`'s eyebrow style violates the project's own house rule, and the uniform staggered fade-up entrance is a recognizable "AI polish pass" signature.

Deterministic scan: detect.mjs exit 2, 342 file-wide findings, only 3 inside #s-home markup (design-system-color advisories on hidden #continue-test-btn: #0a1420/#1a4060/#406080, undocumented blues). No false positives in scope.

Browser evidence: no overflow/clipping at 375px or desktop; entrance animation settles correctly; no console errors; focus outlines confirmed absent on .mode-btn/.btn-start/.sopt.

## Overall Impression

Good bones (color discipline, live setting-desc pattern, disciplined single gradient use) undercut by a settings wall (4 panels x 2-3 options) fully exposed on first paint, contradicting the "quick casual session" audience in PRODUCT.md.

## What's Working
1. Live setting-desc text removes recall burden.
2. "19-0" hero shimmer used once, subtle, disciplined.
3. Entrance sequence and count-up genuinely respect prefers-reduced-motion.

## Priority Issues

[P1] Settings wall buries the CTA and violates progressive disclosure — 5 of 8 cognitive-load checklist items fail. Fix: collapse Difficulty/Rating Mode/Show Ratings/Draft Mode behind a "Customize" disclosure, defaulted+collapsed on first visit.

[P1] No visible focus state anywhere — .mode-btn/.sopt/.btn-start all resolve outline:none with no :focus-visible replacement. Fix: add :focus-visible ring using #f9c846.

[P2] .setting-label violates the project's own Broadcast Caps Rule (eyebrow style used as a field label, not metadata). Fix: drop to normal-case body weight or explicitly grandfather in DESIGN.md.

[P2] "Rating mode" uses blue for both options — no semantic meaning, breaks pattern from Difficulty panel above. Fix: drop color treatment or give distinct semantics.

[P3] Long team names truncate silently at 20 chars, no counter. Fix: live "14/20" counter once typing starts.

## Persona Red Flags

Jordan (First-Timer): 4 settings panels with terse descriptions, no upfront context on what Hard/Budget change in gameplay.

Riley (Stress Tester): 20 whitespace chars in team-name field leaves visible mismatch vs stored SETTINGS.teamName ("Your XI").

Casey (Distracted Mobile): meaningful scroll distance before Start on 375px, no sticky CTA if interrupted.

## Minor Observations
- Dead/unreachable World Cup mode block ships in bundle.
- #continue-test-btn uses undocumented blue tones outside DESIGN.md palette.
- team-name-input fully inline-styled rather than a CSS class.
