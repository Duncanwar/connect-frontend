import http from "../utils/httpService";

const { REACT_APP_BACKEND_URL } = process.env;
const tokenKey = "dun";

http.setJwt(getJwt());

async function login(email, password) {
  const { data } = await http.post(`${REACT_APP_BACKEND_URL}/signin`, {
    email,
    password,
  });
  console.log(data);
//   localStorage.setItem(tokenKey, jwt);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  getJwt,
};
