import React, { useContext, useState } from "react";
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
import { createGoalAction } from "../actions/goalActions";
import DecimalValidatedNumberInput from "./TagValidatedTextField";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

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
    goalTag: [],
    goalPriority: "",
  });

  const [selectOpen, setSelectOpen] = useState(false);
  const [checked, setChecked] = useState(false)
  const { userData } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const onSubmit = async () => {
    // if it is checked then i would have to send a reserve funds request to the bank api
    // create a route for handlind this in the bank api
    // so keep the goal form, bank veri status to pending till the user accepts in the banlk
    // now two options, send success res, from bank to this api, or, keep checking till the bank accpets
    // if keep checking, uncessary calls performed, not the ideal scenario
    // best would chnage the bank api, add a call to this api
    // but for that i would need to deploy this api too
    // test in the local host for now then we will see if it works properly or not
    const data = {
      ...goal,
      username: userData?.username,
      checked
    };
    const response = await createGoalAction(data);
    console.log(response);
    if (response) {
      setGoal({
        goalName: "",
        goalDescription: "",
        targetAmount: "",
        currentAmount: "",
        goalTag: [],
        goalPriority: "",
      });
      navigate('/finance-goals')
    }
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
        goalTag: typeof value === "string" ? value.split(",") : value,
      });
    }
    setTimeout(() => {
      setSelectOpen(false);
    }, 10);
  };

  return (
    <Grid container display="flex">
      <Grid item xs={12} sx={{ backgroundColor: "wheat", padding: 5, justifyContent: 'center', alignContent: 'center' }}>
        <Typography variant="h3">Create a New Goal</Typography>
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

          <FormControl>
            <InputLabel id="goalTag-label">Goal Tags</InputLabel>
            <Select
              labelId="goalTag-label"
              id="goalTag"
              multiple
              value={goal.goalTag}
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
          >
            {priorities.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Grid>
          <Typography variant="body">
            Reserve funds in your bank account
          </Typography>
          <Checkbox 
            onChange={(event) => setChecked(event.target.checked)}
            checked={checked}
          />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "10%", fontSize: "80%", borderRadius: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GoalForm;
