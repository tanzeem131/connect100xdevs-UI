import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../components/Card";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { TextInputError, TextInputHeading } from "../components/TextInput";
import { Loader } from "../components/Loader";

const Requests = () => {
  const [loading, setLoading] = useState(false);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.connectionRequest));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center align-middle items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!requests) return <TextInputError text={"Request not processed."} />;

  if (requests.length === 0)
    return <TextInputError text={"No Request Found!"} />;

  return (
    <div className="text-center mt-5 min-h-screen">
      <TextInputHeading text={"Requests"} />

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          skills,
          about,
        } = request.fromUserId;

        return (
          <div key={_id}>
            <Card
              _id={_id}
              firstName={firstName}
              lastName={lastName}
              photoUrl={photoUrl}
              age={age}
              gender={gender}
              skills={skills}
              about={about}
              actions={"request"}
              onClickAccept={() => reviewRequest("accepted", request._id)}
              onClickReject={() => reviewRequest("rejected", request._id)}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
