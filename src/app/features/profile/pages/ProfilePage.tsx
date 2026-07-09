import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";
import ProfileCard from "../components/ProfileCard";
import UserInformationCard from "../components/UserInformationCard";
import FinancialInformationCard from "../components/FinancialInformationCard";
import EditProfileModal from "../components/EditProfileModal";
import "../../../../assets/css/features/profile/profile-page.css";
import { useState } from "react";
import ErrorState from "../../../components/common/Error/ErrorState";
import LoadingSpinner from "../../../components/common/Loading/LoadingSpinner";
import { useProfile } from "../hooks/useProfile";

const ProfilePage = () => {
  const { profile, loading, error, updateProfile } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  if (error || !profile) {
    return (
      <DashboardLayout>
        <div className="profile-page">
          <section className="profile-header">
            <div>
              <h1 className="profile-title">Profile</h1>

              <p className="profile-subtitle">
                Manage your account information and financial preferences
              </p>
            </div>
          </section>

          <ErrorState
            title="Unable to load profile"
            description="Please check your connection and try again"
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="profile-page">
        <section className="profile-header">
          <div>
            <h1 className="profile-title">Profile</h1>

            <p className="profile-subtitle">
              Manage your account information and financial preferences
            </p>
          </div>

          <button
            className="edit-profile-button"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </button>
        </section>

        <section className="profile-content">
          <ProfileCard profile={profile} />

          <UserInformationCard profile={profile} />

          <FinancialInformationCard profile={profile} />
        </section>

        <EditProfileModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
          onSave={updateProfile}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
