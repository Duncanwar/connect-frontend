import http from "../utils/httpService";
import { API_URL, getAuthHeaders, getJsonHeaders } from "../utils/api";

export function getPosts() {
  return http.get(`${API_URL}/posts`);
}

export function getMyPosts() {
  return http.get(`${API_URL}/posts/myposts`, { headers: getAuthHeaders() });
}

export function likePost(postId) {
  return http.put(
    `${API_URL}/posts/like`,
    { postId },
    { headers: getJsonHeaders() }
  );
}

export function unlikePost(postId) {
  return http.put(
    `${API_URL}/posts/unlike`,
    { postId },
    { headers: getJsonHeaders() }
  );
}

export function commentOnPost(postId, text) {
  return http.put(
    `${API_URL}/posts/comment`,
    { postId, text },
    { headers: getJsonHeaders() }
  );
}

export function deletePost(postId) {
  return http.delete(`${API_URL}/posts/${postId}`, {
    headers: getAuthHeaders(),
  });
}

export function updateProfilePic(pic) {
  return http.put(
    `${API_URL}/users/updatepic`,
    { pic },
    { headers: getJsonHeaders() }
  );
}
