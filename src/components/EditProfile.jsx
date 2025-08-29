import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { CgClose } from "react-icons/cg";

const genderOptions = ["male", "female", "other"];

const availableSkills = [
  // General Purpose & Backend Languages
  "JavaScript",
  "Python", // Inferred from Django/Flask but good to list explicitly
  "Java",
  "C#",
  "PHP",
  "Ruby", // Inferred from Rails
  "Go (Golang)",
  "Rust",
  "Kotlin",
  "Swift",
  "C++",
  "Scala",

  // Frontend Development
  "HTML",
  "CSS",
  "SASS/SCSS",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "Responsive Design",
  "JAMstack",

  // Backend Development
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Spring Boot",
  "ASP.NET Core",

  // Mobile Development
  "React Native",
  "Flutter",
  "Swift (for iOS)",
  "Kotlin (for Android)",
  "Java (for Android)",
  "Xamarin",

  // Database & Data Storage
  "SQL",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "Elasticsearch",
  "GraphQL",

  // Full Stack Frameworks
  "Full Stack Development",
  "MERN Stack",
  "MEAN Stack",

  // AI / ML / Data Science
  "Data Science",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Data Analysis",

  // Big Data Technologies
  "Apache Spark",
  "Apache Hadoop",
  "Apache Kafka",
  "Data Warehousing (e.g., Snowflake, BigQuery)",
  "ETL (Extract, Transform, Load)",

  // Web3 & Blockchain
  "Blockchain",
  "Smart Contracts",
  "Solidity",
  "Web3.js / Ethers.js",
  "Ethereum",
  "NFT Development",
  "DeFi (Decentralized Finance)",
  "Hardhat / Truffle",

  // DevOps & Cloud Infrastructure
  "Git",
  "Docker",
  "Kubernetes",
  "CI/CD (e.g., Jenkins, GitHub Actions)",
  "AWS (Amazon Web Services)",
  "Azure",
  "GCP (Google Cloud Platform)",
  // Infrastructure as Code (IaC)
  "Terraform",
  "Ansible",
  "Pulumi",
  // Observability & Monitoring
  "Prometheus",
  "Grafana",
  "Datadog",
  "ELK Stack",
  // Serverless Computing
  "AWS Lambda",
  "Google Cloud Functions",
  "Azure Functions",

  // Testing & Quality Assurance
  "Unit Testing",
  "Integration Testing",
  "End-to-End (E2E) Testing",
  "Test-Driven Development (TDD)",
  "Jest",
  "Cypress",
  "Selenium",
  "Playwright",
  "JUnit",
  "PyTest",

  // Cybersecurity
  "Network Security",
  "Application Security (AppSec)",
  "Penetration Testing",
  "Cryptography",
  "OWASP Top 10",
  "Identity and Access Management (IAM)",

  // Design
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Sketch",

  // Architecture & System Design
  "System Design",
  "Microservices Architecture",
  "REST APIs",
  "gRPC",
  "WebSockets",
  "Message Queues (e.g., RabbitMQ, SQS)",

  // Game Development
  "Unity",
  "Unreal Engine",

  // Embedded Systems & IoT
  "C / C++",
  "Arduino",
  "Raspberry Pi",
  "MQTT",

  // Soft Skills & Methodologies
  "Project Management",
  "Agile",
  "Scrum",
  "Kanban",
  "Communication",
  "Problem Solving",
  "Teamwork & Collaboration",
  "Technical Writing & Documentation",
];

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [githubUsername] = useState(user.githubUsername);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [showSkill, setShowSkill] = useState(false);
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  // const saveProfile = async () => {
  //   setError("");
  //   try {
  //     const res = await axios.patch(
  //       BASE_URL + "/profile/edit",
  //       {
  //         firstName,
  //         lastName,
  //         photoUrl,
  //         age,
  //         gender,
  //         skills,
  //         about,
  //       },
  //       { withCredentials: true }
  //     );
  //     dispatch(addUser(res?.data?.data));
  //     setShowToast(true);
  //     setTimeout(() => {
  //       setShowToast(false);
  //     }, 3000);
  //   } catch (err) {
  //     setError(err?.name || "An unexpected error occurred");
  //   }
  // };
  const saveProfile = async () => {
    setError("");
    setIsRateLimited(false);

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
      if (err.response?.status === 429) {
        const rateLimitData = err.response.data;
        setIsRateLimited(true);

        // Use the retryAfter timestamp from backend
        const retryAfter = rateLimitData.retryAfter;
        const now = Math.floor(Date.now() / 1000);
        const minutesLeft = Math.ceil((retryAfter - now) / 60);

        setError(`${rateLimitData.message} (${minutesLeft} minutes remaining)`);
      } else {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "An unexpected error occurred"
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center mt-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-gray-400/5 w-96 shadow-xl border-2 rounded-lg border-[#C59F60]/20">
            <div className="card-body">
              <h2 className="card-title justify-center border-2 border-[#C59F60] p-2 rounded-full">
                Edit Profile
              </h2>
              <div>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input rounded-lg input-bordered w-full max-w-xs bg-black"
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
                    className="input rounded-lg input-bordered w-full max-w-xs bg-black"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <div className="label">
                  <span className="label-text">Photo URL:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input rounded-lg input-bordered w-full max-w-xs bg-black"
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
                    className="input rounded-lg input-bordered w-full max-w-xs bg-black"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <div className="flex gap-4">
                    {genderOptions?.map((item, index) => (
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
                    <span className="label-text">About:</span>
                  </div>
                  <textarea
                    type="text"
                    value={about}
                    minLength={0}
                    maxLength={100}
                    className="input rounded-lg input-bordered text-wrap max-w-xs bg-black"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
                <label className="form-control flex flex-wrap text-wrap max-w-xs my-1">
                  <div className="label">
                    <span className="label-text">Skills:</span>
                  </div>
                  <div
                    onClick={() => setShowSkill(true)}
                    className="rounded-lg h-fit border-2 border-[#C59F60]/20 p-2 w-full max-w-xs bg-black flex flex-wrap gap-2"
                  >
                    {skills?.map((item, index) => (
                      <div
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSkills(skills.filter((skill) => skill !== item));
                        }}
                      >
                        <div className="flex gap-[2px] justify-center items-center align-middle border-2 rounded-md p-[1px] border-[#C59F60]">
                          <div>{item}</div>
                          <div>
                            <CgClose className="bg-red-600 rounded-sm" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {showSkill && (
                    <div className="bg-black text-white mt-2 p-2 rounded w-full overflow-y-auto max-h-40">
                      {availableSkills?.map((skill, index) => (
                        <ul key={index}>
                          <li
                            className="cursor-pointer hover:bg-gray-800 p-1 rounded"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              if (!skills?.includes(skill)) {
                                setSkills([...skills, skill]);
                              }
                            }}
                          >
                            {skill}
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-1">
                <button
                  className="p-3 text-black bg-[#39D353] rounded-md"
                  onClick={saveProfile}
                >
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
