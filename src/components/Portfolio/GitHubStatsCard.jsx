export const GitHubStatsCard = ({ stats, padding = "p-6" }) => (
  <BentoCard
    padding={padding}
    className="md:col-span-1 lg:col-span-2 group bg-gradient-to-br from-neutral-900 to-neutral-900"
    variants={itemVariants}
  >
    <h2 className="text-lg font-semibold text-white mb-2">GitHub Stats</h2>
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-2xl font-bold text-violet-400">{stats?.followers}</p>
        <p className="text-sm text-neutral-400">Followers</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-sky-400">{stats?.public_repos}</p>
        <p className="text-sm text-neutral-400">Repos</p>
      </div>
      {/* <div>
        <p className="text-2xl font-bold text-rose-400">{stats.total_stars}</p>
        <p className="text-sm text-neutral-400">Stars</p>
      </div> */}
    </div>
  </BentoCard>
);
