import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { Navbar } from "./components/navbar";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <div className="app-container">
      <div className="h-100 w-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
