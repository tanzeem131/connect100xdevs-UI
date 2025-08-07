import { motion } from "framer-motion";
import { FaCheckCircle, FaCopy, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

export const SharePortfolio = ({ slug }) => {
  const [copied, setCopied] = useState(false);
  //   const portfolioUrl = `${BASE_URL}` + `/portfolio/${slug}`;
  const portfolioUrl = `https://connect100xdevs.xyz/portfolio/${slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareText =
    "Just launched my new portfolio! I'm passionate about turning ideas into reality through code. A huge thanks to the @connect100xdevs community for the inspiration. Take a look and let me know what you think! #100xdevs #Coding";
  const shareOnX = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    portfolioUrl
  )}&text=${encodeURIComponent(shareText)}`;
  const shareOnLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    portfolioUrl
  )}&text=${encodeURIComponent(shareText)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 bg-neutral-800/50 border border-violet-500/50 rounded-2xl text-center"
    >
      <h3 className="text-2xl font-bold text-white mb-2">
        Success! Your portfolio is live.
      </h3>
      <p className="text-neutral-400 mb-6">
        Share your new portfolio with the world.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-neutral-900 border border-neutral-700 rounded-lg p-2 max-w-xl mx-auto">
        <Link to={portfolioUrl}>
          <span className="text-sky-400 font-mono text-sm truncate flex-grow text-left pl-2">
            {portfolioUrl}
          </span>
        </Link>
        <button
          type="button"
          onClick={copyToClipboard}
          className="w-full sm:w-auto flex-shrink-0 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all"
        >
          {copied ? <FaCheckCircle /> : <FaCopy />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <a
          href={shareOnX}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] text-white font-bold py-2 px-5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <FaTwitter /> Share on X
        </a>
        <a
          href={shareOnLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0A66C2] text-white font-bold py-2 px-5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <FaLinkedin /> Share on LinkedIn
        </a>
      </div>
    </motion.div>
  );
};
