// Self-contained test match simulator — mirrors index.html logic exactly
// Run: node sim_test.js

function simTestMatch(engBat, oppBat, engBowl, oppBowl, isHome = true) {
  const MAX_OVERS = 450;
  const homeAdv = 4, homeAdvBowl = 3;
  if (isHome) {
    engBat  = Math.min(99, engBat  + homeAdv);
    engBowl = Math.min(99, engBowl + homeAdvBowl);
    oppBat  = Math.max(50, oppBat  - 2);
    oppBowl = Math.max(50, oppBowl - 2);
  } else {
    oppBat  = Math.min(99, oppBat  + homeAdv);
    oppBowl = Math.min(99, oppBowl + homeAdvBowl);
    engBat  = Math.max(50, engBat  - 2);
    engBowl = Math.max(50, engBowl - 2);
  }

  const coinToss = Math.random() < 0.5;
  const inn1Team = coinToss ? 'eng' : 'opp';
  const inn2Team = inn1Team === 'eng' ? 'opp' : 'eng';

  const engBatRatings = [78,80,82,93,88,82,75,62,62,58,55];
  const oppBatRatings = [oppBat+5, oppBat+3, oppBat+6, oppBat+8, oppBat+3, oppBat, oppBat-3, oppBat-10, oppBat-18, oppBat-22, oppBat-25]
    .map(r => Math.max(52, Math.min(99, r)));

  const conditions = ['seam','spin','batting','neutral'][Math.floor(Math.random()*4)];

  const engBowlPool = [
    {n:'Anderson',t:'s',sp:false,maxOv:28,rating:88},
    {n:'Broad',t:'s',sp:false,maxOv:28,rating:86},
    {n:'Robinson',t:'s',sp:false,maxOv:25,rating:80},
    {n:'Leach',t:'s',sp:true,maxOv:35,rating:76},
    {n:'Stokes',t:'a',sp:false,maxOv:22,rating:82},
    {n:'Wood',t:'s',sp:false,maxOv:20,rating:78},
  ];
  const oppBowlPool = [
    {n:'Opp1',t:'s',sp:false,maxOv:28,rating:Math.min(97,oppBowl+4)},
    {n:'Opp2',t:'s',sp:false,maxOv:28,rating:Math.min(97,oppBowl+4)},
    {n:'Opp3',t:'s',sp:true, maxOv:35,rating:Math.min(97,oppBowl+4)},
    {n:'Opp4',t:'a',sp:false,maxOv:22,rating:Math.max(60,oppBowl-6)},
    {n:'Opp5',t:'a',sp:false,maxOv:22,rating:Math.max(60,oppBowl-6)},
    {n:'Opp6',t:'p',sp:false,maxOv:12,rating:Math.max(55,oppBowl-18)},
  ];

  function simTestInnings(batR, bowlR, oversAvail, target, batRatings, bowlPool, conditions, declareAt) {
    const q = Math.max(0, Math.min(1, (batR - bowlR + 50) / 100));
    const wktProbBase = 0.020 - q * 0.007;

    const batters = Array.from({length:11}, (_,i) => ({ runs:0, balls:0, out:false }));

    const bwlrs = bowlPool.map(b => {
      const bRat = Math.max(55, Math.min(97, b.rating || 75));
      const ratingFactor = 0.82 + (bRat - 55) / 42 * 0.33;
      return {
        type: b.t, isSpin: !!b.sp,
        maxOvers: b.maxOv,
        overs:0, runs:0, wickets:0,
        spellOvers:0, spellMax: 5+Math.floor(Math.random()*4),
        restSince:-99, bad:false,
        ratingFactor,
        hotFactor: 0.88 + Math.random() * 0.30,
      };
    });

    let lastBowlerIdx = -1, activeBowlerIdx = -1;
    function nextBowler(ov) {
      if (activeBowlerIdx >= 0 && activeBowlerIdx !== lastBowlerIdx) {
        const ab = bwlrs[activeBowlerIdx];
        const spellDone = ab.spellOvers >= ab.spellMax || ab.overs >= ab.maxOvers || ab.bad;
        if (!spellDone) return activeBowlerIdx;
        ab.restSince = ov; ab.spellOvers = 0;
        ab.spellMax = 5 + Math.floor(Math.random() * 4);
      }
      let best = -1, bestScore = -Infinity;
      bwlrs.forEach((b, i) => {
        if (i === lastBowlerIdx) return;
        if (b.overs >= b.maxOvers) return;
        if (b.bad && b.type === 'p') return;
        if (ov < 10 && b.isSpin) return;
        const restOvers = b.restSince < 0 ? 999 : (ov - b.restSince);
        const neededRest = b.spellOvers > 0 ? b.spellOvers : 5;
        const rested = restOvers >= neededRest;
        let score = b.type === 's' ? 3 : b.type === 'a' ? 1.5 : 0.5;
        score += rested ? 2.5 : -1.5;
        score -= (b.overs / b.maxOvers) * 3;
        if (b.overs === 0) score += 0.8;
        if (score > bestScore) { bestScore = score; best = i; }
      });
      if (best < 0) best = bwlrs.findIndex((b,i) => i !== lastBowlerIdx && b.overs < b.maxOvers && !(ov < 10 && b.isSpin));
      if (best < 0) best = bwlrs.findIndex((b,i) => i !== lastBowlerIdx && b.overs < b.maxOvers);
      return best >= 0 ? best : 0;
    }

    let striker=0, nonStriker=1, nextIn=2;
    let wkts=0, totalRuns=0, ovCount=0, declared=false;

    for (let ov=0; ov<oversAvail && wkts<10; ov++) {
      if (target!==undefined && totalRuns>=target) break;
      lastBowlerIdx = activeBowlerIdx;
      activeBowlerIdx = nextBowler(ov);
      const bowler = bwlrs[activeBowlerIdx];
      let overRuns=0, dotBalls=0;

      for (let b=0; b<6 && wkts<10; b++) {
        if (target!==undefined && totalRuns>=target) break;
        if (striker >= batters.length) break;
        const posM = striker<=1 ? 0.75 : striker<=4 ? 1.0 : striker<=7 ? 1.5 : 2.2;
        const settleM = batters[striker].balls < 12 ? 1.15 : 1.0;
        const bRat = batRatings ? Math.max(52, Math.min(99, batRatings[striker] || 72)) : 72;
        const batWktMod = 1.20 - (bRat - 52) / 47 * 0.45;
        const condWktMod = conditions === 'seam' ? (bowler.isSpin ? 0.78 : 1.30)
                         : conditions === 'spin' ? (bowler.isSpin ? 1.35 : 0.82)
                         : conditions === 'batting' ? 0.85 : 1.0;
        const oversLeft = oversAvail - ov;
        const rrNeeded = target !== undefined ? (target - totalRuns) / Math.max(1, oversLeft) : 0;
        const drawMode = target !== undefined && rrNeeded > 7 && oversLeft > 20;
        const wktP = wktProbBase * posM * settleM * bowler.ratingFactor * bowler.hotFactor * batWktMod * condWktMod * (drawMode ? 0.45 : 1);

        batters[striker].balls++;
        if (Math.random() < wktP) {
          batters[striker].out = true;
          bowler.wickets++;
          wkts++;
          striker = nextIn++;
        } else {
          const batScMod = 0.80 + (bRat - 52) / 47 * 0.40;
          const condRunMod = conditions === 'batting' ? 1.12 : conditions === 'seam' || conditions === 'spin' ? 0.92 : 1.0;
          const sc = (0.85 + q * 0.20) * batScMod * condRunMod;
          const p1 = 0.20 * sc, p2 = 0.06 * sc, p3 = 0.005 * sc, p4 = 0.05 * sc, p6 = 0.005 * sc;
          const p0 = Math.max(0.50, 1 - p1 - p2 - p3 - p4 - p6);
          const r = Math.random();
          let runs;
          if      (r < p0)                        runs = 0;
          else if (r < p0 + p1)                   runs = 1;
          else if (r < p0 + p1 + p2)              runs = 2;
          else if (r < p0 + p1 + p2 + p3)         runs = 3;
          else if (r < p0 + p1 + p2 + p3 + p4)   runs = 4;
          else                                     runs = 6;
          batters[striker].runs += runs;
          overRuns += runs;
          totalRuns += runs;
          if (runs===0) dotBalls++;
          if (runs%2===1) { const t=striker; striker=nonStriker; nonStriker=t; }
        }
      }
      const t=striker; striker=nonStriker; nonStriker=t;
      bowler.overs++;
      bowler.spellOvers++;
      bowler.runs += overRuns;
      if (dotBalls===6) bowler.maidens++;
      if (bowler.spellOvers >= 3 && bowler.runs/bowler.overs > 5.5) bowler.bad=true;
      ovCount++;
      if (declareAt !== undefined && totalRuns >= declareAt && ov >= 39) { declared = true; break; }
    }

    return {
      runs: totalRuns, wkts, oversPlayed: ovCount,
      allOut: wkts>=10,
      chaseWon: target!==undefined && totalRuns>=target,
      declared,
    };
  }

  const ib  = (team) => team==='eng' ? engBat  : oppBat;
  const iw  = (team) => team==='eng' ? engBowl : oppBowl;
  const ibr = (team) => team==='eng' ? engBatRatings : oppBatRatings;
  const ibp = (team) => team==='eng' ? oppBowlPool : engBowlPool;

  const innings = [];
  let oversUsed = 0;
  let inningsWinResult = null;

  const declareAt1 = 450 + Math.floor(Math.random() * 80);
  const inn1 = simTestInnings(ib(inn1Team), iw(inn1Team), MAX_OVERS, undefined, ibr(inn1Team), ibp(inn1Team), conditions, declareAt1);
  inn1.team = inn1Team;
  innings.push(inn1);
  oversUsed += inn1.oversPlayed;

  if (oversUsed < MAX_OVERS - 60) {
    const declareAt2 = 450 + Math.floor(Math.random() * 80);
    const inn2 = simTestInnings(ib(inn2Team), iw(inn2Team), MAX_OVERS - oversUsed, undefined, ibr(inn2Team), ibp(inn2Team), conditions, declareAt2);
    inn2.team = inn2Team;
    innings.push(inn2);
    oversUsed += inn2.oversPlayed;

    const lead = inn1.runs - inn2.runs;
    const followOn = lead >= 200 && Math.random() < 0.35;

    if (oversUsed < MAX_OVERS - 50) {
      const inn3Team = followOn ? inn2Team : inn1Team;
      const oversForInn3 = MAX_OVERS - oversUsed;

      let declareAt3;
      if (!followOn && oversForInn3 >= 75) {
        const declareLead = Math.max(220, Math.min(520,
          Math.round(oversForInn3 * 2.0 + (Math.random() - 0.5) * 100)
        ));
        declareAt3 = Math.max(1, declareLead + inn2.runs - inn1.runs);
      }

      const inn3 = simTestInnings(ib(inn3Team), iw(inn3Team), MAX_OVERS - oversUsed, undefined, ibr(inn3Team), ibp(inn3Team), conditions, declareAt3);
      inn3.team = inn3Team;
      inn3.followOn = followOn;
      innings.push(inn3);
      oversUsed += inn3.oversPlayed;

      if (oversUsed < MAX_OVERS - 20) {
        const inn4Team = inn3Team === inn1Team ? inn2Team : inn1Team;
        const rawTarget = followOn
          ? inn2.runs + inn3.runs - inn1.runs + 1
          : inn1.runs + inn3.runs - inn2.runs + 1;

        if (rawTarget <= 0) {
          const inningsWinFor = inn4Team === 'eng' ? 'eng' : 'opp';
          inningsWinResult = { inningsWin: true, inningsWinFor, inningsMargin: Math.abs(rawTarget - 1) };
        } else {
          const inn4 = simTestInnings(ib(inn4Team), iw(inn4Team), MAX_OVERS - oversUsed, rawTarget, ibr(inn4Team), ibp(inn4Team), conditions);
          inn4.team = inn4Team;
          inn4.target = rawTarget;
          inn4.followOnCase = followOn;
          innings.push(inn4);
          oversUsed += inn4.oversPlayed;
        }
      }
    }
  }

  let result, winner, margin;
  const last = innings[innings.length - 1];

  if (inningsWinResult) {
    winner = inningsWinResult.inningsWinFor;
    result = winner === 'eng' ? 'W' : 'L';
    margin = `an innings and ${inningsWinResult.inningsMargin} runs`;
  } else if (innings.length < 4) {
    result = 'D'; winner = 'draw'; margin = 'Match drawn';
  } else if (oversUsed >= MAX_OVERS && !last.chaseWon && !last.allOut) {
    result = 'D'; winner = 'draw'; margin = 'Match drawn';
  } else if (last.chaseWon) {
    winner = last.team;
    result = winner === 'eng' ? 'W' : 'L';
    const wktsLeft = 10 - last.wkts;
    margin = `${wktsLeft} wickets`;
  } else if (last.allOut) {
    const deficit = last.target - last.runs;
    if (deficit > 0) {
      winner = last.team === 'eng' ? 'opp' : 'eng';
      result = winner === 'eng' ? 'W' : 'L';
      margin = `${deficit} runs`;
    } else {
      result = 'D'; winner = 'draw'; margin = 'Match drawn';
    }
  } else {
    result = 'D'; winner = 'draw'; margin = 'Match drawn';
  }

  return { winner, result, margin, innings, oversUsed, conditions };
}

// Run 100 matches with typical ratings (England ~80 bat/bowl, opp ~78 bat/76 bowl)
const ENG_BAT = 80, OPP_BAT = 78, ENG_BOWL = 80, OPP_BOWL = 76;

let results = [], allInn1 = [], allInn2 = [], allInn3 = [], allInn4 = [];
let wins=0, losses=0, draws=0;
let target1Count=0, lowTargetCount=0;
let highScoreMatches = [];

for (let i = 0; i < 100; i++) {
  const isHome = i % 2 === 0;
  const m = simTestMatch(ENG_BAT, OPP_BAT, ENG_BOWL, OPP_BOWL, isHome);
  results.push(m);
  if (m.result === 'W') wins++;
  else if (m.result === 'L') losses++;
  else draws++;

  m.innings.forEach((inn, idx) => {
    const arr = [allInn1, allInn2, allInn3, allInn4][idx];
    if (arr) arr.push(inn.runs);
    if (inn.runs > 600) highScoreMatches.push({ match: i+1, innings: idx+1, runs: inn.runs, wkts: inn.wkts });
  });

  if (m.innings.length === 4) {
    const t = m.innings[3].target;
    if (t === 1) target1Count++;
    if (t <= 20) lowTargetCount++;
  }
}

const avg = arr => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;
const max = arr => arr.length ? Math.max(...arr) : 0;
const pct = (n, d) => d ? Math.round(n/d*100) : 0;

console.log('\n=== 100 TEST MATCH SIMULATION REPORT ===\n');
console.log(`Results: ${wins}W ${losses}L ${draws}D  (${pct(wins,100)}% / ${pct(losses,100)}% / ${pct(draws,100)}%)\n`);

console.log('--- INNINGS SCORES ---');
console.log(`Inn 1 (n=${allInn1.length}): avg=${avg(allInn1)}, max=${max(allInn1)}`);
console.log(`Inn 2 (n=${allInn2.length}): avg=${avg(allInn2)}, max=${max(allInn2)}`);
console.log(`Inn 3 (n=${allInn3.length}): avg=${avg(allInn3)}, max=${max(allInn3)}`);
console.log(`Inn 4 (n=${allInn4.length}): avg=${avg(allInn4)}, max=${max(allInn4)}\n`);

// Score distribution for inn1
const bands = {'<150':0,'150-199':0,'200-249':0,'250-299':0,'300-349':0,'350-399':0,'400-449':0,'450-499':0,'500-549':0,'550-599':0,'600+':0};
allInn1.forEach(r => {
  if (r<150) bands['<150']++;
  else if (r<200) bands['150-199']++;
  else if (r<250) bands['200-249']++;
  else if (r<300) bands['250-299']++;
  else if (r<350) bands['300-349']++;
  else if (r<400) bands['350-399']++;
  else if (r<450) bands['400-449']++;
  else if (r<500) bands['450-499']++;
  else if (r<550) bands['500-549']++;
  else if (r<600) bands['550-599']++;
  else bands['600+']++;
});
console.log('--- FIRST INNINGS SCORE DISTRIBUTION ---');
Object.entries(bands).forEach(([k,v]) => console.log(`  ${k.padEnd(8)} : ${'█'.repeat(v)} (${v})`));

console.log(`\n--- FOURTH INNINGS TARGETS (n=${allInn4.length}) ---`);
const matchesWithInn4 = results.filter(m => m.innings.length === 4);
const targets = matchesWithInn4.map(m => m.innings[3].target).sort((a,b)=>a-b);
console.log(`  Target=1:        ${target1Count} matches`);
console.log(`  Target ≤20:      ${lowTargetCount} matches`);
console.log(`  Target <150:     ${targets.filter(t=>t<150).length} matches`);
console.log(`  Target 150-250:  ${targets.filter(t=>t>=150&&t<250).length} matches`);
console.log(`  Target 250-350:  ${targets.filter(t=>t>=250&&t<350).length} matches`);
console.log(`  Target 350-450:  ${targets.filter(t=>t>=350&&t<450).length} matches`);
console.log(`  Target 450+:     ${targets.filter(t=>t>=450).length} matches`);
console.log(`  Avg target:      ${avg(targets)}`);

const followOnMatches = matchesWithInn4.filter(m => m.innings[3].followOnCase);
console.log(`\n--- FOLLOW-ON (n=${followOnMatches.length}) ---`);
followOnMatches.forEach(m => {
  const [i1,i2,i3,i4] = m.innings;
  const t = i4.target;
  console.log(`  Inn: ${i1.runs}/${i1.wkts} | ${i2.runs}/${i2.wkts} | ${i3.runs}/${i3.wkts} | target=${t} | ${m.margin}`);
});

console.log(`\n--- HIGH SCORES (600+) ---`);
if (highScoreMatches.length === 0) console.log('  None');
highScoreMatches.forEach(h => console.log(`  Match ${h.match} Inn${h.innings}: ${h.runs}/${h.wkts}`));
