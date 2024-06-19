import React, { useEffect, useState } from 'react'
import { fetchGoalAction } from '../actions/goalActions'
import GoalCard from '../components/GoalCard'
import { Grid } from '@mui/material'

const Finance_Goals = ({ sliceNum }) => {

  const [goalData, setGoalData] = useState([{
    goalName: "",
    goalDescription: "",
    targetAmount: "",
    currentAmount: "",
    goalTag: [],
    goalPriority: "",
  }])
  const username = localStorage.getItem('userCredentialGoal')

  var slice = sliceNum || goalData?.length

  useEffect(() => {
    const getGoalData = async () => {
      const response = await fetchGoalAction(username)
      console.log(response);
      setGoalData(response?.goals)
    }
    getGoalData()
    slice = goalData.length
  }, [])
  
  return (
    <>
      <Grid container display="flex" direction="column">
        
        <Grid container item padding={2}>
        {
          goalData?.slice(0, slice).map((value, index) => {
            return(
              <Grid item key={index} margin={1} sx={{ width: { xs: '90%', sm: '45%', md: '30%' } }}>
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