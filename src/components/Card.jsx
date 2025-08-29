import { Link } from "react-router-dom";
import { RequestBtn } from "./Button";
import { FaGithub } from "react-icons/fa";
import GitHubCalendar from "react-github-calendar";

export const Card = ({
  _id,
  firstName,
  lastName,
  photoUrl,
  age,
  gender,
  skills,
  about,
  githubUsername,
  actions,
  onClickAccept,
  onClickReject,
}) => {
  return (
    <div className="sm:m-4 sm:p-4 m-8 p-2 sm:mx-auto rounded-2xl shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 w-fit transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0">
          <img
            alt={`${firstName || ""}'s photo`}
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-lg"
            src={photoUrl}
          />
        </div>
        <div className="flex-grow text-center sm:text-left">
          {(firstName || lastName) && (
            <p className="font-extrabold text-2xl tracking-wide text-purple-400 mb-1">
              {firstName} {lastName}
            </p>
          )}
          {skills && (
            <div className="space-y-1">
              <p className="text-[12px] uppercase text-gray-400 font-bold tracking-widest border-b border-gray-700 pb-0">
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  {skills?.map((skill, index) => (
                    <span
                      key={skill}
                      className="px-2 py-[2px] bg-[#2a0f3a] text-purple-300 text-[12px] rounded-full border border-purple-600 border-opacity-50 shadow-inner transition-transform duration-200 hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {(age || gender) && (
            <p className="text-md text-gray-400 mb-2">
              {age}
              {age && gender ? ", " : ""}
              {gender}
            </p>
          )}
          {about && (
            <p className="text-sm text-gray-300 leading-relaxed italic">
              "{about}"
            </p>
          )}
          <div className="sm:max-w-[450px] max-w-[350px] ">
            {githubUsername && (
              <a
                href={`https://github.com/${githubUsername}`}
                className="w-fit flex items-center gap-2 my-2 bg-gray-700/70 backdrop-blur-sm text-gray-200 px-1 py-1 rounded-full text-[12px] font-semibold hover:bg-gray-600 hover:text-white transition-colors duration-200 shadow-md border border-gray-600"
              >
                <FaGithub className="text-xl" />
                <span>{githubUsername}</span>
              </a>
            )}
            <GitHubCalendar username={githubUsername} />
          </div>
        </div>
        <div className="flex-shrink-0 mt-4 sm:mt-0">
          {actions === "connection" && (
            <Link to={`/chat/${_id}`}>
              <button className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:-translate-y-1">
                Chat
              </button>
            </Link>
          )}
          {actions === "request" && (
            <div className="flex sm:flex-col flex-row gap-5">
              <RequestBtn
                text={"Accept"}
                onClick={onClickAccept}
                color={"border-green-600"}
              />
              <RequestBtn
                text={"Reject"}
                onClick={onClickReject}
                color={"border-red-600"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
