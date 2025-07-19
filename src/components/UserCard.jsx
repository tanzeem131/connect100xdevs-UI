import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { FaGithub } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";

const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    skills,
    about,
    githubUsername,
  } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  // return (
  //   <div className="w-96 max-h-[550px] rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(197,159,96,0.3)] bg-gradient-to-b from-[#1e1c1f] to-[#14121d]">
  //     <div className="relative">
  //       <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
  //       <img
  //         src={photoUrl}
  //         alt={`${firstName} ${lastName}`}
  //         className="w-full h-64 object-cover object-center"
  //       />
  //       <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
  //         <h2 className="text-xl font-bold text-white drop-shadow-lg">
  //           {firstName} {lastName}
  //         </h2>

  //         {githubUsername && (
  //           <a
  //             href={`https://github.com/${githubUsername}`}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="flex items-center gap-1 bg-[#24292e] text-white px-3 py-1 rounded-full text-sm hover:bg-[#2b3137] transition-colors"
  //           >
  //             <FaGithub className="text-lg" />
  //             <span>{githubUsername}</span>
  //           </a>
  //         )}
  //       </div>
  //     </div>
  //     <div className="p-5 space-y-4">
  //       {(age || gender) && (
  //         <div className="flex items-center gap-4 text-[#C59F60]">
  //           {age && (
  //             <div className="flex items-center gap-1">
  //               <IoMdTime className="text-lg" />
  //               <span>{age}</span>
  //             </div>
  //           )}
  //           {gender && (
  //             <div className="flex items-center gap-1">
  //               <FaUserAlt className="text-lg" />
  //               <span>{gender}</span>
  //             </div>
  //           )}
  //         </div>
  //       )}

  //       {skills && (
  //         <div className="space-y-2">
  //           <h3 className="text-sm uppercase text-gray-400 font-semibold tracking-wider">
  //             Skills
  //           </h3>
  //           <div className="flex flex-wrap gap-2">
  //             <span className="px-3 py-1 bg-[#181017] text-[#C59F60] text-xs rounded-full border border-[#C59F60] border-opacity-30">
  //               {skills}
  //             </span>
  //           </div>
  //         </div>
  //       )}

  //       {about && (
  //         <div className="space-y-2">
  //           <h3 className="text-sm uppercase text-gray-400 font-semibold tracking-wider">
  //             About
  //           </h3>
  //           <p className="text-[#C59F60] text-sm leading-relaxed line-clamp-3">
  //             {about}
  //           </p>
  //         </div>
  //       )}

  //       <div className="pt-4 flex justify-between gap-4">
  //         <button
  //           onClick={() => handleSendRequest("ignored", _id)}
  //           className="w-1/2 py-2 rounded-lg bg-[#181017] text-[#C59F60] border border-[#C59F60] border-opacity-30 hover:bg-[#24171E] transition-colors font-medium"
  //         >
  //           Ignore
  //         </button>
  //         <button
  //           onClick={() => handleSendRequest("interested", _id)}
  //           className="w-1/2 py-2 rounded-lg bg-[#C59F60] text-[#181017] hover:bg-[#D7B278] transition-colors font-medium"
  //         >
  //           Interested
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="relative w-96 max-h-[600px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1c] border-4 border-transparent hover:border-[#8A2BE2] hover:shadow-[0_0_25px_rgba(138,43,226,0.6)] group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-transparent to-blue-800/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

        <img
          src={
            photoUrl ||
            "https://placehold.co/400x256/333333/FFFFFF?text=User+Image"
          }
          alt={`${firstName} ${lastName}`}
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          {" "}
          <h2 className="text-3xl font-extrabold text-white drop-shadow-xl tracking-wide">
            {firstName} {lastName}
          </h2>
          {githubUsername && (
            <a
              href={`https://github.com/${githubUsername}`}
              className="flex items-center gap-2 bg-gray-700/70 backdrop-blur-sm text-gray-200 px-1 py-1 rounded-full text-[12px] font-semibold hover:bg-gray-600 hover:text-white transition-colors duration-200 shadow-md border border-gray-600"
            >
              <FaGithub className="text-xl" />
              <span>{githubUsername}</span>
            </a>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5 text-gray-200">
        {" "}
        {(age || gender) && (
          <div className="flex items-center gap-6 text-purple-300 font-medium">
            {" "}
            {age && (
              <div className="flex items-center gap-2">
                <IoMdTime className="text-xl text-purple-400" />{" "}
                <span>{age} years</span>
              </div>
            )}
            {gender && (
              <div className="flex items-center gap-2">
                <FaUserAlt className="text-xl text-purple-400" />{" "}
                <span>{gender}</span>
              </div>
            )}
          </div>
        )}
        {skills && (
          <div className="space-y-3">
            {" "}
            <h3 className="text-sm uppercase text-gray-400 font-bold tracking-widest border-b border-gray-700 pb-2">
              {" "}
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1 bg-[#2a0f3a] text-purple-300 text-sm rounded-full border border-purple-600 border-opacity-50 shadow-inner transition-transform duration-200 hover:scale-105">
                  {skills}
                </span>
              </div>
            </div>
          </div>
        )}
        {about && (
          <div className="space-y-3">
            {" "}
            <h3 className="text-sm uppercase text-gray-400 font-bold tracking-widest border-b border-gray-700 pb-2">
              {" "}
              About
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
              {" "}
              {about}
            </p>
          </div>
        )}
        <div className="pt-6 flex justify-between gap-4">
          {" "}
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="w-1/2 py-3 rounded-xl bg-gray-700/50 backdrop-blur-sm text-gray-300 border border-gray-600 hover:bg-gray-600/70 transition-colors font-semibold shadow-lg transform hover:-translate-y-1"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
