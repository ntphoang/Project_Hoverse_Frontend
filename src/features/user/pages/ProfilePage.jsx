import Layout from "@/layouts/Layout";
import ProfileContainer from "../components/ProfileContainer";
import styles from "../components/Profile.module.css";

const ProfilePage = () => {
  document.title = "Thông tin cá nhân - Hoverse";

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <ProfileContainer></ProfileContainer>
      </div>
    </Layout>
  );
};

export default ProfilePage;
