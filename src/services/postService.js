import http from "../utils/httpService";

const { REACT_APP_BACKEND_URL: apiUrl } = process.env;

function postUrl(id) {
  return `${apiUrl}/${id}`;
}

export function getPosts(headers) {
  return http.get(`${apiUrl}/posts`, headers);
}

export function like(id, headers) {
  return http.put(`${apiUrl}/like`, { headers, postId: id });
}
export function unLike(headers) {
  return http.put(`${apiUrl}/unlike`, headers);
}
