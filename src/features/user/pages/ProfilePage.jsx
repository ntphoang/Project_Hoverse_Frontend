import React, { useEffect } from "react";
import Layout from "@/layouts/Layout";
import ProfileContainer from "../components/ProfileContainer";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "Hồ sơ cá nhân | Hoverse";
  }, []);

  return (
    <Layout>
      <main className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto flex flex-col">
          <ProfileContainer />
        </div>
      </main>
    </Layout>
  );
};

export default ProfilePage;