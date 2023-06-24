import { useState, useEffect } from "react";
import { StyledButton, StyledTextField } from "../MaterialUIComponents";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LogInIcon from "@mui/icons-material/Login";
import CircularProgress from "@mui/material/CircularProgress";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const HandlePharmacyLogIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/pharmacy");
      alert("Success");
    } catch (e) {
      setError("Inavild Email or Password");
    }
  };
  return (
    <div>
      <div className="login-form">
        <form onSubmit={HandlePharmacyLogIn}>
          <p style={{ fontSize: "30px", textAlign: "center" }}>Log In</p>
          <div className="email-textfield">
            <StyledTextField
              required
              type="email"
              className="textfield"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-textfield">
            <StyledTextField
              required
              type="password"
              className="textfield"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <StyledButton
            id="login-btn"
            size="large"
            type="submit"
            endIcon={<LogInIcon />}
            variant="contained"
          >
            Log In
          </StyledButton>
          {/* <CircularProgress color="secondary" /> */}
        </form>
        <br />
        <p id="checkAcc">Don't have an account ?</p>
        <br />
        <Link to="/createaccount">
          <StyledButton id="signup-btn" size="large" variant="contained">
            Sign Up
          </StyledButton>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
