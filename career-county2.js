// Career Mode — Tier 2: County 2nd XI. One squad per real county (18
// total), shared between both competitions this tier plays. Not part of
// CAREER_LEAGUES (career-clubs.js) — tier 1 is a draft-time choice, tier 2
// is an automatic promotion once a tier-1 season quota is hit, so it's read
// at promotion time, not character creation.
//
// The 50-Over League and the T20 Cup group the same 18 counties two
// different ways:
//   - 50-Over League: Division 1 (10 teams, 55-60) / Division 2 (8 teams,
//     50-55) — real current league divisions and standings order, with
//     promotion/relegation each season (bottom 2 of Division 1 down, top 2
//     of Division 2 up — see careerApplyCounty2PromotionRelegation in
//     index.html). Division membership is per-career mutable state
//     (CAREER.county2Divisions), seeded from CAREER_COUNTY2_DIVISIONS_INITIAL.
//   - T20 Cup: North/South (the same NORTH/SOUTH arrays index.html already
//     uses, index.html:4183-4184) — a cup, so no promotion/relegation, and
//     the grouping never changes season to season.
// A county's rating is shared between both competitions (CAREER_COUNTY2_RATINGS)
// — it's the same side either way, just grouped differently.

// Fixed per county, from real current 2nd XI league position — Division 1
// order maps 60->55, Division 2 order maps 55->50 (see career-clubs.js:5
// for tier 1's 40-50 club band; this is tier 2 of 7).
const CAREER_COUNTY2_RATINGS = {
  // Division 1 (10), current league position 1st -> 10th
  'Nottinghamshire': 60, 'Somerset': 59, 'Warwickshire': 59, 'Glamorgan': 58,
  'Sussex': 58, 'Essex': 57, 'Surrey': 57, 'Yorkshire': 56, 'Hampshire': 56,
  'Leicestershire': 55,
  // Division 2 (8), current league position 1st -> 8th
  'Durham': 55, 'Kent': 54, 'Northamptonshire': 54, 'Middlesex': 53,
  'Derbyshire': 52, 'Worcestershire': 51, 'Lancashire': 51, 'Gloucestershire': 50,
};

// Starting 50-Over League division split — a career's own
// CAREER.county2Divisions is seeded from this once (at first promotion) and
// then evolves independently per career via promotion/relegation.
const CAREER_COUNTY2_DIVISIONS_INITIAL = {
  division1: ['Nottinghamshire', 'Somerset', 'Warwickshire', 'Glamorgan', 'Sussex', 'Essex', 'Surrey', 'Yorkshire', 'Hampshire', 'Leicestershire'],
  division2: ['Durham', 'Kent', 'Northamptonshire', 'Middlesex', 'Derbyshire', 'Worcestershire', 'Lancashire', 'Gloucestershire'],
};

function careerCounty2TeamName(county) { return `${county} 2nd XI`; }

// Individual-player clamp window for generateClubXI (index.html) when
// generating a tier-2 squad — mirrors tier 1's relationship between its
// clamp window (30-60) and its club band (40-50): roughly 10 below the band
// floor, 10 above the band ceiling. Without this, the top team's players
// would all flatten down to 60 (the default tier-1 clamp ceiling, the same
// number as their own club's target rating), losing all natural spread
// above it.
const CAREER_COUNTY2_CLAMP = { min: 40, max: 70 };
