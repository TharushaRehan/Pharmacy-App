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
  const { user } = useUser();
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async () => {
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
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MedUpdateForm;
