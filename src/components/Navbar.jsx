import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
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
    <div className="navbar bg-black border-b-2 border-base-100 sm:px-0 md:px-4 lg:px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost sm:text-xl text-sm">
          connect100xdevs
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control sm:text-xl text-xs">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end sm:mx-5 mx-2 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
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
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
              <li>
                <a onClick={handleDeleteAccount}>Delete Account</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;
