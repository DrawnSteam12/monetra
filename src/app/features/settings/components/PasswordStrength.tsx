type PasswordStrengthProps = {
  strength: "Weak" | "Medium" | "Strong";
};

const PasswordStrength = ({ strength }: PasswordStrengthProps) => {
  return (
    <div className="password-strength">
      <div className="password-strength-header">
        <span>Password Strength</span>
        <span>{strength}</span>
      </div>

      <div className="password-strength-bar">
        <div className={`password-strength-fill ${strength.toLowerCase()}`} />
      </div>
    </div>
  );
};

export default PasswordStrength;
