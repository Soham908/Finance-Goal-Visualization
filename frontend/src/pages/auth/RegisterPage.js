import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CheckboxStyled, TextFieldStyle } from "../../constants/Constants";
import SlideSnackbar from "../../components/SlideSnackbar";
import { userRegisterAction } from "../../actions/authAction";
import { userRegisterWithBankAPI } from "../../actions/userBankAuthAction";
import { useUserDataStore } from "../../store/store";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Please fill all fields !"
  );
  const [checked, setChecked] = useState(false)

  const setStoreUserData = useUserDataStore(state => state.setStoreUserData)

  const register = async (bankVerified) => {
    const data = {
      username,
      password,
      bankVerified
    };
    const registerHandle = await userRegisterAction(data);
    if (registerHandle.success) {
      localStorage.setItem("userCredentialGoal", registerHandle.register.username);
      setStoreUserData(registerHandle.register)
      navigate("/");
    }
  }
  // first check if the checkbox was checked, then if the user does exist in the bank db then with
  // the same credentials make a user in this db, the username and password should be the same for this to work
  const handleSubmit = async () => {
    if(checked){
      const data = {
        username,
        password,
      };
      const registerWithBank = await userRegisterWithBankAPI(data)
      console.log(registerWithBank);
      if(registerWithBank.success){
        register(true)
      }else setSnackbarOpen(true); setSnackbarMessage("Use the same login details as Bank App")
    }
    else{
      if (username && password) {
        register(false)
      } else {
        setSnackbarOpen(true)
      }
    }
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  const handleCloseSnackbar = (event, reason) => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          backgroundColor: 'black',
          height: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...TextFieldStyle,
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          sx={{
            marginBottom: 2,
            width: "100%",
            borderRadius: 20,
            ...TextFieldStyle,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Register
        </Button>
        <Typography variant="h6" sx={{ margin: "5%" }}>
          Have an account on our Banking App ?
          <Checkbox 
            onChange={(event) => setChecked(event.target.checked)}
            checked={checked}
            sx={ CheckboxStyled }
          />
        </Typography>
        <Typography variant="h6" >
          Already have an account ? <Link onClick={handleRedirect}>Login</Link>
        </Typography>
      </Box>

      <SlideSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default RegisterPage;
