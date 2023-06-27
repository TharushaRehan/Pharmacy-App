import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

export const StyledButton = styled(Button)({
  background: "linear-gradient(60deg, #D4ADFC 40%, #AD7BE9 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px #AD7BE9",
  color: "#030508",
  fontSize: "18px",
  height: 48,
  padding: "0 10px",
  textTransform: "capitalize",
  "&:hover": {
    background: "linear-gradient(60deg, #E5D1FA 40%, #D4ADFC 90%)",
  },
});
export const NavButton = styled(Button)({
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

export const DeleteButton = styled(Button)({
  background: "#F0F0F0",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 1px 1px 2px #B70404",
  color: "#B70404",
  fontSize: "15px",
  padding: "0 15px",
  textTransform: "capitalize",
});

export const UpdateButton = styled(Button)({
  background: "linear-gradient(60deg, #D4ADFC 40%, #A1C2F1 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 1px 1px 2px #AD7BE9",
  color: "#030508",
  fontSize: "15px",
  padding: "0 15px",
  textTransform: "capitalize",
  "&:hover": {
    background: "linear-gradient(60deg, #E5D1FA 40%, #D4ADFC 90%)",
  },
});
export const DoneButton = styled(Button)({
  background: "#C7E8CA",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 1px 1px 2px #539165",
  padding: "0 15px",
  color: "#17594A",
  fontSize: "15px",
  textTransform: "capitalize",
  "&:hover": {
    background: "linear-gradient(60deg, #DFFFD8 40%, #C7E8CA 90%)",
  },
});

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #ffffff;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #a116e6;
  }
  .MuiInputLabel-root.Mui-focused {
    color: #a116e6;
  }
`;
export const SmallTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #ffffff;
    height: 40px;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #a116e6;
  }
  .MuiInputLabel-root.Mui-focused {
    color: #a116e6;
  }
`;
