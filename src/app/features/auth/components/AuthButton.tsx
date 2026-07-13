type AuthButtonProps = {
  text: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const AuthButton = ({
  text,
  type = "button",
  disabled = false,
}: AuthButtonProps) => {
  return (
    <button className="login-button" type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default AuthButton;
