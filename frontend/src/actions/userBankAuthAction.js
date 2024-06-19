import axios from "axios"

const bankURL = process.env.REACT_APP_BANK_API + "/userAuth/register-new"

export const userRegisterWithBankAPI = async (data) => {
    const registerWithBank = await axios.post(bankURL, data)
    return registerWithBank.data
}