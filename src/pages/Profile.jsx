import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user)
    return (
      <div className="text-3xl font-bold flex justify-center">
        No user found
      </div>
    );
  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};
export default Profile;
