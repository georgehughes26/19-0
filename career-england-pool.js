// Career Mode — Tier 4 (England). The pool of England-eligible players
// excluded from tier 3's county rosters (career-county3-players.js). Not
// wired into index.html or any Career Mode system yet — no England-XI
// selector, promotion-swap chain, or tier-3->tier-4 transition exists yet.
//
// Selection rule: the actual England XI is the top player(s) per role from
// this pool, using the SAME 2 opener / 3 batter / 1 keeper / 2 allrounder /
// 3 bowler split every tier-3 county XI uses (kept consistent across the
// whole mode, per the user). Every pool player who ISN'T selected drops
// down to their own county (see `county` field below), replacing that
// county's current weakest player in the same role for the season — the
// player they bump goes into a floating spare pool with no fixed
// destination, held until some other county has an actual gap.
//
// Mid-career promotion (a genuine county player's rating overtakes an
// England XI player in the same role) works as its own closed three-way
// chain rather than touching the spare pool: promoted player's county (X)
// loses him to England; the England player he replaced (B) goes home to
// HIS OWN county (Y), bumping Y's current weakest same-role player (C); C
// then fills the vacancy at X specifically, not the general spare pool.
//
// `county` is each player's home county — where they land if/when they
// drop out of the England XI, and the county they came from.

const CAREER_ENGLAND_POOL = [
  { name: 'Joe Root',          role: 'batter',      age: 35, bowlStyle: null,   rating: 95, county: 'Yorkshire' },
  { name: 'Harry Brook',       role: 'batter',      age: 27, bowlStyle: null,   rating: 93, county: 'Yorkshire' },
  { name: 'Jofra Archer',      role: 'bowler',      age: 31, bowlStyle: 'seam', rating: 91, county: 'Sussex' },
  { name: 'Jos Buttler',       role: 'keeper',      age: 35, bowlStyle: null,   rating: 90, county: 'Lancashire' },
  { name: 'Ben Duckett',       role: 'opener',      age: 31, bowlStyle: null,   rating: 90, county: 'Nottinghamshire' },
  { name: 'Adil Rashid',       role: 'bowler',      age: 38, bowlStyle: 'spin', rating: 89, county: 'Yorkshire' },
  { name: 'Jamie Smith',       role: 'keeper',      age: 26, bowlStyle: null,   rating: 89, county: 'Surrey' },
  { name: 'Gus Atkinson',      role: 'bowler',      age: 28, bowlStyle: 'seam', rating: 88, county: 'Surrey' },
  { name: 'Phil Salt',         role: 'opener',      age: 29, bowlStyle: null,   rating: 87, county: 'Lancashire' },
  { name: 'Jacob Bethell',     role: 'allrounder',  age: 22, bowlStyle: 'spin', rating: 87, county: 'Warwickshire' },
  { name: 'Ollie Pope',        role: 'batter',      age: 28, bowlStyle: null,   rating: 86, county: 'Surrey' },
  { name: 'Brydon Carse',      role: 'allrounder',  age: 31, bowlStyle: 'seam', rating: 86, county: 'Durham' },
  { name: 'Mark Wood',         role: 'bowler',      age: 36, bowlStyle: 'seam', rating: 86, county: 'Durham' },
  { name: 'Sam Curran',        role: 'allrounder',  age: 28, bowlStyle: 'seam', rating: 85, county: 'Surrey' },
  { name: 'Will Jacks',        role: 'allrounder',  age: 27, bowlStyle: 'spin', rating: 85, county: 'Surrey' },
  { name: 'Josh Tongue',       role: 'bowler',      age: 28, bowlStyle: 'seam', rating: 85, county: 'Nottinghamshire' },
  { name: 'Tom Banton',        role: 'keeper',      age: 27, bowlStyle: null,   rating: 84, county: 'Somerset' },
  { name: 'Rehan Ahmed',       role: 'allrounder',  age: 22, bowlStyle: 'spin', rating: 84, county: 'Leicestershire' },
  { name: 'Reece Topley',      role: 'bowler',      age: 32, bowlStyle: 'seam', rating: 84, county: 'Surrey' },
  { name: 'Zak Crawley',       role: 'opener',      age: 28, bowlStyle: null,   rating: 83, county: 'Kent' },
  { name: 'Jamie Overton',     role: 'allrounder',  age: 32, bowlStyle: 'seam', rating: 83, county: 'Surrey' },
  { name: 'Jordan Cox',        role: 'keeper',      age: 25, bowlStyle: null,   rating: 83, county: 'Essex' },
  { name: 'Saqib Mahmood',     role: 'bowler',      age: 29, bowlStyle: 'seam', rating: 83, county: 'Lancashire' },
  { name: 'Matthew Potts',     role: 'bowler',      age: 27, bowlStyle: 'seam', rating: 82, county: 'Durham' },
  { name: 'Luke Wood',         role: 'bowler',      age: 31, bowlStyle: 'seam', rating: 82, county: 'Lancashire' },
  { name: 'Tom Hartley',       role: 'allrounder',  age: 27, bowlStyle: 'spin', rating: 81, county: 'Lancashire' },
  { name: 'Henry Crocombe',    role: 'bowler',      age: 24, bowlStyle: 'seam', rating: 80, county: 'Sussex' },
];
