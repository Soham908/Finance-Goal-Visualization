import React, { useState } from "react";
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Chip } from "@mui/material";
import { callCreateGoal, callFetchGoals } from "../actions/goalActions";

const priorities = ["Low", "Medium", "High"];
const tags = ["savings", "investment", "vacation", "car", "house", "education", "other"];

const GoalForm = () => {
  const [goal, setGoal] = useState({
    goalName: "",
    goalDescription: "",
    targetAmount: "",
    currentAmount: "",
    goalTag: [],
    goalPriority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const onSubmit = async () => {
    const data = {
        ...goal,
        username: "Soham"
    }
    const response = await callCreateGoal(data)
    console.log(response);
    // setGoal([])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(goal);
  };

  const handleTagChange = (event) => {
    const { value } = event.target;
    setGoal({
      ...goal,
      goalTag: typeof value === 'string' ? value.split(',') : value,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Goal Name"
        name="goalName"
        value={goal.goalName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Goal Description"
        name="goalDescription"
        value={goal.goalDescription}
        onChange={handleChange}
        helperText={`${goal.goalDescription.length}/80 words`}
        inputProps={{ maxLength: 80 }}
      />
      <TextField
        label="Target Amount"
        name="targetAmount"
        type="number"
        value={goal.targetAmount}
        onChange={handleChange}
        required
        inputProps={{ min: 0 }}
        error={goal.targetAmount < 0}
        helperText={goal.targetAmount < 0 ? 'Target amount cannot be negative' : ''}
      />
      <TextField
        label="Current Amount"
        name="currentAmount"
        type="number"
        value={goal.currentAmount}
        onChange={handleChange}
        inputProps={{ min: 0 }}
        error={goal.currentAmount < 0 }
        helperText={goal.currentAmount < 0 ? 'Current amount cannot be negative' : ''}
      />
      <FormControl>
        <InputLabel id="goalTag-label">Goal Tags</InputLabel>
        <Select
          labelId="goalTag-label"
          id="goalTag"
          multiple
          value={goal.goalTag}
          onChange={handleTagChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
      </FormControl>
      <TextField
        select
        label="Goal Priority"
        name="goalPriority"
        value={goal.goalPriority}
        onChange={handleChange}
      >
        {priorities.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default GoalForm;
