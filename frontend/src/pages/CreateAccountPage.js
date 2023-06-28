import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton, StyledTextField } from "../MaterialUIComponents";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Img from "../images/12085707_20944201.jpg";
const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* run the function when user click on create account button
  first check if the given passwords are matching, if yes check password has atleast 6 characters,
  then create a user with the given email and password and navigate to article page */
  const HandleCreateAcc = async (e) => {
    e.preventDefault();
    setError("");
    if (password === confirmPassword) {
      if (password.length <= 5) {
        setError("Password must have atleast 6 characters.");
        setPassword("");
        setConfirmPassword("");
      } else {
        try {
          await createUserWithEmailAndPassword(getAuth(), email, password);
          navigate("/getdetails");
        } catch (e) {
          if (e.message === "Firebase: Error (auth/email-already-in-use).") {
            setError("Already have an account");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }
        }
      }
    } else {
      setError("Password do not match.");
      setPassword("");
      setConfirmPassword("");
      return;
    }
  };
  return (
    <div className="create-page">
      <div className="create-acc-form">
        <img
          src={Img}
          style={{ height: "500px", borderRadius: "25px", marginTop: "20px" }}
          alt="HomeImage"
        />
        <form onSubmit={HandleCreateAcc}>
          <p style={{ fontSize: "30px", textAlign: "center" }}>
            Create Account
          </p>
          <div className="form-container">
            <div className="form-column">
              <div className="pharmacy-email">
                <StyledTextField
                  required
                  type="email"
                  className="textfield"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="pharmacy-password">
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
              <div className="pharmacy-conf-password">
                <StyledTextField
                  required
                  type="password"
                  className="textfield"
                  label="Confirm Password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <br />
          {error && <p style={{ paddingTop: "20px", color: "red" }}>{error}</p>}
          <div className="pharmacy-signup-btn">
            <StyledButton size="large" type="submit" variant="contained">
              Create Account
            </StyledButton>
          </div>
          <Link to="/">
            <p style={{ textDecoration: "none", color: "black" }}>
              Already have an account ? Log In here.
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
