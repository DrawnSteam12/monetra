import "../../../../assets/css/features/settings/delete-confirmation-input.css";

type DeleteConfirmationInputProps = {
  value: string;

  onChange: (value: string) => void;
};

const DeleteConfirmationInput = ({
  value,
  onChange,
}: DeleteConfirmationInputProps) => {
  return (
    <div className="delete-confirmation-input">
      <label htmlFor="delete-confirmation">
        type <strong>DELETE</strong> to continue
      </label>

      <input
        type="text"
        id="delete-confirmation"
        value={value}
        placeholder="DELETE"
        onChange={(event) => {
          const input = event.target.value.toUpperCase();
          const target = "DELETE";

          if (target.startsWith(input)) {
            onChange(input);
          }
        }}
      />
    </div>
  );
};

export default DeleteConfirmationInput;
