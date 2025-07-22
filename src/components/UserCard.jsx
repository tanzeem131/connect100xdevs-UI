import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { FaGithub } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import GitHubCalendar from "react-github-calendar";
import { UserCardBtn } from "./Button";

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

  return (
    <div className="relative w-96 max-h-fit rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1c] border-4 border-transparent hover:border-[#8A2BE2] hover:shadow-[0_0_25px_rgba(138,43,226,0.6)] group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-transparent to-blue-800/20 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
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

      <div className="p-2 space-y-3 text-gray-200">
        {(age || gender) && (
          <div className="flex items-center gap-6 text-purple-300 font-medium">
            {age && (
              <div className="flex items-center gap-2">
                <IoMdTime className="text-[14px] text-purple-400" />
                <span className="text-[12px]">{age} years</span>
              </div>
            )}
            {gender && (
              <div className="flex items-center gap-2">
                <FaUserAlt className="text-[14px] text-purple-400" />
                <span className="text-[12px]">{gender}</span>
              </div>
            )}
          </div>
        )}
        {skills && (
          <div className="space-y-1">
            <p className="text-[12px] uppercase text-gray-400 font-bold tracking-widest border-b border-gray-700 pb-0">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-[2px] bg-[#2a0f3a] text-purple-300 text-[12px] rounded-full border border-purple-600 border-opacity-50 shadow-inner transition-transform duration-200 hover:scale-105">
                  {skills}
                </span>
              </div>
            </div>
          </div>
        )}
        {about && (
          <div className="space-y-1">
            <p className="text-[12px] uppercase text-gray-400 font-bold tracking-widest border-b border-gray-700 pb-0">
              About
            </p>
            <p className="text-[12px] text-gray-300 leading-relaxed italic">
              "{about}"
            </p>
          </div>
        )}
        <GitHubCalendar username={githubUsername} />
        <div className="pt-2 flex justify-between gap-4">
          <UserCardBtn
            onClick={() => handleSendRequest("ignored", _id)}
            text={"Ignore"}
            firstColor={"zinc"}
            secondColor={"neutral"}
          />
          <UserCardBtn
            onClick={() => handleSendRequest("interested", _id)}
            text={"Interested"}
            firstColor={"purple"}
            secondColor={"blue"}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
