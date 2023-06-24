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
