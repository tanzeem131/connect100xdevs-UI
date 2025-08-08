import { FaBriefcase, FaStar, FaCodeBranch } from "react-icons/fa";

export const PinnedRepoCard = ({ repo }) => (
  <a
    href={repo.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-4 bg-neutral-800/50 rounded-lg border border-neutral-700 hover:border-violet-500/50 transition-colors group"
  >
    <h3 className="font-semibold text-white group-hover:text-violet-300 flex items-center gap-2">
      <FaBriefcase size={16} /> {repo.name}
    </h3>
    <p className="text-sm text-neutral-400 mt-1 mb-3">{repo.description}</p>
    <div className="flex items-center gap-4 text-xs text-neutral-400">
      <div className="flex items-center gap-1">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: repo.languageColor }}
        ></span>
        <span>{repo.language}</span>
      </div>
      <div className="flex items-center gap-1">
        <FaStar size={14} />
        <span>{repo.stars}</span>
      </div>
      <div className="flex items-center gap-1">
        <FaCodeBranch size={14} />
        <span>{repo.forks}</span>
      </div>
    </div>
  </a>
);
