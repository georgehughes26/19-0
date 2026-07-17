---
name: find-sponsors
description: Research new sport-adjacent brand sponsorship leads for 19-0, verify their real contact route, draft a personalized pitch email for each, clean the copy, and save to a text file for the user to manually copy/paste and send. Use when the user asks to find more sponsors, brand leads, or partnership prospects for 19-0. Never sends anything automatically.
---

# Find Sponsors

Run this whenever the user asks for a new batch of sponsorship leads for 19-0 (e.g. "find more sponsors," "get me some new leads," "run the sponsor finder"). This is research and drafting only — nothing is ever sent automatically. The user reviews and sends each one manually.

## Context

- 19-0 is a free, mobile-first cricket draft-and-simulation game, pitching itself for brand sponsorships (banner placements, interstitial pop-ups, in-game naming rights, draft/loading-screen sponsorship).
- Live stats are in `PARTNER_STATS` inside `index.html` (search for `const PARTNER_STATS`). Always read this fresh, never reuse numbers from a previous run.
- The public pitch page is `https://www.19-0.co.uk/partners.html`. It links through to `https://www.19-0.co.uk/?partners=1` for the live interactive version inside the game itself — that deep link is what's been used in emails already sent, so never change or remove it, just use the new `partners.html` URL for new outreach going forward.
- Scope: prioritise cricket-adjacent brands first (cricket bat/gear/apparel DTC brands, cricket media/analytics/streaming products, cricket-specific nutrition/hydration). Once good cricket options run low, broaden to sport generally: hydration/energy drink brands (especially challenger brands already sponsoring emerging/lesser-known teams in any sport), general sports apparel/gear DTC brands, sports nutrition/supplement brands, novelty/lifestyle DTC brands with a history of any sports sponsorship (the existing partner, OddBalls, is exactly this kind of brand). Stay within sport.
- Exclude: gambling/betting brands (legal/ethical complexity), and any direct competitor (other cricket or sports simulation/fantasy apps).

## Step 1 — Load the dedup log

Read `outreach/contacted-leads.json` in the repo root (create it as `[]` if it doesn't exist). This lists every brand ever researched by this skill, successful or not. Never re-research or re-pitch a brand already in it.

## Step 2 — Find new candidates

Use WebSearch to find brands not already in the log, following the priority order above. Aim for up to 10 new qualifying leads per run — stop at 10, or once a genuinely thorough pass turns up nothing more. Don't pad with weak fits to hit a number. Unless the user asked for a specific count, default to 10.

A qualifying lead is a real, currently-operating brand with its own official website, verified by fetching it directly — never a data-broker listing or third-party guess.

## Step 3 — Verify each candidate's real contact route

For each candidate, use WebFetch on their actual official site (homepage, then contact/get-in-touch page if linked):
- If they publish a genuine public email for partnerships/marketing/press/general enquiries **on their own site**, use it.
- If they only offer a contact form, record the exact form URL instead.
- Never fabricate or guess an email address, and never trust a third-party email-lookup/verification service's guess. Form-only is a fine, honest outcome — record it as such.

## Step 4 — Draft a personalized pitch per lead

Use this exact structure and voice (established, the user likes it — casual British tone, founder story, bullet stats):

```
Subject: Partnership opportunity — 19-0 x {Brand}

Hi {Brand} team,

I'm George, the creator of 19-0 (19-0.co.uk), a cricket drafting simulator that's gained real traction since launching in mid-June. What started as a side project as a 22-year-old has spiralled into something a lot bigger, and it's not stopping.

Since launch:
– {activePlayers} active players
– {blastDrafts} T20 Blast drafts played
– {testDrafts} Test Mode drafts played
– {spins}+ spins
– Avg session time: 4m 45s

{One sentence connecting the brand's own existing sponsorship/marketing activity to 19-0's audience — specific to that brand, not generic. For non-cricket sport brands, frame honestly (e.g. crossover sports fans, first-mover access to an untapped cricket audience) rather than implying they already reach cricket fans if they don't.}

The link below opens on the partners page, showing what we can offer: banner placements, interstitial pop-ups, in-game naming rights, and draft/loading screen sponsorship. Press home from there to jump into the game itself.

19-0.co.uk/partners.html

Keen to hear if there's a fit on your end. Happy to put together some options and rates once I know what you're after.

Cheers,
George
19-0
```

Pull `{activePlayers}`/`{blastDrafts}`/`{testDrafts}`/`{spins}` from the live `PARTNER_STATS` read in Step 1, formatted with commas (e.g. `30,000`).

## Step 5 — Clean the copy

Apply before saving anything, no exceptions:
- No em dashes. Use a period, colon, or comma instead.
- Don't let more than one lead in the batch end its personalization line on the same phrase — vary it lead to lead.
- Cut filler adverbs ("really," "genuinely," "very," "actually") unless removing one changes the meaning.
- Every sentence needs a real subject doing something — no passive voice.
- Vary sentence length; no three same-length sentences in a row.

## Step 6 — Save

- Append the batch to `outreach/sponsor-outreach-drafts.txt` (read the existing file first to match its exact format), or write a new dated file `outreach/leads-YYYY-MM-DD.txt` if the user prefers to keep batches separate — ask if unclear.
- Append every new *contactable* lead (name, domain, sport/category, date found, contact route) to `outreach/contacted-leads.json`. Only real leads that made it into the draft file go in this log — never add rejected candidates (weak fit, no verifiable site, too corporate, etc.) to it. This means a rejected brand may resurface in a later run and get reconsidered; that's an accepted tradeoff for keeping the log to only real, contactable prospects.
- Tell the user where the file is and how many new leads were found, plus a one-line mention of anything notable that got ruled out this run (so they know it was considered) — just don't persist those rejects into the log itself.

## Hard constraints (never violate)

- Never send an email, message, or contact form submission to anyone — drafting only.
- Never use any email-sending tool or MCP connector for this task.
- Never fabricate a contact email.
- Never re-research or re-pitch a brand already in `outreach/contacted-leads.json`.
- Never include gambling/betting brands or direct competitor apps as leads.
