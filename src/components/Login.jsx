import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useForm } from "react-hook-form";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: data.emailId,
          password: data.password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.log(err?.response?.data);
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async (data) => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          emailId: data.emailId,
          password: data.password,
          githubUsername: data.githubUsername,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err?.response?.data?.error);
      setError(err?.response?.data?.error || "Something went wrong");
    }
  };
  console.log("render");

  return (
    <div className="sm:grid flex grid-cols-12 flex-wrap justify-center bg-black my-0">
      <div className="col-span-3 bg-black">
        <div className="card bg-black w-full rounded-none">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            <form
              onSubmit={handleSubmit(isLoginForm ? handleLogin : handleSignUp)}
            >
              {!isLoginForm && (
                <>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">First Name:</span>
                    </div>
                    <input
                      type="text"
                      {...register("firstName", {
                        required: "First Name is required",
                        minLength: {
                          value: 2,
                          message: "Minimum length is 2 characters",
                        },
                      })}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.firstName && (
                      <span className="text-red-500">
                        {errors.firstName.message}
                      </span>
                    )}
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      {...register("lastName", {
                        minLength: {
                          value: 2,
                          message: "Minimum length is 2 characters",
                        },
                      })}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.lastName && (
                      <span className="text-red-500">
                        {errors.lastName.message}
                      </span>
                    )}
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">
                        Github Username (You must have atleast 50 public
                        contributionsin in 2024):
                      </span>
                    </div>
                    <input
                      type="text"
                      {...register("githubUsername", {
                        required: "Github Username is required",
                        maxLength: {
                          value: 40,
                          message: "Maximum length is 40 characters",
                        },
                      })}
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.githubUsername && (
                      <span className="text-red-500">
                        {errors.githubUsername.message}
                      </span>
                    )}
                  </label>
                </>
              )}
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Email ID:</span>
                </div>
                <input
                  type="email"
                  {...register("emailId", {
                    required: "Email ID is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.emailId && (
                  <span className="text-red-500">{errors.emailId.message}</span>
                )}
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length is 6 characters",
                    },
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <div className="text-red-500">{error}</div>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" type="submit">
                  {isLoginForm ? "Login" : "Sign Up"}
                </button>
              </div>
            </form>
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
