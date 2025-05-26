import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const genderOptions = ["male", "female", "other"];

const availableSkills = [
  // Frontend
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "HTML",
  "CSS",
  "SASS/SCSS",
  // Backend
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Ruby on Rails",
  "PHP",
  "Java",
  "Spring Boot",
  // Database
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Firebase",
  // Full Stack
  "Full Stack Development",
  "MERN Stack",
  "MEAN Stack",
  "JAMstack",
  // AI/ML
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "TensorFlow",
  "PyTorch",
  "Data Science",
  // Web3
  "Blockchain",
  "Smart Contracts",
  "Solidity",
  "Web3.js",
  "Ethereum",
  "NFT Development",
  "DeFi",
  // DevOps
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "CI/CD",
  "Git",
  // Design
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Responsive Design",
  // Other
  "Data Analysis",
  "Project Management",
  "Agile",
  "Scrum",
  "Communication",
  "Problem Solving",
];

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [githubUsername] = useState(user.githubUsername);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          skills,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err?.name || "An unexpected error occurred");
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    maxLength={30}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    maxLength={30}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <div className="label">
                  <span className="label-text">Photo URL:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  maxLength={500}
                />
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <div className="flex gap-4">
                    {genderOptions.map((item, index) => (
                      <>
                        <div
                          key={index}
                          onClick={() => setGender(item)}
                          className={`cursor-pointer px-3 py-1 text-sm rounded-md 
                              bg-[#24292e] text-[#C59F60]
                          }`}
                        >
                          {item}
                        </div>
                      </>
                    ))}
                  </div>
                </label>
                <label className="form-control flex flex-wrap text-wrap max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Skills:</span>
                  </div>

                  {/* <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => (
                      <div
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`cursor-pointer px-3 py-1 text-sm rounded-md ${
                          skills.includes(skill)
                            ? "bg-green-500 text-white"
                            : "bg-[#24292e]"
                        }`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div> */}

                  <textarea
                    type="text"
                    value={skills}
                    minLength={0}
                    maxLength={100}
                    className="input input-bordered text-wrap max-w-xs"
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </label>
                <label className="form-control flex flex-wrap text-wrap max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <textarea
                    type="text"
                    value={about}
                    minLength={0}
                    maxLength={100}
                    className="input input-bordered text-wrap max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-1">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            skills,
            about,
            githubUsername,
          }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
