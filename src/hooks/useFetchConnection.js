import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const useFetchConnections = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    if (!connections || connections.length === 0) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await axios.get(BASE_URL + "/user/connections", {
            withCredentials: true,
          });
          dispatch(addConnections(res.data.data));
          setLoading(false);
        } catch (err) {
          console.error("Failed to fetch connections:", err);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [dispatch, connections]);

  return { connections, loading };
};

export default useFetchConnections;
