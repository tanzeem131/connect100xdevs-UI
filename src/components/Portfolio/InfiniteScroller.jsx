export const InfiniteScroller = ({ skills }) => {
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
      <div
        className="flex w-max animate-scroll"
        style={{ animationDuration: "5s" }}
      >
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
