type AuthButtonProps = {
  text: string;
  type?: "button" | "submit";
};

const AuthButton = ({ text, type = "button" }: AuthButtonProps) => {
  return (
    <button className="login-button" type={type}>
      {text}
    </button>
  );
};

export default AuthButton;
