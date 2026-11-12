-- Career Mode leaderboard. Run after career_seasons.sql.
--
-- mvp_points mirrors careerImpactScore in index.html (the score that decides
-- Player of the Season): runs + 20 per wicket + 20 per clean catch/stumping.
-- Change both together if the weighting ever moves.
alter table career_seasons
  add column mvp_points int generated always as (runs + 20 * wickets + 20 * field_clean) stored;

-- Keep career_totals in step (new column appended, so create or replace works).
create or replace view career_totals with (security_invoker = true) as
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
  max(created_at)                     as last_season_at,
  sum(mvp_points)                     as mvp_points
from career_seasons
group by career_id, user_id;

-- One row per career, summed over the seasons finished on/after `since`
-- (null = all time), ranked by MVP points -> highest tier -> most recent.
-- Returns the top 100 plus any of `me`'s careers outside it, so the app can
-- show "your best career" below the board without a second query.
create or replace function career_leaderboard(since timestamptz default null, me uuid default null)
returns table (
  rank            bigint,
  career_id       uuid,
  user_id         uuid,
  username        text,
  player_name     text,
  role            text,
  seasons         bigint,
  highest_tier    int,
  best_ovr        int,
  mvp_points      bigint,
  runs            bigint,
  wickets         bigint,
  trophies        bigint,
  last_season_at  timestamptz
)
language sql stable security invoker as $$
  with totals as (
    select cs.career_id, cs.user_id,
           min(cs.player_name) as player_name, min(cs.role) as role,
           count(*) as seasons, max(cs.tier) as highest_tier, max(cs.ovr_end) as best_ovr,
           sum(cs.mvp_points)::bigint as mvp_points, sum(cs.runs)::bigint as runs,
           sum(cs.wickets)::bigint as wickets,
           sum(jsonb_array_length(cs.trophies))::bigint as trophies,
           max(cs.created_at) as last_season_at
    from career_seasons cs
    where since is null or cs.created_at >= since
    group by cs.career_id, cs.user_id
  ), ranked as (
    select row_number() over (order by t.mvp_points desc, t.highest_tier desc, t.last_season_at desc) as rnk, t.*
    from totals t
  )
  select r.rnk, r.career_id, r.user_id, u.username, r.player_name, r.role, r.seasons,
         r.highest_tier, r.best_ovr, r.mvp_points, r.runs, r.wickets, r.trophies, r.last_season_at
  from ranked r
  left join users_public u on u.id = r.user_id
  where r.rnk <= 100 or r.user_id = me
  order by r.rnk;
$$;
