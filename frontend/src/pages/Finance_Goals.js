import React, { useEffect, useState } from 'react'
import { fetchGoalAction } from '../actions/goalActions'
import GoalCard from '../components/GoalCard'
import { Grid } from '@mui/material'

const Finance_Goals = () => {

  const [goalData, setGoalData] = useState([{
    goalName: "",
    goalDescription: "",
    targetAmount: "",
    currentAmount: "",
    goalTag: [],
    goalPriority: "",
  }])

  useEffect(() => {
    const getGoalData = async () => {
      const response = await fetchGoalAction("Soham")
      console.log(response);
      setGoalData(response.goals)
    }
    getGoalData()
  }, [])

  return (
    <>
      <Grid container display="flex" direction="column">
        <Grid container item padding={2}>
        {
          goalData?.map((value, index) => {
            return(
              <Grid item margin={1} sx={{ width: { xs: '90%', sm: '45%', md: '30%' } }}>
              <GoalCard goal={value} />
              </Grid>
            )
          })
        }
        </Grid>
      </Grid>
    </>
  )
}

export default Finance_Goals