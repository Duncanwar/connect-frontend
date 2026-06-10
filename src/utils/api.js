export const API_URL = process.env.REACT_APP_BACKEND_URL;

export function getAuthHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  };
}

export function getJsonHeaders() {
  return {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
}
