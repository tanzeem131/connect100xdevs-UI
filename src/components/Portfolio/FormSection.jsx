import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

export const FormSection = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-2xl overflow-hidden">
      <button
        type="button"
        className="w-full p-4 flex justify-between items-center bg-neutral-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Icon className="text-violet-400" size={20} />
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <FaChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 space-y-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
