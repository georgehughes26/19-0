-- career_seasons: one row per completed Career Mode season (written at the
-- season-end screen, same moment the season is archived into the save's
-- seasonHistory). Signed-in players only, same as runs/test_runs/wc_runs.
--
-- career_id groups the seasons of one career together (a user can restart and
-- run several careers); season_number is 1 for that career's debut season.
-- The headline stats are flat columns so a future leaderboard can sort on them
-- directly; the full per-competition breakdown is kept in stats_by_competition.
create table career_seasons (
  id                    bigint generated always as identity primary key,
  user_id               uuid not null references users(id),
  career_id             uuid not null,
  season_number         int  not null,
  year                  int  not null,

  player_name           text not null,
  role                  text not null,          -- batter | bowler | allrounder | keeper
  player_type           text,                   -- opener, fast, leg, keeperBatsman, ...
  age                   int,

  tier                  int  not null,          -- 1 Local Club, 2 County 2nd XI, ...
  league_id             text,                   -- the career's tier-1 home league, kept at every tier
  league_name           text,                   -- tier 2: "County 2nd XI Division 1/2"
  club                  text,                   -- tier 2: the county
  league_position       int,                    -- tier 2: final T20 Cup group standing
  team_count            int,
  cup_stage             text,                   -- tier 2 T20 Cup: won | final | sf | qf | null

  ovr_start             int,
  ovr_end               int,
  target_hit            boolean,                -- season target met (incl. pity rule) -> promoted
  pity_promotion        boolean,                -- promoted only via the pity rule, target genuinely missed
  trophies              jsonb not null default '[]',

  bat_innings           int not null default 0,
  runs                  int not null default 0,
  balls                 int not null default 0,
  outs                  int not null default 0,
  fifties               int not null default 0,
  hundreds              int not null default 0,
  fours                 int not null default 0,
  sixes                 int not null default 0,
  bowl_innings          int not null default 0,
  wickets               int not null default 0,
  runs_conceded         int not null default 0,
  overs                 numeric not null default 0,
  five_fors             int not null default 0,
  field_involvements    int not null default 0,
  field_clean           int not null default 0,

  stats_by_competition  jsonb,
  created_at            timestamptz not null default now(),

  unique (career_id, season_number)
);

create index career_seasons_user_idx    on career_seasons (user_id);
create index career_seasons_created_idx on career_seasons (created_at);

alter table career_seasons enable row level security;

-- Custom users table, not Supabase Auth, so no auth.uid() — but unlike the
-- other *_runs tables this one only grants what the app actually does (read for
-- leaderboards, insert at season end). No update/delete from the client.
create policy "Read career_seasons"   on career_seasons for select using (true);
create policy "Insert career_seasons" on career_seasons for insert with check (true);

-- career_totals: one row per career, summed across its seasons — the shape a
-- career leaderboard (most runs, most wickets, highest tier, most trophies)
-- would read from.
create view career_totals with (security_invoker = true) as
select
  career_id,
  user_id,
  min(player_name)                    as player_name,
  min(role)                           as role,
  count(*)                            as seasons,
  max(tier)                           as highest_tier,
  max(ovr_end)                        as best_ovr,
  sum(runs)                           as runs,
  sum(bat_innings)                    as bat_innings,
  sum(outs)                           as outs,
  sum(fifties)                        as fifties,
  sum(hundreds)                       as hundreds,
  sum(wickets)                        as wickets,
  sum(runs_conceded)                  as runs_conceded,
  sum(five_fors)                      as five_fors,
  sum(field_involvements)             as field_involvements,
  sum(jsonb_array_length(trophies))   as trophies,
  count(*) filter (where pity_promotion) as pity_promotions,
  max(created_at)                     as last_season_at
from career_seasons
group by career_id, user_id;
