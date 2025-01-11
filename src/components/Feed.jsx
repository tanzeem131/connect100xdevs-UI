import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
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

  if (!feed) return;

  if (feed.length <= 0)
    return (
      <div
        className="flex justify-center h-screen items-center bg-cover bg-no-repeat animate-verticalScroll"
        style={{ backgroundImage: "url('/image/background-img.webp')" }}
      >
        <div className="text-black text-3xl font-extrabold bg-white p-4 rounded-xl">
          No new user found!
        </div>
      </div>
    );

  return (
    feed && (
      <div
        className="flex justify-center sm:py-20 py-4 bg-cover bg-no-repeat animate-verticalScroll"
        style={{ backgroundImage: "url('/image/background-img.webp')" }}
      >
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
