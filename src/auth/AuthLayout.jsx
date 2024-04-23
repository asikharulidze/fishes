import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";

const AuthLayout = () => {
  const navigate = useNavigate();
  return (
    <Modal onClose={() => navigate(-1)}>
      <Outlet />
    </Modal>
  );
};

export default AuthLayout;
