import styles from "./Profile.module.css";

const ProfileView = ({ profile }) => {
  const avatarDefault =
    "https://www.svgrepo.com/show/452030/avatar-default.svg";

  return (
    <div className={styles.profileContainer}>
      <div className={styles.gradientBackground}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.avatarSection}>
          <img
            src={profile.avatarUrl || avatarDefault}
            alt={profile.username}
            className={styles.avatarImage}
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.nameRow}>
            <h1 className={styles.userName}>
              {profile.fullName || profile.username}
            </h1>
            <span className={styles.proBadge}>PRO ⚡</span>
          </div>

          <p className={styles.userTitle}>
            Email: {profile.email}
            <br />
            Ngày tham gia:{" "}
            {new Date(profile.createAt).toLocaleDateString("vi-VN")}
          </p>

          <div className={styles.actionButtons}>
            <button className={styles.btnFollow}>Theo dõi</button>
            <button className={styles.btnContact}>Liên hệ</button>
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Reviews</span>
            <span className={styles.statValue}>2,985</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Following</span>
            <span className={styles.statValue}>132</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Likes</span>
            <span className={styles.statValue}>548</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
