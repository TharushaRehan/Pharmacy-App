import { useState } from "react";
import { StyledButton, StyledTextField } from "../MaterialUIComponents";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";
import useUser from "../hooks/useUser";
const GetDetailsPage = () => {
  const [pharmacyName, setPName] = useState("");
  const [pharmacyAddress, setPAddress] = useState("");
  const [pharmacyDistrict, setPDistrict] = useState("");
  const [pharmacist, setPharmacist] = useState("");
  const [pharmacyType, setType] = useState("");
  const [contactNumber, setContact] = useState("");
  const [error, setError] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const handleDistrict = (event) => {
    setPDistrict(event.target.value);
  };
  const handleType = (event) => {
    setType(event.target.value);
  };

  const HandleCreateAcc = async (e) => {
    e.preventDefault();
    setError("");
    if (pharmacyType === "") {
      setError("Please select a type.");
      return;
    } else {
      addToDatabase();
    }
  };
  const addToDatabase = async () => {
    try {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.post(
        "/api/pharmacy/create",
        {
          pharmacyName,
          pharmacyAddress,
          pharmacyDistrict,
          pharmacyType,
          contactNumber,
          pharmacist,
        },
        { headers: headers }
      );
      const data = response.data;
      console.log(data);
      if (data === "Successfull") {
        navigate("/pharmacy");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="create-acc-form">
      <form onSubmit={HandleCreateAcc}>
        <p style={{ fontSize: "30px", textAlign: "center" }}>Create Account</p>
        <div className="form-container">
          <div className="form-column">
            <div className="pharmacy-name">
              <StyledTextField
                required
                type="text"
                className="textfield"
                label="Pharmacy Name"
                value={pharmacyName}
                onChange={(e) => setPName(e.target.value)}
              />
            </div>
            <div className="pharmacy-address">
              <StyledTextField
                required
                multiline
                rows={3}
                type="text"
                className="textfield"
                label="Pharmacy Address"
                value={pharmacyAddress}
                onChange={(e) => setPAddress(e.target.value)}
              />
            </div>
            <div className="pharmacy-district">
              <StyledTextField
                required
                type="text"
                className="textfield"
                label="District"
                value={pharmacyDistrict}
                onChange={handleDistrict}
              />
            </div>
            <div className="pharmacist">
              <StyledTextField
                required
                type="text"
                className="textfield"
                label="Pharmacist"
                value={pharmacist}
                onChange={(e) => setPharmacist(e.target.value)}
              />
            </div>
            <div className="pharmacy-contact">
              <StyledTextField
                required
                type="number"
                className="textfield"
                label="Contact Number"
                value={contactNumber}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="pharmacy-type">
              <FormLabel>Pharmacy Type</FormLabel>
              <div className="radio-btn">
                <RadioGroup
                  row
                  name="type"
                  value={pharmacyType}
                  onChange={handleType}
                >
                  <FormControlLabel
                    value="retail"
                    control={<Radio />}
                    label="Retail"
                  />
                  <FormControlLabel
                    value="wholesale"
                    control={<Radio />}
                    label="Wholesale"
                  />
                </RadioGroup>
              </div>
            </div>
            <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
              <StyledButton size="large" type="submit" variant="contained">
                Finish
              </StyledButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetDetailsPage;
