import "./error-state.css";

import { MdErrorOutline } from "react-icons/md";

type ErrorStateProps = {
  title: string;

  description: string;

  action?: React.ReactNode;
};

const ErrorState = ({ title, description, action }: ErrorStateProps) => {
  return (
    <div className="error-state">
      <div className="error-state-icon">
        <MdErrorOutline />
      </div>
      <h3>{title}</h3>

      <p>{description}</p>

      {action && <div className="error-state-action">{action}</div>}
    </div>
  );
};

export default ErrorState;
