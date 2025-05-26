import { FiArrowUp } from "react-icons/fi";
import { BsTwitterX, BsLinkedin } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-950 min-h-screen">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative select-none pointer-events-none">
          <div className="text-[18rem] font-bold text-teal-900/40 text-center">
            connect
          </div>
          <div className="text-[23rem] font-bold text-white text-center absolute top-32 left-1/2 transform -translate-x-1/2 mix-blend-overlay">
            100xdevs
          </div>
        </div>
      </div>

      <div className="relative z-10 px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-sm">
              <h2 className="text-3xl font-serif text-amber-900 mb-6 italic">
                Get Features Details!
              </h2>
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border-b-2 border-dotted border-gray-400 bg-transparent focus:outline-none focus:border-amber-700 text-center"
                />
              </div>
              <button className="px-8 py-3 border-2 border-orange-600/20 rounded-full text-orange-700 hover:bg-gray-100 transition-colors duration-300">
                Contact us
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-4 text-gray-600">
            <p className="text-lg font-medium text-blue-600 mb-2">
              Why choose us?
            </p>
            <a href="#" className="hover:text-amber-700 transition-colors">
              Reviews
            </a>
            <a href="#" className="hover:text-amber-700 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-amber-700 transition-colors">
              FAQ
            </a>
          </div>

          <div className="space-y-8">
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 bg-black">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center bg-transparent">
                  <div className="w-6 h-6 bg-amber-700 rounded transform rotate-45"></div>
                </div>
                <div>
                  <p className="text-white text-sm mb-2">
                    <span className="text-amber-700 font-semibold">Build</span>{" "}
                    meaningful connections.
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Match with developers who share your passions, projects, and
                    tech stack.
                  </p>
                  <Link to="/login">
                    <button className="text-amber-700 font-medium text-sm hover:cursor-pointer flex justify-center items-center gap-1">
                      Let's GO
                      <FaLocationArrow />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-[30%]">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} All rights reserved.
            </div>

            <div className="flex space-x-8 text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                Cookies
              </a>
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Made by Tanzeem</span>
              <div className="flex space-x-3">
                <Link to="https://x.com/Tanzeem_Dev">
                  <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <BsTwitterX size={16} className="text-gray-600" />
                  </button>
                </Link>
                <Link to="https://www.linkedin.com/in/mr-tanzeem/">
                  <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <BsLinkedin size={16} className="text-gray-600" />
                  </button>
                </Link>
                <button className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <FiArrowUp size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
