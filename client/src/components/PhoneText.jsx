import { useAuth } from "../context/AuthContext";
import { maskNumber } from "../utils/mask";

const PhoneText = ({ value }) => {
  const { isAdminLoggedIn } = useAuth();
  return (
    <span className={isAdminLoggedIn ? "text-success fw-semibold" : "text-muted"}>
      {isAdminLoggedIn ? value : `${maskNumber(value)} (Login as admin to view)`}
    </span>
  );
};

export default PhoneText;
