import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import useUser from "../hooks/useUser";
const MedUpdateForm = ({ open, onClose, medID }) => {
  const [price, setPrice] = useState("");
  const [quantity, setStock] = useState("");
  const [msg, setMsg] = useState("");
  const { user } = useUser();
  const handleClose = () => {
    onClose();
    setMsg("");
  };

  const handleConfirm = async () => {
    setMsg("");
    if (price !== "" && quantity !== "") {
      try {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(
          `/api/pharmacy/updatemedicine/${medID}`,
          {
            quantity,
            price,
          },
          { headers: headers }
        );
        const data = response.data;
        console.log(data);
        setMsg(data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handlePriceChange = (event) => {
    const input = event.target.value;
    // Remove non-digit characters from the input
    const filteredInput = input.replace(/\D/g, "");
    // Limit the input to 10 digits
    const price = filteredInput.slice(0, 10);
    setPrice(price);
  };
  const handleStockChange = (event) => {
    const input = event.target.value;
    // Remove non-digit characters from the input
    const filteredInput = input.replace(/\D/g, "");
    // Limit the input to 10 digits
    const quantity = filteredInput.slice(0, 10);
    setStock(quantity);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update the stock and price</DialogTitle>
      <br />
      <DialogContent>
        <TextField
          label="New Price"
          type="text"
          variant="outlined"
          value={price}
          onChange={handlePriceChange}
        />
        <br />
        <br />
        <TextField
          label="New Stock"
          type="text"
          variant="outlined"
          value={quantity}
          onChange={handleStockChange}
        />
      </DialogContent>
      <p style={{ textAlign: "center", color: "red" }}>{msg ? msg : ""}</p>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleConfirm} color="secondary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MedUpdateForm;
