import { FaGithub } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "../components/Footer";

const Login = () => {
  const profiles = [
    {
      name: "coderJoe",
      stack: "React, Node.js, AWS",
      avatar: "https://placehold.co/100x100/1E293B/E2E8F0?text=CJ",
    },
    {
      name: "webDevJane",
      stack: "HTML, CSS, JS",
      avatar: "https://placehold.co/100x100/1E293B/E2E8F0?text=WJ",
    },
    {
      name: "dataWizard",
      stack: "Python, SQL, R",
      avatar: "https://placehold.co/100x100/1E293B/E2E8F0?text=DW",
    },
    {
      name: "goGuru",
      stack: "Go, Kubernetes",
      avatar: "https://placehold.co/100x100/1E293B/E2E8F0?text=GG",
    },
    {
      name: "mlManiac",
      stack: "Python, PyTorch",
      avatar: "https://placehold.co/100x100/1E293B/E2E8F0?text=MM",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const cardVariants = {
    initial: {
      rotate: 0,
      opacity: 0,
      y: 100,
      x: 0,
    },
    animate: (i) => ({
      rotate: [-5, 5, 0][i % 3],
      opacity: 1,
      y: 0,
      x: [-50, 0, 50][i % 3],
      transition: {
        duration: 1,
        delay: i * 0.2 + 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.2 },
    },
  };

  const handleGitHubLogin = () => {
    window.location.href = BASE_URL + "/github";
  };

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center font-sans overflow-hidden p-4 relative">
        <div className="absolute inset-0 bg-gray-950" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-sky-500/30 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 space-y-12 lg:space-y-0">
          <div className="lg:w-1/2 text-left lg:pr-20 space-y-6">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Beyond the Code. <br />
              <span className="text-sky-400">Find Your Next Connection.</span>
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Swipe, match, and code together. Join a community of developers
              building the future, one connection at a time.
            </motion.p>
            <motion.button
              className="mt-8 px-8 py-3 bg-sky-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-sky-500 transition-colors duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGitHubLogin}
            >
              <span className="flex items-center space-x-2">
                <FaGithub className="w-5 h-5 mr-2" />
                <span>Login with GitHub</span>
              </span>
            </motion.button>
          </div>

          <div
            ref={ref}
            className="relative w-full lg:w-1/2 flex items-center justify-center h-96"
          >
            <div className="relative w-[300px] h-[300px] flex justify-center items-center">
              {profiles.map((profile, index) => (
                <motion.div
                  key={profile.name}
                  className="absolute w-56 h-80 bg-gray-800 backdrop-blur-sm bg-opacity-80 rounded-3xl p-6 shadow-xl border border-gray-700 flex flex-col items-center justify-center cursor-pointer"
                  variants={cardVariants}
                  custom={index}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  whileHover="hover"
                  style={{
                    zIndex: profiles.length - index,
                    transformOrigin: "bottom center",
                  }}
                >
                  <img
                    src={profile.avatar}
                    alt={`${profile.name} avatar`}
                    className="w-20 h-20 rounded-full mb-4 border-2 border-sky-400"
                  />
                  <h3 className="text-xl font-bold text-sky-400">
                    @{profile.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{profile.stack}</p>
                  <button className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-full text-sm font-semibold">
                    Connect
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="py-20 px-4 bg-[#111113]">
        <p className="text-4xl font-bold text-center mb-12">
          Why
          <span className="bg-gradient-to-r from-teal-600 to-yellow-600 bg-clip-text lg:!text-6xl md:!text-4xl sm:!text-xl font-extrabold text-transparent text-center">
            {" "}
            connect100xdevs?
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="hover:cursor-pointer bg-teal-500/5 border-[rgb(38,38,38)] hover:border-teal-700 hover:bg-teal-500/10 transition-all duration-300 border p-6 rounded-lg shadow-lg hover:shadow-xl">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Match with Devs</h3>
            <p className="text-teal-600 font-semibold">
              Find developers with similar skills and interests to collaborate
              on projects or share knowledge.
            </p>
          </div>
          <div className="hover:cursor-pointer bg-yellow-500/5 border-[rgb(38,38,38)] hover:border-yellow-700 hover:bg-yellow-500/10 transition-all duration-300 border p-6 rounded-lg shadow-lg hover:shadow-xl ">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-bold mb-2">Build Your Network</h3>
            <p className="text-yellow-600 font-semibold">
              Grow your professional network with developers from around the
              globe.
            </p>
          </div>
          <div className="hover:cursor-pointer bg-purple-500/5 border-[rgb(38,38,38)] hover:border-purple-700 hover:bg-purple-500/10 transition-all duration-300 border p-6 rounded-lg shadow-lg hover:shadow-xl">
            <div className="text-4xl mb-4">👩🏻‍💻ᝰ.ᐟ</div>
            <h3 className="text-xl font-bold mb-2">
              Create Your Own Portfolio
            </h3>
            <p className="text-purple-600 font-semibold">
              Showcase your projects and skills with a personalized portfolio
              that stands out to recruiters.
            </p>
          </div>

          <div className="hover:cursor-pointer bg-sky-500/5 border-[rgb(38,38,38)] hover:border-sky-700 hover:bg-sky-500/10 transition-all duration-300 border p-6 rounded-lg shadow-lg hover:shadow-xl">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-bold mb-2">
              Create Your ATS-Friendly Resume
            </h3>
            <p className="text-sky-600 font-semibold">
              Build a professional resume optimized to pass through Applicant
              Tracking Systems.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
