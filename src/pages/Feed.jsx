import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "../components/Loader";
import { TextInputError } from "../components/TextInput";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed && feed.length > 0) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading feed.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center align-middle items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return navigate("/login");
  }

  if (!feed) {
    return <TextInputError text={error} />;
  }

  if (feed?.length === 0) {
    return <TextInputError text={"No new user found!"} />;
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 sm:py-20 py-4 bg-cover bg-no-repeat animate-verticalScroll">
      <AnimatePresence>
        {feed.slice(0, 3).map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            layout
          >
            <UserCard user={user} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
