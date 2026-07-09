import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";

import { useEffect, useState } from "react";

import type { UserProfile } from "../types/profile.types";

import "../../../../assets/css/features/profile/edit-profile-modal.css";

type EditProfileModalProps = {
  open: boolean;

  onClose: () => void;

  profile: UserProfile;

  onSave: (updatedProfile: UserProfile) => void;
};

const formatCurrencyInput = (value: string) => {
  const numericValue = value.replace(/,/g, "");

  if (numericValue === "") {
    return "";
  }

  return Number(numericValue).toLocaleString();
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const fullNameRegex = /^[A-Za-z\s.'-]{2,100}$/;
const phoneRegex = /^\+63\s9\d{2}\s\d{3}\s\d{4}$/;
const locationRegex = /^[A-Za-z\s,.-]{2,100}$/;

const EditProfileModal = ({
  open,

  onClose,

  profile,

  onSave,
}: EditProfileModalProps) => {
  type EditProfileFormData = {
    fullName: string;

    email: string;

    phone: string;

    location: string;

    monthlyIncome: string;

    savingsGoal: string;
  };

  const [formData, setFormData] = useState<EditProfileFormData>({
    ...profile,
    monthlyIncome:
      profile.monthlyIncome > 0 ? profile.monthlyIncome.toLocaleString() : "",

    savingsGoal:
      profile.savingsGoal > 0 ? profile.savingsGoal.toLocaleString() : "",
  });

  const [errors, setErrors] = useState({
    fullName: "",

    email: "",

    phone: "",

    location: "",

    monthlyIncome: "",

    savingsGoal: "",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        ...profile,
        monthlyIncome:
          profile.monthlyIncome > 0
            ? profile.monthlyIncome.toLocaleString()
            : "",

        savingsGoal:
          profile.savingsGoal > 0 ? profile.savingsGoal.toLocaleString() : "",
      });

      setErrors({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        monthlyIncome: "",
        savingsGoal: "",
      });
    }
  }, [open, profile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Currency fields
    if (name === "monthlyIncome" || name === "savingsGoal") {
      const numericValue = value.replace(/\D/g, "");

      setFormData((prev) => ({
        ...prev,
        [name]: formatCurrencyInput(numericValue),
      }));

      return;
    }

    // Phone field
    if (name === "phone") {
      const digits = value.replace(/\D/g, "");

      let formatted = "";

      if (digits.length > 0) {
        const localNumber = digits.startsWith("63")
          ? digits.slice(2)
          : digits.startsWith("0")
            ? digits.slice(1)
            : digits;

        const limited = localNumber.slice(0, 10);

        formatted = "+63 ";

        if (limited.length >= 1) {
          formatted += limited.slice(0, 3);
        }

        if (limited.length > 3) {
          formatted += " " + limited.slice(3, 6);
        }

        if (limited.length > 6) {
          formatted += " " + limited.slice(6, 10);
        }
      }

      setFormData((prev) => ({
        ...prev,
        phone: formatted,
      }));

      return;
    }

    // Location field
    if (name === "location") {
      setFormData((prev) => ({
        ...prev,
        location: value,
      }));

      return;
    }

    // Everything else
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      monthlyIncome: "",
      savingsGoal: "",
    };

    if (!fullNameRegex.test(formData.fullName.trim())) {
      newErrors.fullName =
        "Name must conatin only letters and be at least 2 characters.";
    }

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid mobile number.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (!locationRegex.test(formData.location.trim())) {
      newErrors.location = "Location should contain letters only.";
    }

    if (Number(formData.monthlyIncome) < 0) {
      newErrors.monthlyIncome = "Income cannot be negative";
    }

    if (Number(formData.savingsGoal) < 0) {
      newErrors.savingsGoal = "Savings goal cannot be negative";
    }

    setErrors(newErrors);

    if (
      newErrors.fullName ||
      newErrors.email ||
      newErrors.phone ||
      newErrors.location ||
      newErrors.monthlyIncome ||
      newErrors.savingsGoal
    ) {
      return;
    }

    onSave({
      ...formData,

      monthlyIncome:
        formData.monthlyIncome === ""
          ? 0
          : Number(formData.monthlyIncome.replace(/,/g, "")),

      savingsGoal:
        formData.savingsGoal === ""
          ? 0
          : Number(formData.savingsGoal.replace(/,/g, "")),
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="edit-profile-modal">
        <div className="edit-profile-header">
          <h2>Edit Profile</h2>

          <p>Update your personal information</p>
        </div>

        <div className="edit-profile-form">
          <div className="profile-input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              className={errors.fullName ? "error-input" : ""}
              onChange={(event) => {
                handleChange(event);

                setErrors((prev) => ({
                  ...prev,
                  fullName: "",
                }));
              }}
            />

            {errors.fullName && (
              <p className="profile-field-error">{errors.fullName}</p>
            )}
          </div>

          <div className="profile-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              className={errors.email ? "error-input" : ""}
              onChange={(event) => {
                handleChange(event);

                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              }}
            />

            {errors.email && (
              <p className="profile-field-error">{errors.email}</p>
            )}
          </div>

          <div className="profile-input-group">
            <label>Phone number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone"
              value={formData.phone}
              className={errors.phone ? "error-input" : ""}
              onChange={(event) => {
                handleChange(event);

                setErrors((prev) => ({
                  ...prev,
                  phone: "",
                }));
              }}
            />

            {errors.phone && (
              <p className="profile-field-error">{errors.phone}</p>
            )}
          </div>

          <div className="profile-input-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              className={errors.location ? "error-input" : ""}
              onChange={(event) => {
                handleChange(event);

                setErrors((prev) => ({
                  ...prev,
                  location: "",
                }));
              }}
            />

            {errors.location && (
              <p className="profile-field-error">{errors.location}</p>
            )}
          </div>

          <div className="profile-input-group">
            <label>Monthly Income</label>
            <input
              type="text"
              inputMode="numeric"
              name="monthlyIncome"
              placeholder="Enter your monthly income"
              value={formData.monthlyIncome}
              className={errors.monthlyIncome ? "error-input" : ""}
              onChange={(event) => {
                handleChange(event);

                setErrors((prev) => ({
                  ...prev,
                  monthlyIncome: "",
                }));
              }}
            />

            {errors.monthlyIncome && (
              <p className="profile-field-error">{errors.monthlyIncome}</p>
            )}
          </div>

          <div className="profile-input-group">
            {" "}
            <label>Savings Goal</label>
            <input
              type="text"
              inputMode="numeric"
              name="savingsGoal"
              placeholder="Enter your savings goal"
              value={formData.savingsGoal}
              className={errors.savingsGoal ? "error-input" : ""}
              onChange={(event) => {
                handleChange(event);

                setErrors((prev) => ({
                  ...prev,
                  savingsGoal: "",
                }));
              }}
            />
            {errors.savingsGoal && (
              <p className="profile-field-error">{errors.savingsGoal}</p>
            )}
          </div>
        </div>

        <div className="edit-profile-actions">
          <button onClick={onClose}>Cancel</button>

          <button onClick={handleSave}>Save</button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
