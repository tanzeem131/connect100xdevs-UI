import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { CreatePortfolioButton } from "./Portfolio/Button";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );

      if (!confirmDelete) {
        return;
      }

      await axios.delete(BASE_URL + "/user/delete-account", {
        withCredentials: true,
      });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-black border-b-2 border-purple-800/50 sm:px-0 md:px-4 lg:px-6">
      <div className="flex-1">
        <Link to="/" className="sm:text-3xl text-2xl text-white font-extrabold">
          connect100<span className="text-red-600">x</span>devs
        </Link>
      </div>
      {user ? (
        <div className="flex-none gap-2">
          <div className="form-control text-purple-600 sm:text-sm text-xs">
            Welcome,{" "}
            <span className="text-white sm:text-xl text-xs">
              {user.firstName}
            </span>
          </div>
          <div className="dropdown dropdown-end bg-black sm:mx-5 mx-2 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  className="rounded-full object-cover border-2 border-purple-600 "
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black border-2 border-purple-800 rounded-lg text-gray-100 z-[1] mt-16 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/">Feed</Link>
              </li>
              <li className="bg-orange-600 text-black font-semibold">
                <Link to={`/portfolio`}>PORTFOLIO</Link>
              </li>
              <li className="bg-teal-600 text-white font-semibold">
                <Link to={`/resume`}>RESUME</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
              <li>
                <a onClick={handleDeleteAccount} className="text-red-600">
                  Delete Account
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link to={"/portfolio"}>
          <CreatePortfolioButton text={"Create Your Portfolio"} />
        </Link>
      )}
    </div>
  );
};
export default NavBar;
