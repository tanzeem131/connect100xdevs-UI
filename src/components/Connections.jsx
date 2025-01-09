import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections)
    return (
      <div className="flex justify-center my-10 text-[#BE7E40] h-screen">
        {" "}
        Connection not proccessed
      </div>
    );

  if (connections.length === 0)
    return (
      <div className="flex justify-center my-10 text-[#BE7E40] h-screen">
        {" "}
        No Connection Found
      </div>
    );

  return (
    <div className="text-center my-10 min-h-screen">
      <div className="text-bold text-[#BE7E40] sm:text-4xl text-xl">
        Connections
      </div>

      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          skills,
          about,
        } = connection;

        return (
          <div
            key={_id}
            className="m-4 p-4 rounded-lg bg-base-300 sm:w-[95%] lg:w-1/2 md:w-2/3 mx-auto"
          >
            <div className="grid grid-cols-12">
              <div className="col-span-4">
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                />
              </div>
              <div className="sm:text-left text-right mx-4 col-span-8">
                {(firstName || lastName) && (
                  <p className="font-bold sm:text-xl text-sm">
                    {firstName + " " + lastName}
                  </p>
                )}
                {skills && (
                  <p className="font-semibold sm:text-lg text-xs">{skills}</p>
                )}
                {(age || gender) && (
                  <p className="font-semibold sm:text-lg text-xs">
                    {age + ", " + gender}
                  </p>
                )}
                {about && <p>{about}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
