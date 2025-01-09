import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { FaGithub } from "react-icons/fa";

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
  // console.log(user);

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
    <div className="card glass w-96 max-h-[550px]">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body text-[#C59F60]">
        <div className="flex justify-between">
          {(firstName || lastName) && (
            <div className="card-title bg-[#181017] text-lg w-fit px-2 rounded-md">
              {firstName + " " + lastName}
            </div>
          )}
          {githubUsername && (
            <div className="card-title bg-[#181017] text-sm w-fit px-2 rounded-md">
              <FaGithub />
              {githubUsername}
            </div>
          )}
        </div>
        {(age || gender) && (
          <div className="bg-[#181017] w-fit px-2 text-sm rounded-md flex flex-row gap-2">
            <div>{age} ⌚</div>
            <div>{gender}</div>
          </div>
        )}
        {skills && (
          <div className="text-wrap bg-[#181017] text-sm w-fit px-2 rounded-md">
            {skills}
          </div>
        )}
        {about && (
          <div className="text-wrap bg-[#181017] text-sm w-fit px-2 rounded-md">
            {about}
          </div>
        )}
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
