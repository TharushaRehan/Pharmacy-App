import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import PhamacyPage from "./pages/PharmacyPage";
import GetDetailsPage from "./pages/GetDetailsPage";
function App() {
  return (
    <BrowserRouter>
      <div className="page-body">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/createaccount" element={<CreateAccountPage />}></Route>
          <Route path="/getdetails" element={<GetDetailsPage />}></Route>
          <Route path="/pharmacy" element={<PhamacyPage />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
