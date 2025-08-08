import { motion } from "framer-motion";

export const BentoCard = ({
  children,
  className,
  padding = "p-6",
  ...props
}) => (
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
