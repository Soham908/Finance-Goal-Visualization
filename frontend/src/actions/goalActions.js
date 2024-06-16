import axios from 'axios'

const url = process.env.REACT_APP_PORT

export const callCreateGoal = async (data) => {
    const newGoal = await axios.post(url + "/api/create-goal", data)
    return newGoal.data
}

export const callFetchGoals = async (username) => {
    const goals = await axios.get(url + "/api/get-goals/" + username)
    return goals.data
}
