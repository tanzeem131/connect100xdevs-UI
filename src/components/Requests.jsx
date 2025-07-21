import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
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
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.connectionRequest));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return (
      <div className="flex justify-center my-10 text-purple-600 text-xl">
        Request not processed
      </div>
    );

  if (requests.length === 0)
    return (
      <div className="flex justify-center my-10 text-purple-600 text-xl">
        {" "}
        No Request Found
      </div>
    );

  return (
    // <div className="text-center my-10 h-screen">
    //   <h1 className="text-bold text-purple-600 text-xl">quests</h1>

    //   {requests.map((request) => {
    //     const { _id, firstName, lastName, photoUrl, age, gender, about } =
    //       request.fromUserId;

    //     return (
    //       <div
    //         key={_id}
    //         className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
    //       >
    //         <div>
    //           <img
    //             alt="photo"
    //             className="w-20 h-20 rounded-full object-cover"
    //             src={photoUrl}
    //           />
    //         </div>
    //         <div className="text-left mx-4 ">
    //           <h2 className="font-bold text-xl">
    //             {firstName + " " + lastName}
    //           </h2>
    //           {age && gender && <p>{age + ", " + gender}</p>}
    //           <p>{about}</p>
    //         </div>
    //         <div>
    //           <button
    //             className="btn btn-primary mx-2"
    //             onClick={() => reviewRequest("rejected", request._id)}
    //           >
    //             Reject
    //           </button>
    //           <button
    //             className="btn btn-secondary mx-2"
    //             onClick={() => reviewRequest("accepted", request._id)}
    //           >
    //             Accept
    //           </button>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    <div className="text-center my-10 min-h-screen">
      <div className="text-bold text-purple-600 text-xl">Requests</div>

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
          <div
            key={_id}
            className="m-4 p-4 rounded-lg bg-base-300 sm:w-[95%] lg:w-1/2 md:w-2/3 mx-auto"
          >
            <div className="grid grid-cols-12 place-items-center">
              <div className="col-span-2">
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div className="sm:text-left text-center sm:mx-4 mx-2 col-span-6">
                <p className="font-bold sm:text-xl text-sm">
                  {firstName + " " + lastName}
                </p>
                <p className="font-semibold sm:text-lg text-xs">{skills}</p>
                {age && gender && (
                  <p className="font-semibold sm:text-lg text-xs">
                    {age + ", " + gender}
                  </p>
                )}
                <p>{about}</p>
              </div>
              <div className="col-span-4 flex flex-wrap gap-2 items-center sm:justify-center justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
