import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { Provider } from "react-redux";
import store from "../setup/redux/store";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </Provider>
    </Router>
  );
};

export { AppRoutes };
