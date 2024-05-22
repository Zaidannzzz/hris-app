import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import { useSelector } from "react-redux";
import { RootState } from "../setup/redux/store";

const PrivateRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.Auth.isAuth);
  
  return (
    <Routes>
      {isAuth ? (
        <Route path="/" element={<Home />} />
      ) : (
        // Redirect to authentication if not authenticated
        <Route path="*" element={<Navigate to="/auth" />} />
      )}
    </Routes>
  );
};

export { PrivateRoutes };
