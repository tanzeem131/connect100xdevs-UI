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

  return (
    <div className="w-96 max-h-[550px] rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(197,159,96,0.3)] bg-gradient-to-b from-[#1e1c1f] to-[#14121d]">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-64 object-cover object-center"
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white drop-shadow-lg">
            {firstName} {lastName}
          </h2>

          {githubUsername && (
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-[#24292e] text-white px-3 py-1 rounded-full text-sm hover:bg-[#2b3137] transition-colors"
            >
              <FaGithub className="text-lg" />
              <span>{githubUsername}</span>
            </a>
          )}
        </div>
      </div>
      <div className="p-5 space-y-4">
        {(age || gender) && (
          <div className="flex items-center gap-4 text-[#C59F60]">
            {age && (
              <div className="flex items-center gap-1">
                <IoMdTime className="text-lg" />
                <span>{age}</span>
              </div>
            )}
            {gender && (
              <div className="flex items-center gap-1">
                <FaUserAlt className="text-lg" />
                <span>{gender}</span>
              </div>
            )}
          </div>
        )}

        {skills && (
          <div className="space-y-2">
            <h3 className="text-sm uppercase text-gray-400 font-semibold tracking-wider">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#181017] text-[#C59F60] text-xs rounded-full border border-[#C59F60] border-opacity-30">
                {skills}
              </span>
            </div>
          </div>
        )}

        {about && (
          <div className="space-y-2">
            <h3 className="text-sm uppercase text-gray-400 font-semibold tracking-wider">
              About
            </h3>
            <p className="text-[#C59F60] text-sm leading-relaxed line-clamp-3">
              {about}
            </p>
          </div>
        )}

        <div className="pt-4 flex justify-between gap-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="w-1/2 py-2 rounded-lg bg-[#181017] text-[#C59F60] border border-[#C59F60] border-opacity-30 hover:bg-[#24171E] transition-colors font-medium"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="w-1/2 py-2 rounded-lg bg-[#C59F60] text-[#181017] hover:bg-[#D7B278] transition-colors font-medium"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
