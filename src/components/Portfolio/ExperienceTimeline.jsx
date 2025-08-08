export const ExperienceTimeline = ({ experience }) => (
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
