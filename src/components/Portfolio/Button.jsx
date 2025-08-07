import { motion } from "framer-motion";
import { FaMagic } from "react-icons/fa";

export const CreatePortfolioButton = ({ text }) => {
  return (
    <motion.button
      className="relative inline-flex h-10 overflow-hidden rounded-full p-[1.5px] focus:outline-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-xs font-medium text-white backdrop-blur-3xl">
        <FaMagic className="mr-2 h-4 w-4 text-purple-400" />
        {text}
      </span>
    </motion.button>
  );
};
