import axios from "axios";

const url = process.env.REACT_APP_URL;

export const createGoalAction = async (data) => {
  try {
    const newGoal = await axios.post(url + "/api/create-goal", data);
    return newGoal.data.newGoal;
  } catch (error) {
    console.log(error);
    return {error: "error occured" + error}
  }
};

export const fetchGoalAction = async (username) => {
  try {
    const goalList = await axios.get(url + "/api/get-goals/" + username);
    return goalList.data.goalList;
  } catch (error) {
    console.log(error);
    return {error: "error occured" + error}
  }
};
