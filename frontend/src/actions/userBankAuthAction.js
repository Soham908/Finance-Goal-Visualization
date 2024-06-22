import axios from "axios"

const bankURL = process.env.REACT_APP_BANK_API + "/api/auth/login"

export const userRegisterWithBankAPI = async (data) => {
    const registerWithBank = await axios.post(bankURL, data)
    return registerWithBank.data
}