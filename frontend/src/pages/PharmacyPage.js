import { styled } from "@mui/material/styles";
import axios from "axios";
import { List, ListItem } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import {
  Inventory,
  AddBox,
  Person,
  Delete,
  Done,
  Edit,
} from "@mui/icons-material";

import {
  StyledTextField,
  SmallTextField,
  StyledButton,
  DeleteButton,
  NavButton,
  DoneButton,
  UpdateButton,
} from "../MaterialUIComponents";
import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MedUpdateForm from "../components/MedUpdate";
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

const StyledTableContainer = styled(TableContainer)`
  background-color: #ecf2ff;
  color: #000000;
`;

const StyledTableRow = styled(TableRow)`
  background-color: #ecf2ff;
  & > * {
    border-right: 1px solid #000000; // Black column lines
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
    border-left: 1px solid #000000;
  }
  &:last-child > * {
    border-bottom: 1px solid #000000; // Black bottom border
  }
`;

const PhamacyPage = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [addedDate, setCurrDate] = useState("");
  const [address, setAddress] = useState("");
  const [pName, setPName] = useState("");
  const [pDistrict, setPDistrict] = useState("");
  const [pharmacist, setPharmacist] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [medName, setMedName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [exDate, setExDate] = useState("");
  const [update, setUpdate] = useState(false);
  const [medAdded, setMedAdded] = useState(false);
  const [medList, setMedList] = useState([]);
  const [addMsg, setAddMsg] = useState("");
  const [updateMsg, setUpdateMsg] = useState("");
  const { user, isLoading } = useUser();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
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
          setMedList(data.medicines);

          setMedAdded(false);
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
  }, [user, isLoading, medAdded]);
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
  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    // Remove non-digit characters from the input
    const filteredInput = input.replace(/\D/g, "");
    // Limit the input to 10 digits
    const phoneNumber = filteredInput.slice(0, 10);
    setContact(phoneNumber);
  };
  const handleQuantityChange = (event) => {
    const input = event.target.value;
    // Remove non-digit characters from the input
    const filteredInput = input.replace(/\D/g, "");
    // Limit the input to 10 digits
    const quantity = filteredInput.slice(0, 10);
    setQuantity(quantity);
  };
  const handlePriceChange = (event) => {
    const input = event.target.value;
    // Remove non-digit characters from the input
    const filteredInput = input.replace(/\D/g, "");
    // Limit the input to 10 digits
    const price = filteredInput.slice(0, 10);
    setPrice(price);
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };
  const handleUpdateBtn = () => {
    setUpdate(true);
  };
  const handleAddInventory = async (e) => {
    e.preventDefault();
    setAddMsg("");

    if (
      exDate === "" ||
      medName === "" ||
      quantity === "" ||
      supplier === "" ||
      price === ""
    ) {
      setAddMsg("Fill all the details");
    } else {
      const expireDate = handleDateChange(exDate);

      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      try {
        const response = await axios.post(
          "/api/pharmacy/addmedicines",
          {
            medName,
            quantity,
            supplier,
            price,
            expireDate,
            addedDate,
          },
          { headers: headers }
        );
        const data = response.data;
        console.log(data);
        setMedAdded(true);
        setAddMsg(data);
        setMedName("");
        setQuantity("");
        setSupplier("");
        setPrice("");
        setExDate("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleEditMed = async (key) => {
    setSelectedMedicine(key);
    //console.log(key);
  };
  const handleAlertDialogClose = () => {
    setSelectedMedicine(null);
  };
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    alert("Not Completed");
  };
  const handleUpdateDetails = async () => {
    setUpdateMsg("");
    if (
      pName === "" ||
      address === "" ||
      pDistrict === "" ||
      type === "" ||
      contact === "" ||
      contact.length !== 10 ||
      pharmacist === ""
    ) {
      setUpdateMsg("Fill all the details");
    } else {
      try {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(
          "/api/pharmacy/updatedetails",
          {
            pName,
            address,
            pDistrict,
            type,
            contact,
            pharmacist,
          },
          { headers: headers }
        );
        const data = response.data;
        if (data === "Updated") {
          setUpdateMsg("Successfully Updated.");
          setUpdate(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const renderTab = () => {
    if (activeTab === "inventory") {
      return (
        <div className="inventory-container">
          <h3
            style={{ textAlign: "center", marginTop: "-10%", fontSize: "20px" }}
          >
            Inventory
          </h3>
          <div className="table">
            {medList.length === 0 ? (
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                Data not found. Add medicines to see the details.
              </p>
            ) : (
              <>
                <StyledTableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <StyledTableRow>
                        <TableCell>Date Added</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Supplier</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Expire Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </StyledTableRow>
                    </TableHead>

                    <TableBody>
                      {medList.map((item) => (
                        <StyledTableRow key={item._id}>
                          <TableCell>{item.addedDate}</TableCell>
                          <TableCell>{item.medName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.supplier}</TableCell>
                          <TableCell>Rs. {item.price}</TableCell>
                          <TableCell>{item.expireDate}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleEditMed(item._id)}>
                              <Edit />
                            </IconButton>
                            <IconButton>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
                {selectedMedicine && (
                  <MedUpdateForm
                    open={true}
                    medID={selectedMedicine}
                    onClose={handleAlertDialogClose}
                    //onConfirm={handleStockUpdateConfirm}
                    medicine={selectedMedicine}
                  />
                )}
              </>
            )}
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
                onChange={handleQuantityChange}
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
                onChange={handlePriceChange}
              />
            </div>
            <br />
            <div className="add-form-row">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <StyledDatePicker
                    label="Expire Date"
                    value={exDate}
                    format="YYYY-MM-DD"
                    onChange={(e) => setExDate(e)}
                    disablePast
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <p style={{ textAlign: "center", color: "red" }}>
              {addMsg ? addMsg : ""}
            </p>
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
          <h3
            style={{ textAlign: "center", marginTop: "-10%", fontSize: "20px" }}
          >
            Profile Details
          </h3>
          <div className="data-container">
            <p>Pharmacy Name</p>
            <div className="name">
              <SmallTextField
                value={pName}
                className="textfield"
                disabled={!update}
                onChange={(e) => setPName(e.target.value)}
              />
            </div>
          </div>
          <div className="data-container">
            <p>Pharmacy Address</p>
            <div className="address">
              <SmallTextField
                value={address}
                className="textfield"
                disabled={!update}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="data-container">
            <p>District</p>
            <div className="district">
              <SmallTextField
                value={pDistrict}
                className="textfield"
                disabled={!update}
                onChange={(e) => setPDistrict(e.target.value)}
              />
            </div>
          </div>
          <div className="data-container">
            <p>Pharmacist</p>
            <div className="pharmacist1">
              <SmallTextField
                value={pharmacist}
                className="textfield"
                disabled={!update}
                onChange={(e) => setPharmacist(e.target.value)}
              />
            </div>
          </div>
          <div className="data-container">
            <p>Contact Number</p>
            <div className="contact">
              <SmallTextField
                value={contact}
                className="textfield"
                disabled={!update}
                onChange={handlePhoneNumberChange}
              />
            </div>
          </div>
          <div className="data-container">
            <p>Pharmacy Type</p>
            <div className="type">
              <SmallTextField
                value={type}
                className="textfield"
                disabled={!update}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          </div>
          <p
            style={{
              textAlign: "center",
              color: "red",
              marginBottom: "-20px",
            }}
          >
            {updateMsg ? updateMsg : ""}
          </p>
          <div className="profile-btn">
            <DeleteButton
              type="submit"
              startIcon={<Delete />}
              onClick={handleDeleteUser}
            >
              Delete Account
            </DeleteButton>
            <UpdateButton
              type="submit"
              onClick={handleUpdateBtn}
              startIcon={<Edit />}
            >
              Update Details
            </UpdateButton>
            <DoneButton
              onClick={handleUpdateDetails}
              startIcon={<Done />}
              disabled={!update}
            >
              Done
            </DoneButton>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="pharmacy-dashbord">
      <h1 style={{ textAlign: "center" }}>Store : {pName}</h1>
      <div className="navigation">
        <List>
          <ListItem>
            <NavButton
              size="small"
              variant="contained"
              startIcon={<Inventory />}
              onClick={() => handleTabChange("inventory")}
            >
              Inventory
            </NavButton>
          </ListItem>
          <ListItem>
            <NavButton
              size="small"
              variant="contained"
              startIcon={<AddBox />}
              onClick={() => handleTabChange("add")}
            >
              Add Medicines
            </NavButton>
          </ListItem>
          <ListItem>
            <NavButton
              size="small"
              variant="contained"
              startIcon={<Person />}
              onClick={() => handleTabChange("profile")}
            >
              Profile
            </NavButton>
          </ListItem>
        </List>
      </div>
      {renderTab()}
    </div>
  );
};

export default PhamacyPage;
