import useProfile from "../hooks/useProfile";
import ProfileView from "./ProfileView";

const ProfileContainer = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error !== null) {
    return <div>{error}</div>;
  }

  return <ProfileView profile={profile}></ProfileView>;
};

export default ProfileContainer;
