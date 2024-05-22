import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Registration from "../pages/auth/registration";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
};

export { AuthRoutes };
