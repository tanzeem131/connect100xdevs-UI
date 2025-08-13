import axios from "axios";
import { BASE_URL, demoPortfolioLink } from "../utils/constants";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaBriefcase,
  FaLink,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaMapPin,
  FaEnvelope,
  FaPlus,
  FaTrash,
  FaCode,
} from "react-icons/fa";
import { FcPicture } from "react-icons/fc";
import { useSelector } from "react-redux";
import { TextInputError } from "../components/TextInput";
import { FormSection } from "../components/Portfolio/FormSection";
import { Input } from "../components/Portfolio/Input";
import { Textarea } from "../components/Portfolio/Textarea";
import { SharePortfolio } from "../components/Portfolio/SharePorfolio";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import { SiLeetcode } from "react-icons/si";
import { CreatePortfolioButton } from "../components/Portfolio/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CreatePortfolio() {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [savedSlug, setSavedSlug] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim(),
    title: "",
    location: "",
    email: userData?.emailId,
    profilepic: userData?.photoUrl,
    bio: userData?.about,
    workStatus: "Open to New Opportunities",
    socials: {
      github: userData?.githubUsername,
      twitter: "",
      linkedin: "",
      leetcode: "",
    },
    techStack: userData?.skills,
    currentlyExploring: [],
    experience: [{ role: "", company: "", period: "", description: "" }],
    keyAchievements: [""],
    projects: [
      { title: "", description: "", tech: [], codelink: "", livelink: "" },
    ],
    articles: [{ title: "", owner: "", link: "" }],
  });

  useEffect(() => {
    const loadInitialData = async () => {
      if (!userData?.githubUsername) {
        return navigate("/login");
      }

      try {
        const res = await axios.get(
          `${BASE_URL}/portfolio/${userData?.githubUsername}`
        );
        const savedData = res?.data?.portfolio;

        if (savedData) {
          setFormData({
            ...savedData,
            name: `${userData?.firstName || ""} ${
              userData?.lastName || ""
            }`.trim(),
            email: userData?.emailId || "",
            profilepic: userData?.photoUrl || "",
            socials: {
              ...savedData?.socials,
              github: userData?.githubUsername || "",
            },
            experience: savedData?.experience || [],
            projects: savedData?.projects || [],
            articles: savedData?.articles || [],
            keyAchievements: savedData?.keyAchievements || [],
          });
          return;
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          console.error("An unexpected error occurred", error);
        }
      }

      setFormData({
        name: `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim(),
        title: "",
        location: "",
        email: userData?.emailId || "",
        profilepic: userData?.photoUrl || "",
        bio: userData?.about || "",
        workStatus: "Open to New Opportunities",
        socials: {
          github: userData?.githubUsername || "",
          twitter: "",
          linkedin: "",
          leetcode: "",
        },
        techStack: userData?.skills || [],
        currentlyExploring: [],
        experience: [{ role: "", company: "", period: "", description: "" }],
        keyAchievements: [""],
        projects: [
          { title: "", description: "", tech: [], codelink: "", livelink: "" },
        ],
        articles: [{ title: "", owner: "", link: "" }],
      });
    };

    loadInitialData();
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value },
    }));
  };

  const handleListChange = (index, event, listName) => {
    const { name, value } = event.target;
    const list = [...formData[listName]];
    list[index][name] = value;
    setFormData((prev) => ({ ...prev, [listName]: list }));
  };

  const handleAddListItem = (listName, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], newItem],
    }));
  };

  const handleRemoveListItem = (index, listName) => {
    const list = [...formData[listName]];
    list.splice(index, 1);
    setFormData((prev) => ({ ...prev, [listName]: list }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSavedSlug(null);
    try {
      const res = await axios.post(BASE_URL + "/portfolio/save", formData, {
        withCredentials: true,
      });
      if (res?.data && res?.data?.portfolio) {
        setSavedSlug(res?.data?.portfolio?.slug);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-neutral-950 text-white font-sans p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-4">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 to-sky-400 text-transparent bg-clip-text">
              Create Your Portfolio
            </h1>
            <p className="text-neutral-400 mt-2">
              Fill out the details below to generate your stunning bento grid
              portfolio.
            </p>
          </header>
          <div className="flex justify-center mb-4">
            <Link to={demoPortfolioLink}>
              <CreatePortfolioButton text={"See a live portfolio"} />
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* --- Personal Details--- */}
            <FormSection title="Personal Details" icon={FaUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  icon={FaUser}
                  required
                />
                <Input
                  label="Job Role"
                  name="title"
                  value={formData?.title}
                  onChange={handleInputChange}
                  placeholder="Full Stack Engineer"
                  icon={FaBriefcase}
                  required
                />
                <Input
                  label="Location"
                  name="location"
                  value={formData?.location}
                  onChange={handleInputChange}
                  placeholder="Tokyo, Japan"
                  icon={FaMapPin}
                  required
                />
                <Input
                  label="Contact Email"
                  name="email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  icon={FaEnvelope}
                  required
                />
                <Input
                  label="Profile Picture URL"
                  name="profilepic"
                  value={formData?.profilepic}
                  onChange={handleInputChange}
                  placeholder="Profile Picture URL"
                  icon={FcPicture}
                  required
                />
              </div>
              <Textarea
                label="Bio / Quote"
                name="bio"
                value={formData?.bio}
                onChange={handleInputChange}
                placeholder="A short, catchy bio or your favorite quote..."
                required
              />
            </FormSection>

            {/* --- Social Links --- */}
            <FormSection title="Social Links" icon={FaLink}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="GitHub Username"
                  name="github"
                  value={formData?.socials?.github}
                  onChange={handleSocialChange}
                  placeholder="john-doe"
                  icon={FaGithub}
                  required
                />
                <Input
                  label="Twitter Handle"
                  name="twitter"
                  value={formData?.socials?.twitter}
                  onChange={handleSocialChange}
                  placeholder="@John_Doe"
                  icon={FaTwitter}
                  required
                />
                <Input
                  label="LinkedIn Profile"
                  name="linkedin"
                  value={formData?.socials?.linkedin}
                  onChange={handleSocialChange}
                  placeholder="John-Doe"
                  icon={FaLinkedin}
                  required
                />
                <Input
                  label="Leetcode Profile"
                  name="leetcode"
                  value={formData?.socials?.leetcode}
                  onChange={handleSocialChange}
                  placeholder="John-Doe"
                  icon={SiLeetcode}
                  required
                />
              </div>
            </FormSection>

            {/* --- Professional Details --- */}
            <FormSection title="Professional Details" icon={FaCode}>
              <Textarea
                label="Tech Stack (comma separated)"
                name="techStack"
                value={formData?.techStack?.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    techStack: e.target.value?.split(",")?.map((s) => s.trim()),
                  }))
                }
                placeholder="React, Node.js, Python..."
              />
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Work Status
                </label>
                <select
                  name="workStatus"
                  value={formData?.workStatus}
                  onChange={handleInputChange}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none transition-all"
                >
                  <option>Open to New Opportunities</option>
                  <option>Looking for Freelance</option>
                  <option>Currently Working</option>
                  <option>Hiring</option>
                </select>
              </div>
            </FormSection>

            {/* --- Recent Activity --- */}
            <FormSection title="Recent Activity" icon={FaCode}>
              <Textarea
                label="Currently Exploring (comma separated)"
                name="currentlyExploring"
                value={formData?.currentlyExploring?.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currentlyExploring: e.target.value
                      ?.split(",")
                      ?.map((s) => s.trim()),
                  }))
                }
                placeholder="React, Node.js, Python..."
              />
            </FormSection>

            {/* --- Articles & Insights --- */}
            <FormSection title="Articles & Insights" icon={FaCode}>
              <p className="text-sm text-neutral-400 -mt-2 mb-2">
                Share articles you've written or insightful engineering blog
                you've recently read.
              </p>
              {formData?.articles?.map((article, index) => (
                <div
                  key={index}
                  className="p-4 bg-neutral-900/80 rounded-lg border border-neutral-700 space-y-4 relative"
                >
                  <Input
                    label="Article Title"
                    name="title"
                    value={article?.title}
                    onChange={(e) => handleListChange(index, e, "articles")}
                    placeholder="Proxy vs Reverse Proxy"
                    icon={FaBriefcase}
                  />
                  <Input
                    label="Article Published Platform"
                    name="owner"
                    value={article?.owner}
                    onChange={(e) => handleListChange(index, e, "articles")}
                    placeholder="Meduim, Dev.to, Hasnode, Netflix....."
                    icon={FaBriefcase}
                  />
                  <Input
                    label="Article Link"
                    name="link"
                    value={article?.link}
                    onChange={(e) => handleListChange(index, e, "articles")}
                    placeholder="https://medium.com/"
                    icon={FaLink}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveListItem(index, "articles")}
                    className="absolute top-2 right-2 text-neutral-500 hover:text-rose-500 transition-colors"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  handleAddListItem("articles", {
                    title: "",
                    owner: "",
                    link: "",
                  })
                }
                className="w-fit mx-auto flex items-center justify-center gap-2 p-2 text-violet-400 hover:bg-violet-900/50 rounded-lg transition-colors"
              >
                <FaPlus size={16} /> Add More Articles & Insights
              </button>
            </FormSection>

            {/* --- Experience --- */}
            <FormSection title="Work Experience" icon={FaBriefcase}>
              {formData?.experience?.map((exp, index) => (
                <div
                  key={index}
                  className="p-4 bg-neutral-900/80 rounded-lg border border-neutral-700 space-y-4 relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Role"
                      name="role"
                      value={exp?.role}
                      onChange={(e) => handleListChange(index, e, "experience")}
                      placeholder="Software Engineer"
                      icon={FaBriefcase}
                    />
                    <Input
                      label="Company"
                      name="company"
                      value={exp?.company}
                      onChange={(e) => handleListChange(index, e, "experience")}
                      placeholder="Innovate Inc."
                      icon={FaUser}
                    />
                  </div>
                  <Input
                    label="Period"
                    name="period"
                    value={exp?.period}
                    onChange={(e) => handleListChange(index, e, "experience")}
                    placeholder="2021 - Present"
                    icon={FaUser}
                  />
                  <Textarea
                    label="Description"
                    name="description"
                    value={exp?.description}
                    onChange={(e) => handleListChange(index, e, "experience")}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveListItem(index, "experience")}
                    className="absolute top-2 right-2 text-neutral-500 hover:text-rose-500 transition-colors"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  handleAddListItem("experience", {
                    role: "",
                    company: "",
                    period: "",
                    description: "",
                  })
                }
                className="w-fit mx-auto flex items-center justify-center gap-2 p-2 text-violet-400 hover:bg-violet-900/50 rounded-lg transition-colors"
              >
                <FaPlus size={16} /> Add Experience
              </button>
            </FormSection>

            {/* --- Projects --- */}
            <FormSection title="Projects" icon={FaCode}>
              {formData?.projects?.map((project, index) => (
                <div
                  key={index}
                  className="p-4 bg-neutral-900/80 rounded-lg border border-neutral-700 space-y-4 relative"
                >
                  <Input
                    label="Project Title"
                    name="title"
                    value={project?.title}
                    onChange={(e) => handleListChange(index, e, "projects")}
                    placeholder="My Awesome App"
                    icon={FaBriefcase}
                  />
                  <Textarea
                    label="Description"
                    name="description"
                    value={project?.description}
                    onChange={(e) => handleListChange(index, e, "projects")}
                    placeholder="A brief description of your project..."
                  />
                  <Input
                    label="Tech Stack (comma separated)"
                    name="tech"
                    value={project?.tech.join(", ")}
                    onChange={(e) => {
                      const list = [...formData?.projects];
                      list[index].tech = e.target.value
                        ?.split(",")
                        ?.map((s) => s.trim());
                      setFormData((prev) => ({ ...prev, projects: list }));
                    }}
                    placeholder="React, Firebase, TailwindCSS"
                    icon={FaCode}
                  />
                  <Input
                    label="Project Code Link"
                    name="codelink"
                    value={project?.codelink}
                    onChange={(e) => handleListChange(index, e, "projects")}
                    placeholder="https://github.com/user/repo"
                    icon={FaLink}
                  />
                  <Input
                    label="Project Live Link"
                    name="livelink"
                    value={project?.livelink}
                    onChange={(e) => handleListChange(index, e, "projects")}
                    placeholder="https://connect100xdevs.xyz"
                    icon={FaLink}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveListItem(index, "projects")}
                    className="absolute top-2 right-2 text-neutral-500 hover:text-rose-500 transition-colors"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  handleAddListItem("projects", {
                    title: "",
                    description: "",
                    tech: [],
                    codelink: "",
                    livelink: "",
                  })
                }
                className="w-fit mx-auto flex items-center justify-center gap-2 p-2 text-violet-400 hover:bg-violet-900/50 rounded-lg transition-colors"
              >
                <FaPlus size={16} /> Add Project
              </button>
            </FormSection>

            {/* --- Key Achievements--- */}
            <FormSection title="Key Achievements" icon={FaBriefcase}>
              {formData?.keyAchievements?.map((achievement, index) => (
                <div
                  key={index}
                  className="p-4 bg-neutral-900/80 rounded-lg border border-neutral-700 space-y-4 relative"
                >
                  <Textarea
                    label={`Achievement #${index + 1}`}
                    name="achievement"
                    value={achievement}
                    onChange={(e) => {
                      const updatedAchievements = [...formData.keyAchievements];
                      updatedAchievements[index] = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        keyAchievements: updatedAchievements,
                      }));
                    }}
                    placeholder="e.g., Won 1st place in a hackathon..."
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveListItem(index, "keyAchievements")
                    }
                    className="absolute top-2 right-2 text-neutral-500 hover:text-rose-500 transition-colors"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddListItem("keyAchievements", "")}
                className="w-fit mx-auto flex items-center justify-center gap-2 p-2 text-violet-400 hover:bg-violet-900/50 rounded-lg transition-colors"
              >
                <FaPlus size={16} /> Add Achievements
              </button>
            </FormSection>

            <div className="pt-6">
              {error && <TextInputError text={error} />}
              <button
                type="submit"
                className="w-fit mx-auto flex items-center justify-center bg-gradient-to-r from-violet-600 to-sky-600 hover:from-violet-700 hover:to-sky-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all transform hover:scale-105"
              >
                Save & Generate Portfolio
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={!!savedSlug} onClose={() => setSavedSlug(null)}>
        <AnimatePresence>
          {savedSlug && <SharePortfolio slug={savedSlug} />}
        </AnimatePresence>
      </Modal>
    </>
  );
}
