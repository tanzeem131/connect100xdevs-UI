import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password, githubUsername },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="sm:grid flex grid-cols-12 flex-wrap justify-center bg-black my-0">
      <div className="col-span-3 bg-black">
        <div className="card bg-black w-full rounded-none">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            <div>
              {!isLoginForm && (
                <>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">First Name:</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      maxLength={30}
                      minLength={2}
                      required
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      maxLength={30}
                      minLength={2}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Github Username:</span>
                    </div>
                    <input
                      type="text"
                      value={githubUsername}
                      maxLength={40}
                      required
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setGithubUsername(e.target.value)}
                    />
                  </label>
                </>
              )}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Email ID:</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  maxLength={40}
                  required
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  value={password}
                  required
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="text-red-500">{error}</div>
            <div className="card-actions justify-center m-2">
              <button
                className="btn btn-primary"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
            <div
              className="m-auto cursor-pointer py-2"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Signup Here"
                : "Existing User? Login Here"}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-9 flex justify-center">
        <p className="great-vibes-regular font-bold lg:text-6xl md:text-5xl sm:text-3xl absolute sm:pt-10 pt-4 animate-blur-reduce">
          Step into the world of devs.
        </p>
        <img src="image/login.avif" className="h-full" />
      </div>
    </div>
  );
};
export default Login;
