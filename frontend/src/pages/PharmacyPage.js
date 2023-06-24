import { styled } from "@mui/material/styles";
import axios from "axios";
import { List, ListItem, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Inventory, AddBox, Person, Delete, Done } from "@mui/icons-material";
import {
  StyledTextField,
  StyledButton,
  SmallTextField,
} from "../MaterialUIComponents";
import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";

const StyledButton1 = styled(Button)({
  background: "linear-gradient(60deg, #D4ADFC 40%, #AD7BE9 90%)",
  borderRadius: 2,
  boxShadow: "0 3px 5px 2px #AD7BE9",
  color: "#030508",
  fontSize: "18px",
  height: 40,
  width: 300,
  padding: "0 30px",
  textTransform: "capitalize",
  "&:hover": {
    background: "linear-gradient(60deg, #E5D1FA 40%, #D4ADFC 90%)",
  },
});

const StyledDatePicker = styled(DatePicker)`
  .MuiInputBase-root {
    background-color: #ffffff;
    border-color: #a116e6;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #a116e6;
  }
  .MuiInputLabel-root.Mui-focused {
    color: #a116e6;
  }
`;

const PhamacyPage = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [currDate, setCurrDate] = useState("");
  const [address, setAddress] = useState(null);
  const [pName, setPName] = useState(null);
  const [pDistrict, setPDistrict] = useState(null);
  const [pharmacist, setPharmacist] = useState(null);
  const [contact, setContact] = useState(null);
  const [type, setType] = useState(null);
  const [medName, setMedName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [exDate, setExDate] = useState("");
  const [update, setUpdate] = useState(false);
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadPharmacyDetails = async () => {
      if (user) {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        try {
          const response = await axios.get("/api/pharmacy/details", {
            headers: headers,
          });
          const data = response.data;
          setPName(data.pharmacyName);
          setAddress(data.pharmacyAddress);
          setPDistrict(data.pharmacyDistrict);
          setType(data.pharmacyType);
          setContact(data.contactNumber);
          setPharmacist(data.pharmacist);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No user");
      }
    };
    if (!isLoading) {
      loadPharmacyDetails();
    }
  }, [user, isLoading]);
  // get the current date
  useEffect(() => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const getCurrentDate = () => {
      const date = new Date();
      const formattedDate = formatDate(date);
      setCurrDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddInventory = async (e) => {
    e.preventDefault();
    if (exDate === "") {
      alert("ss");
    }
  };

  const handleDelete = async () => {};
  const handleUpdateDetails = async () => {};
  const renderTab = () => {
    if (activeTab === "view") {
      //fetchData();
      return (
        <div className="inventory-container">
          <p id="inventory">Inventory</p>
          <div className="table">
            {/* {inventory.length === 0 ? (
              <p style={{ marginLeft: "-11%", fontSize: "20px" }}>
                Data not found. Add medicines to see the details.
              </p>
            ) : (
              <table border={1}>
                <thead>
                  <tr>
                    <th>Date Added</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Supplier</th>
                    <th>Price of a Unit</th>
                    <th>Expire Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.dateAdded}</td>
                      <td>{item.id}</td>
                      <td>{item.quantity}</td>
                      <td>{item.supplier}</td>
                      <td>Rs. {item.priceOfUnit}</td>
                      <td>{item.expireDate}</td>
                      <td>
                        <button
                          id="item-dlt-btn"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )} */}
          </div>
        </div>
      );
    } else if (activeTab === "add") {
      return (
        <div className="add-container">
          <h3
            style={{ textAlign: "center", marginTop: "-10%", fontSize: "20px" }}
          >
            Add to Inventory
          </h3>
          <form>
            <div className="add-form-row">
              <StyledTextField
                required
                label="Medicine Name"
                value={medName}
                className="textfield"
                type="text"
                onChange={(e) => setMedName(e.target.value)}
              />
            </div>
            <br />
            <div className="add-form-row">
              <StyledTextField
                required
                label="Quantity"
                value={quantity}
                className="textfield"
                type="text"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <br />
            <div className="add-form-row">
              <StyledTextField
                required
                label="Supplier"
                value={supplier}
                className="textfield"
                type="text"
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div>
            <br />
            <div className="add-form-row">
              <StyledTextField
                required
                label="Price of a Unit"
                value={price}
                className="textfield"
                type="text"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <br />
            <div className="add-form-row">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <StyledDatePicker
                    label="Expire Date"
                    value={exDate}
                    onChange={(e) => setExDate(e)}
                    disablePast
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <br />
            <div className="add-form-row">
              <StyledButton onClick={handleAddInventory}>
                Add To Inventory
              </StyledButton>
            </div>
          </form>
        </div>
      );
    } else if (activeTab === "profile") {
      return (
        <div className="profile-container">
          <p id="profile">Profile Details</p>
          <div className="data-container">
            <p>Pharmacy Name</p>
            <div className="name">
              <SmallTextField value={pName} className="textfield" />
            </div>
          </div>
          <div className="data-container">
            <p>Pharmacy Address</p>
            <div className="address">
              <SmallTextField value={address} className="textfield" />
            </div>
          </div>
          <div className="data-container">
            <p>District</p>
            <div className="district">
              <SmallTextField value={pDistrict} className="textfield" />
            </div>
          </div>
          <div className="data-container">
            <p>Pharmacist</p>
            <div className="pharmacist1">
              <SmallTextField value={pharmacist} className="textfield" />
            </div>
          </div>
          <div className="data-container">
            <p>Contact Number</p>
            <div className="contact">
              <SmallTextField value={contact} className="textfield" />
            </div>
          </div>
          <div className="data-container">
            <p>Pharmacy Type</p>
            <div className="type">
              <SmallTextField value={type} className="textfield" />
            </div>
          </div>
          <div className="profile-btn">
            <StyledButton
              type="submit"
              startIcon={<Delete />}
              onClick={handleDelete}
            >
              Delete Account
            </StyledButton>
            <StyledButton onClick={setUpdate(true)} type="submit">
              Update Details
            </StyledButton>
            <StyledButton
              onClick={handleUpdateDetails}
              startIcon={<Done />}
              disabled={update === false}
            >
              Done
            </StyledButton>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="pharmacy-dashbord">
      <h1 style={{ textAlign: "center" }}>Store : </h1>
      <div className="navigation">
        <List>
          <ListItem>
            <StyledButton1
              size="small"
              variant="contained"
              startIcon={<Inventory />}
              onClick={() => handleTabChange("inventory")}
            >
              Inventory
            </StyledButton1>
          </ListItem>
          <ListItem>
            <StyledButton1
              size="small"
              variant="contained"
              startIcon={<AddBox />}
              onClick={() => handleTabChange("add")}
            >
              Add Medicines
            </StyledButton1>
          </ListItem>
          <ListItem>
            <StyledButton1
              size="small"
              variant="contained"
              startIcon={<Person />}
              onClick={() => handleTabChange("profile")}
            >
              Profile
            </StyledButton1>
          </ListItem>
        </List>
      </div>
      {renderTab()}
    </div>
  );
};

export default PhamacyPage;
