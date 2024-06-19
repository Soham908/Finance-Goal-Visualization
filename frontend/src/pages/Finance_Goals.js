import React, { useEffect, useState } from "react";
import { fetchGoalAction } from "../actions/goalActions";
import GoalCard from "../components/GoalCard";
import { Grid, IconButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Finance_Goals = ({ sliceNum }) => {
  const [goalData, setGoalData] = useState([
    {
      goalName: "",
      goalDescription: "",
      targetAmount: "",
      currentAmount: "",
      goalTag: [],
      goalPriority: "",
    },
  ]);
  const username = localStorage.getItem("userCredentialGoal");
  const navigate = useNavigate()

  var slice = sliceNum || goalData?.length;

  useEffect(() => {
    const getGoalData = async () => {
      const response = await fetchGoalAction(username);
      console.log(response);
      setGoalData(response?.goals);
    };
    getGoalData();
    slice = goalData.length;
  }, []);

  return (
    <>
      <Grid container display="flex">
        {
          !sliceNum &&
          <Grid container item paddingTop={6} paddingLeft={6} display='flex' direction='column' >
            <Grid item >
            <Typography variant="h4" fontWeight='bold'>
              These are your goals
            </Typography>
            </Grid>
            <Grid item paddingTop={2} display='flex'>
            <Typography variant="h6" fontWeight='bold'>
              Create a new one
            </Typography>
            <IconButton onClick={() => navigate("/goal-form") } >
              <Add />
            </IconButton>
            </Grid>
          </Grid>
        }
        <Grid container item padding={2}>
          {goalData?.slice(0, slice).map((value, index) => {
            return (
              <Grid item key={index} margin={1}
                sx={{ width: { xs: "90%", sm: "45%", md: "30%" } }}
              >
                <GoalCard goal={value} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Finance_Goals;
