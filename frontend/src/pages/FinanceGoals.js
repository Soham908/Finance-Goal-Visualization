import React, { useEffect, useState } from "react";
import { fetchGoalAction } from "../actions/goalActions";
import GoalCard from "../components/GoalCard";
import { Grid, IconButton, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import GoalCardSkeleton from "../components/GoalCardSkeleton";
import { useUserGoalStore } from "../store/store";

const FinanceGoals = ({ sliceNum }) => {
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
  const [loading, setLoading] = useState(true)

  const userGoalData = useUserGoalStore(state => state.goalData)
  const setStoreGoalData = useUserGoalStore(state => state.setStoreGoalData)

  var slice = sliceNum || goalData?.length;

  useEffect(() => {
    const getGoalData = async () => {
      const response = await fetchGoalAction(username);
      setGoalData(response?.goals);
      setLoading(false)
      setStoreGoalData(response?.goals)
    };
    getGoalData();
    slice = goalData.length;
  }, []);

  return (
    <>
      <Grid container display="flex" >
        <Grid container item sx={{ height: { xs: '8%', sm: '15%', md: '17%' }, marginBottom: 6 }}>
        {
          !sliceNum &&
          <Grid container item paddingTop={6} paddingLeft={6} display='flex' direction='column' sx={{ backgroundColor: 'wheat', width: '100%' }} >
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
        </Grid>
        <Grid container item>
        <Grid container item padding={2} >
        {loading && username ? (
              // Render skeletons while loading
              Array.from(new Array(3)).map((_, index) => (
                <Grid item key={index} margin={1}
                  sx={{ width: { xs: "90%", sm: "45%", md: "30%" } }}
                >
                  <GoalCardSkeleton />
                </Grid>
              ))
            ) : (
              userGoalData && userGoalData[0]?.goalName &&
              userGoalData?.slice(0, slice)?.map((value, index) => {
                return (
                  <Grid item key={index} margin={1}
                    sx={{ width: { xs: "90%", sm: "45%", md: "30%" } }}
                  >
                    <GoalCard goal={value} />
                  </Grid>
                );
              })
            )
          }
        </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FinanceGoals;
