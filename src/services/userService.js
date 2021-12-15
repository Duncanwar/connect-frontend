import http from "../utils/httpService";

const { REACT_APP_BACKEND_URL} = process.env

export const register = (user) => http.post(`${REACT_APP_BACKEND_URL}/signup`, {
    email: user.email,
    password: user.password,
    name: user.name
})