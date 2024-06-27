import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Grid,
  FormHelperText,
  Typography,
  Checkbox,
} from "@mui/material";
import { createGoalAction, updateGoalAction } from "../actions/goalActions";
import DecimalValidatedNumberInput from "./TagValidatedTextField";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckboxStyled, FormControlStyle, TextFieldSelectStyle, TextFieldStyle } from "../constants/Constants";
import SlideSnackbar from "./SlideSnackbar";
import { useUserDataStore } from "../store/store";

const priorities = ["Low", "Medium", "High"];
const tags = [
  "savings",
  "investment",
  "vacation",
  "car",
  "house",
  "education",
  "other",
];

const GoalForm = () => {
  const [goal, setGoal] = useState({
    goalName: "",
    goalDescription: "",
    targetAmount: "",
    currentAmount: "",
    goalTags: [],
    goalPriority: "",
  });
  const [oldGoalName, setOldGoalName] = useState("");
  const location = useLocation();
  const [oldReserveAmount, setOldReserveAmount] = useState(0)
  useEffect(() => {
    if (location.state) {
      location.state && setGoal(location.state.goalData);
      setOldReserveAmount(location?.state?.goalData?.currentAmount)
      setChecked(
        location.state.goalData.bankVerification === "verified" && true
      );
      console.log(location.state);
      setOldGoalName(location.state.goalData.goalName);
    }
  }, []);

  const [selectOpen, setSelectOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const username = useUserDataStore(state => state.userData.username)
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false)

  const onSubmit = async () => {
    setDisableButton(true)
    if (parseFloat(goal.targetAmount) <= parseFloat(goal.currentAmount)) {
      setSnackbarOpen(true);
      setSnackbarMessage(
        "Current amount cannot be greater than equal to the target amount"
      );
      setDisableButton(false)
      return;
    }else if ( parseFloat(goal.currentAmount) < parseFloat(oldReserveAmount) ){
      setSnackbarOpen(true);
      setSnackbarMessage(
        "Current amount cannot be less than previously reserved amount"
      );
      setDisableButton(false)
      return
    }
    const bankStatus = location?.state?.goalData?.bankVerification === "verified" && checked ? "verified" : checked && "pending";
    const data = {
      goal,
      username: username,
      bankStatus,
      oldGoalName,
      amountToUpdate: goal.currentAmount - oldReserveAmount
    };
    var response = "";
    // if title says update goal then
    if (location?.state?.title) {
      response = await updateGoalAction(data);
      if (!response.success){
        setSnackbarOpen(true)
        setSnackbarMessage(response.message)
        setDisableButton(false)
        return
      }
    } else response = await createGoalAction(data);
    console.log(response);
    if (response) {
      setGoal({
        goalName: "",
        goalDescription: "",
        targetAmount: "",
        currentAmount: "",
        goalTags: [],
        goalPriority: "",
      });
      navigate("/finance-goals");
    }
    setDisableButton(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(goal);
  };

  const handleTagChange = (event) => {
    const { value } = event.target;
    if (value.length <= 2) {
      setGoal({
        ...goal,
        goalTags: typeof value === "string" ? value.split(",") : value,
      });
    }
    setTimeout(() => {
      setSelectOpen(false);
    }, 10);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container display="flex" backgroundColor="#050505">
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "wheat",
          padding: 5,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Typography variant="h3">
          {location?.state?.title ? location.state.title : "Create a New Goal"}
        </Typography>
        <Typography variant="h5">
          Start achieving your finance dreams today !
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flexGrow: 1,
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Goal Name"
            name="goalName"
            value={goal.goalName}
            onChange={handleChange}
            required
            autoCapitalize="true"
            autoComplete="off"
            sx={TextFieldStyle}
          />
          <TextField
            label="Goal Description"
            name="goalDescription"
            value={goal.goalDescription}
            onChange={handleChange}
            helperText={`${goal.goalDescription.length}/80 words`}
            inputProps={{ maxLength: 80 }}
            autoComplete="off"
            required
            sx={TextFieldStyle}
          />
          <Grid container sx={{ justifyContent: "center" }} spacing={3}>
            <Grid item xs={6} md={6}>
              <DecimalValidatedNumberInput
                id="targetAmount"
                label="Target Amount"
                name="targetAmount"
                value={goal.targetAmount}
                onChange={(value) => setGoal({ ...goal, targetAmount: value })}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <DecimalValidatedNumberInput
                id="currentAmount"
                label="Current Amount"
                name="currentAmount"
                value={goal.currentAmount}
                onChange={(value) => setGoal({ ...goal, currentAmount: value })}
              />
            </Grid>
          </Grid>

          <FormControl sx={FormControlStyle}>
            <InputLabel id="goalTag-label">Goal Tags</InputLabel>
            <Select
              labelId="goalTag-label"
              id="goalTag"
              multiple
              value={goal.goalTags}
              onChange={handleTagChange}
              onClick={() => setSelectOpen(true)}
              open={selectOpen}
              required
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>You can select up to 2 tags.</FormHelperText>
          </FormControl>
          <TextField
            select
            label="Goal Priority"
            name="goalPriority"
            value={goal.goalPriority}
            onChange={handleChange}
            required
            sx={TextFieldSelectStyle}
          >
            {priorities.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Grid>
            {location?.state?.goalData?.bankVerification === "verified" ||
            location?.state?.goalData?.bankVerification === "pending" ? (
              <>
                <Typography variant="body" color="white">
                  {location?.state?.goalData?.bankVerification === "verified"
                    ? "Funds are already reserved and verified"
                    : "Bank verification is still pending"}
                </Typography>
                <Checkbox
                  onChange={(event) => setChecked(event.target.checked)}
                  checked
                  disabled
                  sx={CheckboxStyled}
                />
              </>
            ) : (
              <>
                <Typography variant="body" color="white">
                  Reserve funds in your bank account
                </Typography>
                <Checkbox
                  onChange={(event) => setChecked(event.target.checked)}
                  checked={checked}
                  sx={CheckboxStyled}
                />
              </>
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={disableButton}
            sx={{ width: "10%", fontSize: "80%", borderRadius: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Grid>
      <SlideSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
        autoHideDuration={3000}
      />
    </Grid>
  );
};

export default GoalForm;
