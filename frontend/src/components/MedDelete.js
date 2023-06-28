import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import useUser from "../hooks/useUser";
const MedDeleteForm = ({ open, onClose, medID }) => {
  const [msg, setMsg] = useState("");
  const { user } = useUser();
  const handleClose = () => {
    onClose();
    setMsg("");
  };

  const handleConfirm = async () => {
    setMsg("");
    try {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.delete(
        `/api/pharmacy/deletemedicine/${medID}`,
        { headers: headers }
      );
      const data = response.data;
      console.log(data);
      setMsg(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure, you want to delete this medicine?</DialogTitle>
      <br />

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

export default MedDeleteForm;
