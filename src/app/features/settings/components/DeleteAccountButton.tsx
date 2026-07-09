import "../../../../assets/css/features/settings/delete-account-button.css";

type DeleteAccountButtonProps = {
  disabled: boolean;

  onClick: () => void;
};

const DeleteAccountButton = ({
  disabled,
  onClick,
}: DeleteAccountButtonProps) => {
  return (
    <button
      type="button"
      className="delete-account-button"
      disabled={disabled}
      onClick={onClick}
    >
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
