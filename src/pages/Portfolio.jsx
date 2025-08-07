import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaBriefcase,
  FaStar,
  FaCodeBranch,
  FaBroadcastTower,
  FaMedal,
  FaCheckCircle,
  FaBookOpen,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { LuBrainCircuit } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import NavBar from "../components/Navbar";

const BentoCard = ({ children, className, padding = "p-6", ...props }) => (
  <motion.div
    className={`relative backdrop-blur-xl border border-neutral-700/60 rounded-2xl ${padding} flex flex-col justify-between overflow-hidden ${className}`}
    whileHover={{
      scale: 1.03,
      boxShadow:
        "0 0 10px rgba(192, 132, 252, 0.1), 0 0 20px rgba(56, 189, 248, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    {...props}
  >
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </motion.div>
);

const ExperienceTimeline = ({ experience }) => (
  <div className="flex flex-col gap-4">
    {experience?.map((item, index) => (
      <div key={index} className="flex gap-4">
        <div className="relative">
          <div className="w-3 h-3 bg-violet-500 rounded-full mt-1"></div>
          {index < experience?.length - 1 && (
            <div className="absolute top-4 left-[5px] w-px h-full bg-neutral-700"></div>
          )}
        </div>
        <div>
          <p className="font-semibold text-white">
            {item.role} @ {item.company}
          </p>
          <p className="text-xs text-neutral-400 mb-1">{item.period}</p>
          <p className="text-sm text-neutral-300">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const SocialLink = ({ icon: Icon, href, text, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group"
  >
    <Icon size={32} className={color} />
  </a>
);

const WorkStatusCard = ({ status, padding = "p-6" }) => (
  <BentoCard
    padding={padding}
    className="md:col-span-1 lg:col-span-2 group bg-gradient-to-br from-teal-900/80 to-neutral-900"
    variants={itemVariants}
  >
    <div className="flex items-center gap-4">
      <div className="relative">
        <FaBroadcastTower size={32} className="text-teal-400" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-ping"></div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white">Status</h2>
        <p className="text-teal-300">{status}</p>
      </div>
    </div>
  </BentoCard>
);

const GitHubStatsCard = ({ stats, padding = "p-6" }) => (
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

const PinnedRepoCard = ({ repo }) => (
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

const InfiniteScroller = ({ skills }) => {
  const skillsArray = Array.isArray(skills) ? skills : [];
  const duplicatedSkills = [...skillsArray, ...skillsArray];

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
      }}
    >
      <div className="flex w-max animate-scroll">
        {duplicatedSkills?.map((tech, index) => (
          <span
            key={index}
            className="bg-neutral-800/50 text-neutral-300 text-sm font-medium px-4 py-2 rounded-full border border-neutral-700 hover:border-indigo-500 hover:text-indigo-300 transition-all cursor-pointer mx-2"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Portfolio = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const [userData, setUserData] = useState();
  const [githubStats, setGithubStats] = useState();

  const { githubUsername } = useParams();

  const fetchedPortfolioData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/portfolio/${githubUsername}`);
      const savedData = res?.data?.portfolio;
      setUserData(savedData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchedPortfolioData();
  }, [githubUsername]);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const res = await axios.get(
          BASE_URL + `/github-stats/${githubUsername}`
        );
        setGithubStats(res?.data);
        console.log("GitHub Stats:", githubStats);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };

    fetchGitHubStats();
  }, [githubUsername]);

  return (
    <>
      <NavBar />

      <div className="min-h-screen w-full bg-neutral-950 text-white font-sans p-4 sm:p-6 lg:p-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-0 left-0 -z-10 h-1/3 w-1/3 bg-gradient-to-br from-violet-900 to-transparent rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 -z-10 h-1/3 w-1/3 bg-gradient-to-tl from-sky-900 to-transparent rounded-full blur-3xl opacity-50 animate-pulse animation-delay-3000"></div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <BentoCard
              className="md:col-span-2 lg:col-span-2 group bg-gradient-to-br from-violet-900/80 to-neutral-900"
              variants={itemVariants}
            >
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                    <motion.img
                      src={userData?.profilepic}
                      alt={userData?.name}
                      className="w-full h-full rounded-full object-cover border-2 border-violet-500/50"
                      whileHover={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-300 to-sky-300 text-transparent bg-clip-text">
                      {userData?.name}
                    </h1>
                    <p className="text-sky-400 mt-1 text-lg">
                      {userData?.title}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-neutral-400">
                      <FaMapMarkerAlt size={16} />
                      <span>{userData?.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-neutral-300 italic">"{userData?.bio}"</p>
                </div>
                <BentoCard
                  padding="p-3"
                  className="md:col-span-3 lg:col-span-4 group bg-indigo-900/50 text-indigo-300 border-indigo-700 flex-col"
                  glowColor="from-indigo-500/20"
                  variants={itemVariants}
                >
                  <h2 className="text-xl font-semibold text-white mb-4">
                    My Tech Stack
                  </h2>
                  <div className="flex-grow flex items-center justify-center">
                    <InfiniteScroller skills={userData?.techStack} />
                  </div>
                </BentoCard>
              </div>
            </BentoCard>

            <div className="space-y-4">
              <WorkStatusCard padding="p-2" status={userData?.workStatus} />
              <BentoCard
                padding="p-4"
                className="md:col-span-2 lg:col-span-2 group bg-gradient-to-br from-neutral-900 to-neutral-900"
                variants={itemVariants}
              >
                <h2 className="text-lg font-semibold text-white mb-2">
                  Github Contributions
                </h2>
                <GitHubCalendar username="tanzeem131" />
              </BentoCard>
            </div>
            <div className="space-y-4">
              <BentoCard
                padding="p-5"
                className="md:col-span-1 lg:col-span-1 group bg-gradient-to-br from-sky-900/80 to-neutral-900"
                variants={itemVariants}
              >
                <div className="flex justify-between">
                  <SocialLink
                    icon={FaGithub}
                    href={`https://github.com/${userData?.socials.github}`}
                    color="text-neutral-300 group-hover:text-white"
                  />
                  <SocialLink
                    icon={FaTwitter}
                    href={`https://x.com/${userData?.socials.twitter}`}
                    color="text-sky-400 group-hover:text-sky-300"
                  />
                  <SocialLink
                    icon={FaLinkedin}
                    href={`https://linkedin.com/in/${userData?.socials.linkedin}`}
                    color="text-blue-500 group-hover:text-blue-400"
                  />
                  <SocialLink
                    icon={SiLeetcode}
                    href={`https://leetcode.com/${userData?.socials.leetcode}`}
                    color="text-[#FFA116] group-hover:text-[#ffe316]"
                  />
                </div>
              </BentoCard>

              <BentoCard
                padding="p-1"
                className="md:col-span-2 lg:col-span-2 group bg-gradient-to-br from-neutral-900 to-neutral-900"
                variants={itemVariants}
              >
                <img
                  src={`https://leetcard.jacoblin.cool/Tanzeem_01`}
                  alt="LeetCode Stats"
                  className="rounded-xl"
                />
              </BentoCard>
              <GitHubStatsCard padding="p-4" stats={githubStats} />
            </div>
            <BentoCard
              className="md:col-span-2 lg:col-span-2 group bg-gradient-to-br from-amber-900/80 to-neutral-900"
              variants={itemVariants}
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FaMedal className="text-amber-400" /> Key Achievements
              </h2>
              <ul className="space-y-3">
                {userData?.keyAchievements?.map((ach, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-neutral-300"
                  >
                    <FaCheckCircle
                      size={16}
                      className="text-amber-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard
              className="md:col-span-2 lg:col-span-2 group bg-gradient-to-br from-sky-900/80 to-neutral-900"
              variants={itemVariants}
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FaBriefcase className="text-sky-400" /> Experience
              </h2>
              <ExperienceTimeline experience={userData?.experience} />
            </BentoCard>

            {userData?.projects?.map((project, index) => (
              <BentoCard
                key={index}
                className="md:col-span-1 lg:col-span-2 group bg-gradient-to-br from-rose-900/80 to-neutral-900"
                glowColor="from-rose-500/20"
                variants={itemVariants}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-neutral-800 p-2 rounded-lg border border-neutral-700">
                      <FaBriefcase size={20} className="text-rose-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-neutral-400 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech?.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gradient-to-r from-rose-900/50 to-red-900/50 text-rose-300 px-2 py-1 rounded-md border border-rose-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.livelink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-sm font-medium text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors mt-auto"
                  >
                    <span>View Project</span>
                    <FaArrowRight
                      size={14}
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href={project.codelink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-sm font-medium text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors mt-auto"
                  >
                    <span>Code</span>
                    <FaArrowRight
                      size={14}
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </BentoCard>
            ))}

            <BentoCard
              className="md:col-span-4 lg:col-span-4 group bg-gradient-to-br from-rose-900/80 to-neutral-900"
              variants={itemVariants}
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Pinned Repositories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userData?.pinnedRepos?.map((repo) => (
                  <PinnedRepoCard key={repo.name} repo={repo} />
                ))}
              </div>
            </BentoCard>

            <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-4">
              <BentoCard
                className="flex-grow group bg-gradient-to-br from-indigo-900/80 to-neutral-900"
                variants={itemVariants}
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FaBookOpen className="text-indigo-400" /> Latest Articles
                </h2>
                <div className="space-y-3">
                  {userData?.articles?.map((article) => (
                    <a
                      key={article.title}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-neutral-800/50 rounded-lg border border-neutral-700 hover:border-indigo-500/50 group/article"
                    >
                      <p className="font-semibold text-white group-hover/article:text-indigo-300">
                        {article.title}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {article.owner}
                      </p>
                    </a>
                  ))}
                </div>
              </BentoCard>
            </div>
            <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-4">
              <BentoCard
                className="group bg-gradient-to-br from-neutral-900 to-neutral-900"
                variants={itemVariants}
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <LuBrainCircuit className="text-neutral-400" /> Currently
                  Exploring
                </h2>
                <InfiniteScroller skills={userData?.currentlyExploring} />
              </BentoCard>
            </div>

            <BentoCard
              className="md:col-span-1 lg:col-span-1 group bg-gradient-to-br from-emerald-900/80 to-neutral-900"
              glowColor="from-emerald-500/20"
              variants={itemVariants}
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-neutral-400 mb-4">
                I'm always open to discussing new projects, creative ideas,
                freelance opportunities, or being part of an amazing team.
              </p>
              <a
                href={`mailto:${userData?.email}`}
                className="group w-full mt-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <FaEnvelope size={20} />
                <span>Email me</span>
                <FaArrowRight
                  size={20}
                  className="transform transition-transform group-hover:translate-x-1"
                />
              </a>
            </BentoCard>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
