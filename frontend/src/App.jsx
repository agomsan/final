import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Gallery from "./pages/Gallery/Gallery";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import About from "./pages/About/About";
import Appointments from "./pages/Appointments/Appointments";
import Contact from "./pages/Contact/Contact";
import Services from "./pages/Services/Services";
import Doctors from "./pages/Doctors/Doctors";
import UserProfile from "./pages/UserProfile/userProfile";  
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="User Profile" element={<UserProfile />} />
      <Route path="Gallery" element={<Gallery />} />
      <Route path="Register" element={<Register />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="Admin" element={<Admin />} />
      <Route path="Register" element={<Register />} />
      <Route path="Appointments" element={<Appointments />} />
      <Route path="About" element={<About />} />
      <Route path="Contact" element={<Contact />} />
      <Route path="Services" element={<Services />} />
      <Route path="Doctors" element={<Doctors />} />
    </Routes>
  );
}

export default App;