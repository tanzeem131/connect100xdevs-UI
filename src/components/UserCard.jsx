import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, skills, about } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card glass w-96 h-fit">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body text-[#C59F60]">
        <h2 className="card-title bg-[#181017] w-fit p-1 rounded-xl">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <div className="bg-[#181017] w-fit p-1 rounded-xl">
            {age + gender}
          </div>
        )}
        {skills && (
          <div className="text-wrap bg-[#181017] p-1 w-fit rounded-xl">
            {skills}
          </div>
        )}
        {about && (
          <div className="text-wrap bg-[#181017] w-fit p-1 rounded-xl">
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
