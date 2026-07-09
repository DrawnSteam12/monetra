import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

import "../../../../assets/css/features/profile/user-information-card.css";

import type { UserProfile } from "../types/profile.types";

type UserInformationCardProps = { profile: UserProfile };

const UserInformationCard = ({ profile }: UserInformationCardProps) => {
  return (
    <section className="user-information-card">
      <div className="card-header">
        <h2>User Information</h2>

        <p>Personal account detail</p>
      </div>

      <div className="user-information-list">
        <div className="user-information-item">
          <FaEnvelope />
          <div>
            <span>Email</span>

            <strong>{profile.email}</strong>
          </div>
        </div>

        <div className="user-information-item">
          <FaPhone />

          <div>
            <span>Phone</span>

            <strong>{profile.phone || "Not set yet"}</strong>
          </div>
        </div>
        <div className="user-information-item">
          <FaMapMarkerAlt />

          <div>
            <span>Location</span>

            <strong>{profile.location || "Not set yet"}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInformationCard;
