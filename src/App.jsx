import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Planboard from "./components/Planboard/Planboard";
import SignUpModal from "./components/Auth/SignUpForm";
import SignInModal from "./components/Auth/SignInForm";
import UserContext from "../src/components/context/user";

function App() {
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  return (
    <>
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        <BrowserRouter>
          {showSigninModal && (
            <SignInModal setShowSigninModal={setShowSigninModal} />
          )}
          {showSignupModal && (
            <SignUpModal setShowSignupModal={setShowSignupModal} />
          )}
          <NavBar
            loginFn={() => setShowSigninModal(true)}
            signupFn={() => setShowSignupModal(true)}
            setAccessToken={setAccessToken}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {accessToken.length > 0 && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/planboard" element={<Planboard />} />{" "}
              </>
            )}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
