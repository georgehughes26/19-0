// Career Mode — Tier 3 (Full County) real player rosters. Draft data,
// collected county-by-county from the user — not yet wired into
// index.html or any Career Mode system (no tier-3 XI builder, promotion
// clamp, aging, transfer, or retirement logic exists yet).
//
// Rating scale: 65-85. County-only — no player who's in the England setup
// appears here (that's reserved for a future England-level tier). The
// tracked player's own rating gets deliberately clamped below 65 at
// tier2->tier3 promotion so they're guaranteed to be the weakest player in
// the league on debut, regardless of what they carried over from tier 2.
//
// role is 5-way, not the 4-way batter/keeper/allrounder/bowler tier 1/2
// generated squads use: "opener" is kept distinct from "batter" because the
// two opener-tagged players per county MUST be seated at batting positions
// 1 and 2 in the built XI, not left to fall out of a rating sort with the
// rest of the specialist batters.
//
// bowlStyle is 'seam' | 'spin' | null (null for opener/batter/keeper).
// Exactly 11 players per county, no bench — transfers move real players
// county-to-county; AI-generated replacements only enter at retirement.

const CAREER_COUNTY3_PLAYERS = {
  Yorkshire: [
    { name: 'Adam Lyth',        role: 'opener',     age: 38, bowlStyle: null,   rating: 75 },
    { name: 'Finlay Bean',      role: 'opener',     age: 24, bowlStyle: null,   rating: 74 },
    { name: 'James Wharton',    role: 'batter',      age: 25, bowlStyle: null,   rating: 73 },
    { name: 'Sam Whiteman',     role: 'batter',      age: 34, bowlStyle: null,   rating: 72 },
    { name: 'Will Luxton',      role: 'batter',      age: 23, bowlStyle: null,   rating: 74 },
    { name: 'Jonny Bairstow',   role: 'keeper',      age: 36, bowlStyle: null,   rating: 81 },
    { name: 'George Hill',      role: 'allrounder',  age: 25, bowlStyle: 'seam', rating: 75 },
    { name: 'Matthew Revis',    role: 'allrounder',  age: 24, bowlStyle: 'seam', rating: 73 },
    { name: 'Jhye Richardson',  role: 'bowler',      age: 29, bowlStyle: 'seam', rating: 79 },
    { name: 'Ben Coad',         role: 'bowler',      age: 32, bowlStyle: 'seam', rating: 76 },
    { name: 'Dom Bess',         role: 'bowler',      age: 29, bowlStyle: 'spin', rating: 73 },
  ],

  Nottinghamshire: [
    { name: 'Haseeb Hameed',           role: 'opener',     age: 29, bowlStyle: null,   rating: 79 },
    { name: 'Ben Slater',              role: 'opener',     age: 34, bowlStyle: null,   rating: 76 },
    { name: 'Kyle Verreynne',          role: 'batter',      age: 29, bowlStyle: null,   rating: 79 },
    { name: 'Jack Haynes',             role: 'batter',      age: 25, bowlStyle: null,   rating: 74 },
    { name: 'Freddie McCann',          role: 'batter',      age: 21, bowlStyle: null,   rating: 74 },
    { name: 'Joe Clarke',              role: 'keeper',      age: 30, bowlStyle: null,   rating: 78 },
    { name: 'Lyndon James',            role: 'allrounder',  age: 27, bowlStyle: 'seam', rating: 76 },
    { name: 'Liam Patterson-White',    role: 'allrounder',  age: 27, bowlStyle: 'spin', rating: 76 },
    { name: "Fergus O'Neill",          role: 'bowler',      age: 25, bowlStyle: 'seam', rating: 80 },
    { name: 'Olly Stone',              role: 'bowler',      age: 32, bowlStyle: 'seam', rating: 77 },
    { name: 'Brett Hutton',            role: 'bowler',      age: 33, bowlStyle: 'seam', rating: 75 },
  ],

  Somerset: [
    { name: 'Joshua Thomas',           role: 'opener',     age: 21, bowlStyle: null,   rating: 71 },
    { name: 'Tom Lammonby',            role: 'opener',     age: 26, bowlStyle: null,   rating: 74 },
    { name: 'Tom Abell',               role: 'batter',      age: 32, bowlStyle: null,   rating: 78 },
    { name: 'Will Smeed',              role: 'batter',      age: 24, bowlStyle: null,   rating: 74 },
    { name: 'Thomas Rew',              role: 'batter',      age: 19, bowlStyle: null,   rating: 78 },
    { name: 'James Rew',               role: 'keeper',      age: 22, bowlStyle: null,   rating: 80 },
    { name: 'Lewis Gregory',           role: 'allrounder',  age: 34, bowlStyle: 'seam', rating: 78 },
    { name: 'Archie Vaughan',          role: 'allrounder',  age: 20, bowlStyle: 'spin', rating: 75 },
    { name: 'Craig Overton',           role: 'bowler',      age: 32, bowlStyle: 'seam', rating: 80 },
    { name: 'Jack Leach',              role: 'bowler',      age: 35, bowlStyle: 'spin', rating: 79 },
    { name: 'Migael Pretorius',        role: 'bowler',      age: 31, bowlStyle: 'seam', rating: 75 },
  ],

  Warwickshire: [
    { name: 'Rob Yates',               role: 'opener',     age: 26, bowlStyle: null,   rating: 75 },
    { name: 'Kai Smith',               role: 'opener',     age: 22, bowlStyle: null,   rating: 73 },
    { name: 'Sam Hain',                role: 'batter',      age: 31, bowlStyle: null,   rating: 78 },
    { name: 'Dan Mousley',             role: 'batter',      age: 25, bowlStyle: null,   rating: 73 },
    { name: 'Zen Malik',               role: 'batter',      age: 24, bowlStyle: null,   rating: 70 },
    { name: 'Alex Davies',             role: 'keeper',      age: 31, bowlStyle: null,   rating: 76 },
    { name: 'Beau Webster',            role: 'allrounder',  age: 32, bowlStyle: 'seam', rating: 79 },
    { name: 'Ed Barnard',              role: 'allrounder',  age: 30, bowlStyle: 'seam', rating: 80 },
    { name: 'Chris Woakes',            role: 'bowler',      age: 37, bowlStyle: 'seam', rating: 82 },
    { name: 'Jordan Thompson',         role: 'bowler',      age: 29, bowlStyle: 'seam', rating: 75 },
    { name: 'Michael Booth',           role: 'bowler',      age: 25, bowlStyle: 'seam', rating: 74 },
  ],

  Sussex: [
    { name: 'Tom Haines',              role: 'opener',     age: 27, bowlStyle: null,   rating: 78 },
    { name: 'Tom Clark',               role: 'opener',     age: 25, bowlStyle: null,   rating: 74 },
    { name: 'Daniel Hughes',           role: 'batter',      age: 37, bowlStyle: null,   rating: 77 },
    { name: 'Jack Leaning',            role: 'batter',      age: 32, bowlStyle: null,   rating: 74 },
    { name: 'Tom Alsop',               role: 'batter',      age: 30, bowlStyle: null,   rating: 74 },
    { name: 'John Simpson',            role: 'keeper',      age: 38, bowlStyle: null,   rating: 78 },
    { name: 'James Coles',             role: 'allrounder',  age: 22, bowlStyle: 'spin', rating: 82 },
    { name: 'Fynn Hudson-Prentice',    role: 'allrounder',  age: 30, bowlStyle: 'seam', rating: 75 },
    { name: 'Ollie Robinson',          role: 'bowler',      age: 32, bowlStyle: 'seam', rating: 81 },
    { name: 'Jaydev Unadkat',          role: 'bowler',      age: 34, bowlStyle: 'seam', rating: 79 },
    { name: 'Jack Carson',             role: 'bowler',      age: 25, bowlStyle: 'spin', rating: 76 },
  ],

  Essex: [
    { name: 'Paul Walter',             role: 'opener',     age: 30, bowlStyle: null,   rating: 75 },
    { name: 'Dean Elgar',              role: 'opener',     age: 39, bowlStyle: null,   rating: 82 },
    { name: 'Tom Westley',             role: 'batter',      age: 37, bowlStyle: null,   rating: 79 },
    { name: 'Charlie Allison',         role: 'batter',      age: 21, bowlStyle: null,   rating: 74 },
    { name: 'Noah Thain',              role: 'batter',      age: 22, bowlStyle: null,   rating: 73 },
    { name: 'Michael Pepper',          role: 'keeper',      age: 28, bowlStyle: null,   rating: 74 },
    { name: 'Matt Critchley',          role: 'allrounder',  age: 29, bowlStyle: 'spin', rating: 79 },
    { name: 'Simon Harmer',            role: 'allrounder',  age: 37, bowlStyle: 'spin', rating: 82 },
    { name: 'Sam Cook',                role: 'bowler',      age: 29, bowlStyle: 'seam', rating: 81 },
    { name: 'Jamie Porter',            role: 'bowler',      age: 33, bowlStyle: 'seam', rating: 76 },
    { name: 'Shane Snater',            role: 'bowler',      age: 30, bowlStyle: 'seam', rating: 75 },
  ],

  Surrey: [
    { name: 'Rory Burns',              role: 'opener',     age: 35, bowlStyle: null,   rating: 79 },
    { name: 'Dom Sibley',              role: 'opener',     age: 30, bowlStyle: null,   rating: 82 },
    { name: 'Dan Lawrence',            role: 'batter',      age: 29, bowlStyle: null,   rating: 83 },
    { name: 'Ryan Patel',              role: 'batter',      age: 28, bowlStyle: null,   rating: 74 },
    { name: 'Adam Thomas',             role: 'batter',      age: 21, bowlStyle: null,   rating: 72 },
    { name: 'Ben Foakes',              role: 'keeper',      age: 33, bowlStyle: null,   rating: 81 },
    { name: 'Sean Abbott',             role: 'allrounder',  age: 34, bowlStyle: 'seam', rating: 79 },
    { name: 'Jordan Clark',            role: 'allrounder',  age: 35, bowlStyle: 'seam', rating: 76 },
    { name: 'Dan Worrall',             role: 'bowler',      age: 35, bowlStyle: 'seam', rating: 82 },
    { name: 'Matt Fisher',             role: 'bowler',      age: 28, bowlStyle: 'seam', rating: 78 },
    { name: 'Rahul Chahar',            role: 'bowler',      age: 27, bowlStyle: 'spin', rating: 77 },
  ],

  Hampshire: [
    { name: 'Toby Albert',             role: 'opener',     age: 24, bowlStyle: null,   rating: 74 },
    { name: 'Nick Gubbins',            role: 'opener',     age: 32, bowlStyle: null,   rating: 77 },
    { name: 'James Vince',             role: 'batter',      age: 35, bowlStyle: null,   rating: 80 },
    { name: 'Tom Prest',               role: 'batter',      age: 23, bowlStyle: null,   rating: 74 },
    { name: 'Ben Mayes',               role: 'batter',      age: 18, bowlStyle: null,   rating: 72 },
    { name: 'Ben Brown',               role: 'keeper',      age: 37, bowlStyle: null,   rating: 75 },
    { name: 'Liam Dawson',             role: 'allrounder',  age: 36, bowlStyle: 'spin', rating: 81 },
    { name: 'Delano Potgieter',        role: 'allrounder',  age: 29, bowlStyle: 'seam', rating: 73 },
    { name: 'Kyle Abbott',             role: 'bowler',      age: 39, bowlStyle: 'seam', rating: 81 },
    { name: 'Sonny Baker',             role: 'bowler',      age: 23, bowlStyle: 'seam', rating: 77 },
    { name: 'Eddie Jack',              role: 'bowler',      age: 22, bowlStyle: 'seam', rating: 73 },
  ],

  Worcestershire: [
    { name: 'Jake Libby',              role: 'opener',     age: 33, bowlStyle: null,   rating: 77 },
    { name: 'Daniel Lategan',          role: 'opener',     age: 20, bowlStyle: null,   rating: 73 },
    { name: 'Kashif Ali',              role: 'batter',      age: 27, bowlStyle: null,   rating: 74 },
    { name: 'Adam Hose',               role: 'batter',      age: 33, bowlStyle: null,   rating: 75 },
    { name: 'Matthew Waite',           role: 'batter',      age: 30, bowlStyle: null,   rating: 75 },
    { name: 'Gareth Roderick',         role: 'keeper',      age: 34, bowlStyle: null,   rating: 76 },
    { name: "Brett D'Oliveira",        role: 'allrounder',  age: 34, bowlStyle: 'spin', rating: 78 },
    { name: 'Ethan Brookes',           role: 'allrounder',  age: 25, bowlStyle: 'seam', rating: 75 },
    { name: 'Tom Taylor',              role: 'bowler',      age: 31, bowlStyle: 'seam', rating: 77 },
    { name: 'Beyers Swanepoel',        role: 'bowler',      age: 26, bowlStyle: 'seam', rating: 74 },
    { name: 'Oliver Hannon-Dalby',     role: 'bowler',      age: 37, bowlStyle: 'seam', rating: 76 },
  ],

  Durham: [
    { name: 'Alex Lees',               role: 'opener',     age: 33, bowlStyle: null,   rating: 79 },
    { name: 'Ben McKinney',            role: 'opener',     age: 21, bowlStyle: null,   rating: 75 },
    { name: 'Emilio Gay',              role: 'batter',      age: 26, bowlStyle: null,   rating: 77 },
    { name: 'David Bedingham',         role: 'batter',      age: 32, bowlStyle: null,   rating: 84 },
    { name: 'Colin Ackermann',         role: 'batter',      age: 35, bowlStyle: null,   rating: 77 },
    { name: 'Ollie Robinson',          role: 'keeper',      age: 27, bowlStyle: null,   rating: 77 },
    { name: 'Will Rhodes',             role: 'allrounder',  age: 31, bowlStyle: 'seam', rating: 74 },
    { name: 'Kasey Aldridge',          role: 'allrounder',  age: 25, bowlStyle: 'seam', rating: 73 },
    { name: 'Kemar Roach',             role: 'bowler',      age: 38, bowlStyle: 'seam', rating: 80 },
    { name: 'Ben Raine',               role: 'bowler',      age: 34, bowlStyle: 'seam', rating: 77 },
    { name: 'Callum Parkinson',        role: 'bowler',      age: 29, bowlStyle: 'spin', rating: 74 },
  ],

  Kent: [
    { name: 'Ben Compton',             role: 'opener',     age: 32, bowlStyle: null,   rating: 78 },
    { name: 'Daniel Bell-Drummond',    role: 'opener',     age: 33, bowlStyle: null,   rating: 77 },
    { name: 'Tawanda Muyeye',          role: 'batter',      age: 25, bowlStyle: null,   rating: 78 },
    { name: 'Sam Northeast',           role: 'batter',      age: 36, bowlStyle: null,   rating: 76 },
    { name: 'Harry Dawkins',           role: 'batter',      age: 22, bowlStyle: null,   rating: 72 },
    { name: 'Chris Benjamin',          role: 'keeper',      age: 27, bowlStyle: null,   rating: 77 },
    { name: 'Joey Evison',             role: 'allrounder',  age: 24, bowlStyle: 'seam', rating: 76 },
    { name: 'Senuran Muthusamy',       role: 'allrounder',  age: 31, bowlStyle: 'spin', rating: 76 },
    { name: 'Matt Milnes',             role: 'bowler',      age: 32, bowlStyle: 'seam', rating: 81 },
    { name: 'Keith Dudgeon',           role: 'bowler',      age: 25, bowlStyle: 'seam', rating: 76 },
    { name: 'Matt Parkinson',          role: 'bowler',      age: 29, bowlStyle: 'spin', rating: 75 },
  ],

  Northamptonshire: [
    { name: 'Ricardo Vasconcelos',     role: 'opener',     age: 28, bowlStyle: null,   rating: 78 },
    { name: 'Luke Procter',            role: 'opener',     age: 38, bowlStyle: null,   rating: 75 },
    { name: 'Saif Zaib',               role: 'batter',      age: 28, bowlStyle: null,   rating: 80 },
    { name: 'Nathan McSweeney',        role: 'batter',      age: 27, bowlStyle: null,   rating: 78 },
    { name: 'Louis Kimber',            role: 'batter',      age: 29, bowlStyle: null,   rating: 74 },
    { name: 'Lewis McManus',           role: 'keeper',      age: 31, bowlStyle: null,   rating: 74 },
    { name: 'Calvin Harrison',         role: 'allrounder',  age: 28, bowlStyle: 'spin', rating: 77 },
    { name: 'David Willey',            role: 'allrounder',  age: 36, bowlStyle: 'seam', rating: 78 },
    { name: 'Ben Sanderson',           role: 'bowler',      age: 37, bowlStyle: 'seam', rating: 77 },
    { name: 'Harry Conway',            role: 'bowler',      age: 34, bowlStyle: 'seam', rating: 76 },
    { name: 'Liam Guthrie',            role: 'bowler',      age: 30, bowlStyle: 'seam', rating: 76 },
  ],

  Middlesex: [
    { name: 'Sam Robson',              role: 'opener',     age: 37, bowlStyle: null,   rating: 76 },
    { name: 'Ben Geddes',              role: 'opener',     age: 25, bowlStyle: null,   rating: 76 },
    { name: 'Max Holden',              role: 'batter',      age: 28, bowlStyle: null,   rating: 79 },
    { name: 'Leus du Plooy',           role: 'batter',      age: 31, bowlStyle: null,   rating: 76 },
    { name: 'Caleb Falconer',          role: 'batter',      age: 22, bowlStyle: null,   rating: 71 },
    { name: 'Joe Cracknell',           role: 'keeper',      age: 26, bowlStyle: null,   rating: 74 },
    { name: 'Ryan Higgins',            role: 'allrounder',  age: 31, bowlStyle: 'seam', rating: 78 },
    { name: 'Zafar Gohar',             role: 'allrounder',  age: 31, bowlStyle: 'spin', rating: 78 },
    { name: 'Tom Helm',                role: 'bowler',      age: 33, bowlStyle: 'seam', rating: 76 },
    { name: 'Toby Roland-Jones',       role: 'bowler',      age: 38, bowlStyle: 'seam', rating: 74 },
    { name: 'Naavya Sharma',           role: 'bowler',      age: 20, bowlStyle: 'seam', rating: 74 },
  ],

  Derbyshire: [
    { name: 'Harry Came',              role: 'opener',     age: 27, bowlStyle: null,   rating: 74 },
    { name: 'Luis Reece',              role: 'opener',     age: 36, bowlStyle: null,   rating: 77 },
    { name: 'Matthew Montgomery',      role: 'batter',      age: 26, bowlStyle: null,   rating: 73 },
    { name: 'Wayne Madsen',            role: 'batter',      age: 42, bowlStyle: null,   rating: 74 },
    { name: 'Caleb Jewell',            role: 'batter',      age: 29, bowlStyle: null,   rating: 74 },
    { name: 'Brooke Guest',            role: 'keeper',      age: 29, bowlStyle: null,   rating: 74 },
    { name: 'Martin Andersson',        role: 'allrounder',  age: 29, bowlStyle: 'seam', rating: 74 },
    { name: 'Ben Aitchison',           role: 'allrounder',  age: 27, bowlStyle: 'seam', rating: 77 },
    { name: 'Shoaib Bashir',           role: 'bowler',      age: 22, bowlStyle: 'spin', rating: 76 },
    { name: 'Zak Chappell',            role: 'bowler',      age: 29, bowlStyle: 'seam', rating: 73 },
    { name: 'Nick Potts',              role: 'bowler',      age: 22, bowlStyle: 'seam', rating: 71 },
  ],

  Lancashire: [
    { name: 'Keaton Jennings',         role: 'opener',     age: 34, bowlStyle: null,   rating: 77 },
    { name: 'Michael Jones',           role: 'opener',     age: 28, bowlStyle: null,   rating: 72 },
    { name: 'Marcus Harris',           role: 'batter',      age: 34, bowlStyle: null,   rating: 80 },
    { name: 'Josh Bohannon',           role: 'batter',      age: 29, bowlStyle: null,   rating: 74 },
    { name: 'Harry Singh',             role: 'batter',      age: 22, bowlStyle: null,   rating: 70 },
    { name: 'Joe Moores',              role: 'keeper',      age: 23, bowlStyle: null,   rating: 71 },
    { name: 'Liam Livingstone',        role: 'allrounder',  age: 33, bowlStyle: 'spin', rating: 79 },
    { name: 'George Balderson',        role: 'allrounder',  age: 25, bowlStyle: 'seam', rating: 75 },
    { name: 'James Anderson',          role: 'bowler',      age: 44, bowlStyle: 'seam', rating: 79 },
    { name: 'Paul Coughlin',           role: 'bowler',      age: 33, bowlStyle: 'seam', rating: 73 },
    { name: 'Mitchell Stanley',        role: 'bowler',      age: 25, bowlStyle: 'seam', rating: 73 },
  ],

  Gloucestershire: [
    { name: 'Cameron Bancroft',        role: 'opener',     age: 33, bowlStyle: null,   rating: 77 },
    { name: 'Joe Phillips',            role: 'opener',     age: 24, bowlStyle: null,   rating: 71 },
    { name: 'Miles Hammond',           role: 'batter',      age: 30, bowlStyle: null,   rating: 77 },
    { name: 'Ollie Price',             role: 'batter',      age: 25, bowlStyle: null,   rating: 74 },
    { name: 'Tommy Boorman',           role: 'batter',      age: 22, bowlStyle: null,   rating: 72 },
    { name: 'James Bracey',            role: 'keeper',      age: 29, bowlStyle: null,   rating: 78 },
    { name: 'Graeme van Buuren',       role: 'allrounder',  age: 35, bowlStyle: 'spin', rating: 77 },
    { name: 'Jack Taylor',             role: 'allrounder',  age: 34, bowlStyle: 'spin', rating: 73 },
    { name: 'Kristian Clarke',         role: 'bowler',      age: 27, bowlStyle: 'seam', rating: 77 },
    { name: 'Matt Taylor',             role: 'bowler',      age: 32, bowlStyle: 'seam', rating: 74 },
    { name: 'Will Williams',           role: 'bowler',      age: 34, bowlStyle: 'seam', rating: 73 },
  ],

  Leicestershire: [
    { name: 'Rishi Patel',             role: 'opener',     age: 27, bowlStyle: null,   rating: 74 },
    { name: 'Jake Weatherald',         role: 'opener',     age: 32, bowlStyle: null,   rating: 77 },
    { name: 'Sol Budinger',            role: 'batter',      age: 26, bowlStyle: null,   rating: 74 },
    { name: 'Stephen Eskinazi',        role: 'batter',      age: 32, bowlStyle: null,   rating: 78 },
    { name: 'Jonny Tattersall',        role: 'batter',      age: 31, bowlStyle: null,   rating: 75 },
    { name: 'Ben Cox',                 role: 'keeper',      age: 34, bowlStyle: null,   rating: 74 },
    { name: 'Ian Holland',             role: 'allrounder',  age: 35, bowlStyle: 'seam', rating: 75 },
    { name: 'Ben Green',               role: 'allrounder',  age: 28, bowlStyle: 'seam', rating: 77 },
    { name: 'Ajaz Patel',              role: 'bowler',      age: 37, bowlStyle: 'spin', rating: 79 },
    { name: 'Josh Davey',              role: 'bowler',      age: 36, bowlStyle: 'seam', rating: 75 },
    { name: 'Josh Hull',               role: 'bowler',      age: 21, bowlStyle: 'seam', rating: 74 },
  ],

  Glamorgan: [
    { name: 'Zain-ul-Hassan',          role: 'opener',     age: 23, bowlStyle: null,   rating: 75 },
    { name: 'Asa Tribe',               role: 'opener',     age: 24, bowlStyle: null,   rating: 76 },
    { name: 'Kiran Carlson',           role: 'batter',      age: 28, bowlStyle: null,   rating: 80 },
    { name: 'Colin Ingram',            role: 'batter',      age: 41, bowlStyle: null,   rating: 78 },
    { name: 'Sean Dickson',            role: 'batter',      age: 34, bowlStyle: null,   rating: 73 },
    { name: 'Chris Cooke',             role: 'keeper',      age: 40, bowlStyle: null,   rating: 76 },
    { name: 'Ben Kellaway',            role: 'allrounder',  age: 22, bowlStyle: 'spin', rating: 76 },
    { name: 'Timm van der Gugten',     role: 'allrounder',  age: 35, bowlStyle: 'seam', rating: 76 },
    { name: 'Mason Crane',             role: 'bowler',      age: 29, bowlStyle: 'spin', rating: 78 },
    { name: 'Tom Norton',              role: 'bowler',      age: 23, bowlStyle: 'seam', rating: 75 },
    { name: 'Ryan Hadley',             role: 'bowler',      age: 30, bowlStyle: 'seam', rating: 74 },
  ],
};
