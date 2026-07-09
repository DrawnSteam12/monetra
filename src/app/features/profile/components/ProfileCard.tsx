import { FaUserCircle } from "react-icons/fa";

import type { UserProfile } from "../types/profile.types";

import "../../../../assets/css/features/profile/profile-card.css";

type ProfileCardProps = {
  profile: UserProfile;
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <section className="profile-card">
      <div className="profile-avatar">
        <FaUserCircle />
      </div>

      <div className="profile-info">
        <h2>{profile.fullName}</h2>

        <p>{profile.email}</p>
      </div>
    </section>
  );
};

export default ProfileCard;
