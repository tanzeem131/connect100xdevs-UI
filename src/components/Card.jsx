import { Link } from "react-router-dom";
import { RequestBtn } from "./Button";

export const Card = ({
  _id,
  firstName,
  lastName,
  photoUrl,
  age,
  gender,
  skills,
  about,
  actions,
  onClickAccept,
  onClickReject,
}) => {
  return (
    <div className="m-4 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 sm:w-[95%] lg:w-1/2 md:w-2/3 mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0">
          <img
            alt={`${firstName || ""} ${lastName || ""}'s photo`}
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
            <p className="font-medium text-lg text-gray-300 mb-1">{skills}</p>
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
            <div className="flex flex-col gap-5">
              <RequestBtn
                text={"Accept"}
                onClick={onClickAccept}
                color={"green"}
              />
              <RequestBtn
                text={"Reject"}
                onClick={onClickReject}
                color={"red"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
