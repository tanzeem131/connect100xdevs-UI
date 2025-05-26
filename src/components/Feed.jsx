import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { motion, AnimatePresence } from "framer-motion";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length === 0)
    return (
      <div className="flex justify-center h-screen items-center bg-cover bg-no-repeat animate-verticalScroll">
        <div className="text-black text-3xl font-extrabold bg-white p-4 rounded-xl">
          No new user found!
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center gap-5 sm:py-20 py-4 bg-cover bg-no-repeat animate-verticalScroll">
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
