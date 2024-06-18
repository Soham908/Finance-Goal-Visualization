import axios from "axios";

const url = process.env.REACT_APP_PORT;

export const createGoalAction = async (data) => {
  try {
    const newGoal = await axios.post(url + "/api/create-goal", data);
    return newGoal.data;
  } catch (error) {
    console.log(error);
    return {error: "error occured"}
  }
};

export const fetchGoalAction = async (username) => {
  try {
    const goals = await axios.get(url + "/api/get-goals/" + username);
    return goals.data;
  } catch (error) {
    console.log(error);
    return {error: "error occured"}
  }
};
