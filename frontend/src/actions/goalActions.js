import axios from "axios";

const url = process.env.REACT_APP_URL + "/api/goal";

export const createGoalAction = async (data) => {
  try {
    const newGoal = await axios.post(url + "/create-goal", data);
    return newGoal.data.newGoal;
  } catch (error) {
    console.log(error);
    return {error: "error occured" + error}
  }
};

export const fetchGoalAction = async (username) => {
  try {
    const goalList = await axios.get(url + "/fetch-goals/" + username);
    return goalList.data.goalList;
  } catch (error) {
    console.log(error);
    return {error: "error occured" + error}
  }
};

export const deleteGoalAction = async (data) => {
  try {
    console.log(data);
    const deleteGoal = await axios.post(url + "/delete-goal", data)
    return deleteGoal.data
  } catch (error) {
    console.log(error);
    return { success: false }
  }
}

export const updateGoalAction = async (data) => {
  console.log(data);
  const response = await axios.post(url + "/update-goal", data)
  return response.data
}

export const updateGoalAddFunds = async (data) => {
  console.log(data);
  const response = await axios.post(url + "/update-current-amount", data)
  return response.data
}
