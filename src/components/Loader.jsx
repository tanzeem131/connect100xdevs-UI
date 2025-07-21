export const Loader = () => {
  return (
    <div
      className="relative w-[50px] aspect-square rounded-full border-4 border-t-purple-500 border-b-purple-500 border-l-transparent border-r-transparent animate-spin bg-purple-700/[0.10] flex items-center justify-center"
      role="status"
    >
      <div className="absolute inset-0 m-[2px] rounded-full border-inherit border-t-purple-800 border-b-purple-800 border-l-transparent border-r-transparent animate-[spin_0.5s_linear_infinite_reverse]"></div>

      <div className="absolute inset-0 m-[8px] rounded-full border-inherit"></div>
    </div>
  );
};
