// import { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import { useForm } from "react-hook-form";
// import Footer from "../components/Footer";

// const HERO_IMAGE = "image/login.avif";

// const Login = () => {
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const handleLogin = async (data) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         {
//           emailId: data.emailId,
//           password: data.password,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       return navigate("/");
//     } catch (err) {
//       console.log(err?.response?.data);
//       setError(err?.response?.data || "Something went wrong");
//     }
//   };

//   const handleSignUp = async (data) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         {
//           firstName: data.firstName,
//           lastName: data.lastName,
//           emailId: data.emailId,
//           password: data.password,
//           githubUsername: data.githubUsername,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.data));
//       return navigate("/profile");
//     } catch (err) {
//       console.log(err?.response?.data?.error);
//       setError(err?.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-[#18191b] text-[#edeef0] font-sans">
//         <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 bg-gradient-to-br from-gray-800 to-gray-900">
//           <div className="lg:w-1/3 w-full max-w-md bg-[#111113] text-[#edeef0] p-8 rounded-xl shadow-2xl z-10">
//             <p className="text-3xl font-bold text-center mb-3">
//               {isLoginForm ? "Login to connect100" : "Join connect100"}
//               <span className="text-red-600">x</span>devs
//             </p>
//             <p className="border-b-2 border-[rgba(255,255,255,0.2)] mb-3"></p>
//             <form
//               onSubmit={handleSubmit(isLoginForm ? handleLogin : handleSignUp)}
//               className="space-y-4"
//             >
//               {!isLoginForm && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       First Name
//                     </label>
//                     <input
//                       type="text"
//                       {...register("firstName", {
//                         required: "First Name is required",
//                         minLength: {
//                           value: 2,
//                           message: "Minimum length is 2 characters",
//                         },
//                       })}
//                       className="w-full px-4 py-2 bg-gray-700/20 border border-gray-600/10 rounded-lg text-[#edeef0] focus:outline-none focus:ring-1 focus:ring-[rgb(38,38,38,0.3)]"
//                     />
//                     {errors.firstName && (
//                       <span className="text-red-500 text-sm">
//                         {errors.firstName.message}
//                       </span>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Last Name
//                     </label>
//                     <input
//                       type="text"
//                       {...register("lastName", {
//                         minLength: {
//                           value: 2,
//                           message: "Minimum length is 2 characters",
//                         },
//                       })}
//                       className="w-full px-4 py-2 bg-gray-700/20 border border-gray-600/10 rounded-lg text-[#edeef0] focus:outline-none focus:ring-1 focus:ring-[rgb(38,38,38,0.3)]"
//                     />
//                     {errors.lastName && (
//                       <span className="text-red-500 text-sm">
//                         {errors.lastName.message}
//                       </span>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       GitHub Username
//                     </label>
//                     <input
//                       type="text"
//                       {...register("githubUsername", {
//                         required: "GitHub Username is required",
//                         maxLength: {
//                           value: 40,
//                           message: "Maximum length is 40 characters",
//                         },
//                       })}
//                       className="w-full px-4 py-2 bg-gray-700/20 border border-gray-600/10 rounded-lg text-[#edeef0] focus:outline-none focus:ring-1 focus:ring-[rgb(38,38,38,0.3)]"
//                       placeholder="Github User Name"
//                     />
//                     {errors.githubUsername && (
//                       <span className="text-red-500 text-sm">
//                         {errors.githubUsername.message}
//                       </span>
//                     )}
//                   </div>
//                 </>
//               )}
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Email ID
//                 </label>
//                 <input
//                   type="email"
//                   {...register("emailId", {
//                     required: "Email ID is required",
//                     pattern: {
//                       value:
//                         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                       message: "Enter a valid email address",
//                     },
//                   })}
//                   className="w-full px-4 py-2 bg-gray-700/20 border border-gray-600/10 rounded-lg text-[#edeef0] focus:outline-none focus:ring-1 focus:ring-[rgb(38,38,38,0.3)]"
//                 />
//                 {errors.emailId && (
//                   <span className="text-red-500 text-sm">
//                     {errors.emailId.message}
//                   </span>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Minimum length is 6 characters",
//                     },
//                   })}
//                   className="w-full px-4 py-2 bg-gray-700/20 border border-gray-600/10 rounded-lg text-[#edeef0] focus:outline-none focus:ring-1 focus:ring-[rgb(38,38,38,0.3)]"
//                 />
//                 {errors.password && (
//                   <span className="text-red-500 text-sm">
//                     {errors.password.message}
//                   </span>
//                 )}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-[#0095ff] text-[#edeef0] font-semibold py-3 rounded-lg transition duration-300"
//               >
//                 {isLoginForm ? "Login" : "Sign Up"}
//               </button>
//             </form>
//             {error && (
//               <div className="text-red-500 text-center my-2 text-sm">
//                 {error}
//               </div>
//             )}
//             <div
//               className="text-center mt-4 text-[#edeef0] cursor-pointer hover:underline"
//               onClick={() => setIsLoginForm((value) => !value)}
//             >
//               {isLoginForm
//                 ? "New User? Sign Up Here"
//                 : "Existing User? Login Here"}
//             </div>
//           </div>

//           {/* Hero Content */}
//           <div className="lg:w-2/3 w-full flex flex-col items-center justify-center text-center px-4 lg:pl-12 mt-8 lg:mt-0">
//             <h1 className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text font-extrabold text-transparent text-center text-4xl md:text-6xl mb-4 animate-fade-in">
//               connect100xdevs
//             </h1>
//             <p className="text-lg md:text-xl mb-6 max-w-2xl animate-fade-in-delay">
//               Swipe, match, and code together. Join a community of developers
//               building the future, one connection at a time.
//             </p>
//             <p className="text-sm text-gray-400 animate-fade-in-delay-2">
//               Connect with coders worldwide. Collaborate on projects, join
//               hackathons, or grow your network.
//             </p>
//           </div>

//           <div
//             className="absolute inset-0 bg-cover bg-center opacity-20"
//             style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
//           ></div>
//         </section>

//         <section className="py-20 px-4 bg-[#111113]">
//           <p className="text-4xl font-bold text-center mb-12">
//             Why
//             <span className="bg-gradient-to-r from-teal-600 to-yellow-600 bg-clip-text lg:!text-6xl md:!text-4xl sm:!text-xl font-extrabold text-transparent text-center">
//               {" "}
//               connect100xdevs?
//             </span>
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             <div className="bg-teal-500/5 border-[rgb(38,38,38)] hover:border-teal-700 hover:bg-teal-500/10 transition-all duration-300 border p-6 rounded-lg shadow-lg hover:shadow-xl">
//               <div className="text-4xl mb-4">🚀</div>
//               <h3 className="text-xl font-bold mb-2">Match with Devs</h3>
//               <p className="text-teal-600 font-semibold">
//                 Find developers with similar skills and interests to collaborate
//                 on projects or share knowledge.
//               </p>
//             </div>
//             <div className="bg-yellow-500/5 border-[rgb(38,38,38)] hover:border-yellow-700 hover:bg-yellow-500/10 transition-all duration-300 border p-6 rounded-lg shadow-lg hover:shadow-xl ">
//               <div className="text-4xl mb-4">🌐</div>
//               <h3 className="text-xl font-bold mb-2">Build Your Network</h3>
//               <p className="text-yellow-600 font-semibold">
//                 Grow your professional network with developers from around the
//                 globe.
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Login;

import { FaGithub } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import { BsHeartFill } from "react-icons/bs";
import Footer from "../components/Footer";

const HERO_IMAGE = "image/login.avif";

const Login = () => {
  const handleGitHubLogin = () => {
    window.location.href = BASE_URL + "/github";
  };

  return (
    <div>
      <div className="min-h-screen bg-[#18191b] text-[#edeef0] font-sans">
        <section className="relative h-screen flex flex-col lg:flex-row items-center justify-center px-4 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="lg:w-1/3 w-full h-fit max-w-md bg-[#111113] text-[#edeef0] p-8 rounded-xl shadow-2xl z-10">
            <div className="flex items-center justify-center h-fit bg-gray-100 rounded-lg">
              <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <p className="text-2xl font-bold text-center text-gray-800">
                  connect100<span className="text-red-600">x</span>devs
                </p>

                <div className="my-4 flex items-center justify-center">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="mx-4 text-red-600">
                    <BsHeartFill />
                  </span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                <button
                  onClick={handleGitHubLogin}
                  className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                >
                  <FaGithub className="w-5 h-5 mr-2" />
                  Login with GitHub
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 w-full flex flex-col items-center justify-center text-center px-4 lg:pl-12 mt-8 lg:mt-0">
            <h1 className="bg-gradient-to-r from-amber-400 to-red-600 bg-clip-text font-extrabold text-transparent text-center text-4xl md:text-6xl mb-4 animate-fade-in">
              connect100xdevs
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl animate-fade-in-delay">
              Swipe, match, and code together. Join a community of developers
              building the future, one connection at a time.
            </p>
            <p className="text-sm text-gray-400 animate-fade-in-delay-2">
              Connect with coders worldwide. Collaborate on projects, join
              hackathons, or grow your network.
            </p>
          </div>

          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          ></div>
        </section>

        <section className="py-20 px-4 bg-[#111113]">
          <p className="text-4xl font-bold text-center mb-12">
            Why
            <span className="bg-gradient-to-r from-teal-600 to-yellow-600 bg-clip-text lg:!text-6xl md:!text-4xl sm:!text-xl font-extrabold text-transparent text-center">
              {" "}
              connect100xdevs?
            </span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-teal-500/5 border-[rgb(38,38,38)] hover:border-teal-700 hover:bg-teal-500/10 transition-all duration-300 border p-6 rounded-lg shadow-lg hover:shadow-xl">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Match with Devs</h3>
              <p className="text-teal-600 font-semibold">
                Find developers with similar skills and interests to collaborate
                on projects or share knowledge.
              </p>
            </div>
            <div className="bg-yellow-500/5 border-[rgb(38,38,38)] hover:border-yellow-700 hover:bg-yellow-500/10 transition-all duration-300 border p-6 rounded-lg shadow-lg hover:shadow-xl ">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-2">Build Your Network</h3>
              <p className="text-yellow-600 font-semibold">
                Grow your professional network with developers from around the
                globe.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
