# Product

## Register

product

## Users

Casual, mobile-first cricket fans who dip in for a quick session during downtime — draft an all-time XI from real players across eras (county T20 Blast, Test, or the World Cup mode), then play through a season or tournament (group stage, knockouts, finals). Sessions are short and thumb-driven; the core loop (spin/draft, pick XI, sim match, see result) needs to work cleanly one-handed on a phone.

## Product Purpose

19-0 is a fan-made cricket draft-and-simulation game. Players build a "dream XI" by spinning through real players from any era and nation, then live out a full campaign — match sim, form swings, injuries and off-pitch events, season reviews — culminating in a shareable result. Success looks like: a player finishes a run, feels either vindicated or robbed by the outcome, and wants to run it back or share their season card.

## Brand Personality

Electric, nostalgic, competitive. The feel is a mix of live cricket broadcast energy (scorecards, ratings badges, "breaking news" event screens, match presentation) and warmth for celebrating the actual players and eras being drafted — this isn't a clinical stats tool, it's closer to flicking through a highlights reel of players who never shared a pitch.

## Anti-references

Generic SaaS/dashboard aesthetics — cream/beige neutral palettes, flat identical card grids, tiny uppercase tracked eyebrows, corporate admin-tool polish. Also avoid tipping into an overly serious "official league website" tone; this should read as a scrappy, fan-made passion project, not a governing body's site.

Note: the current home hero ("19-0") uses gradient text (`background-clip: text`), which the design skill's own house rules flag as an anti-pattern. Leaving it as-is for now since it's an established piece of brand identity — flagging here rather than silently changing it, in case a future `/impeccable polish` pass should revisit it.

## Design Principles

1. **Feel like a broadcast, not a spreadsheet.** Every screen should read like sports coverage — scorecards, commentary, pundit quotes — not admin tooling, even where the underlying data is dense.
2. **Every run tells a story.** Season reviews, quotes, performance verdicts, and off-pitch events matter as much as the raw numbers; players should remember *a run*, not just a score.
3. **One thumb, no friction.** The core loop (draft → pick XI → sim → result) must work in a single mobile session without desktop-only affordances.
4. **Respect the fan, not just the stats.** Nostalgia for the players and eras being referenced is as important as competitive stakes.
5. **Motion earns its place.** Animation should feel like part of the broadcast presentation (stat reveals, stagger, glisten) — never gratuitous, always gated behind `prefers-reduced-motion`.

## Accessibility & Inclusion

Standard best-effort contrast and readability; no formal WCAG compliance target (this is a hobby fan project, not a regulated product). `prefers-reduced-motion` should be respected across all animated UI going forward, consistent with the pattern already established on the season review and home screens.
