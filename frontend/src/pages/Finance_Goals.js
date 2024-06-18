import React, { useEffect } from 'react'
import { fetchGoalAction } from '../actions/goalActions'

const Finance_Goals = () => {

  useEffect(() => {
    const getGoalData = async () => {
      const response = await fetchGoalAction("Soham")
      console.log(response);
    }
    getGoalData()
  }, [])

  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default Finance_Goals