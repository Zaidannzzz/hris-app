import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import { useSelector } from "react-redux";
import { RootState } from "../setup/redux/store";
import Profile from "../pages/profile/profile";

const PrivateRoutes = () => {
  const isAuth = useSelector((state: RootState) => state.Auth.isAuth);
  const lcIsAuth = localStorage.getItem('IsAuth');

  return (
    <Routes>
      {isAuth === true || lcIsAuth === "true" ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </>
      ) : (
        // Redirect to authentication if not authenticated
        <Route path="*" element={<Navigate to="/auth" />} />
      )}
    </Routes>
  );
};

export { PrivateRoutes };
