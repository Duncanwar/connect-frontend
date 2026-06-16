import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import M from "materialize-css";
import * as postService from "../../services/postService";

function PostItem({ item, currentUserId, onDelete, onSave, onLike, onUnlike, onComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);

  useEffect(() => {
    setTitle(item.title);
    setBody(item.body);
  }, [item.title, item.body, item._id]);

  const startEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setTitle(item.title);
    setBody(item.body);
  };

  const saveChanges = async () => {
    if (!title.trim() || !body.trim()) {
      M.toast({ html: "Title and body are required." });
      return;
    }

    await onSave(item._id, title, body);
    setIsEditing(false);
  };

  return (
    <Card className="post-card" key={item._id}>
      <div className="post-header">
        <div className="post-author">
          <Link to={item.postedBy._id !== currentUserId ? "/profile/" + item.postedBy._id : "/profile"}>
            {item.postedBy.name}
          </Link>
        </div>
        {item.postedBy._id === currentUserId && (
          <div className="post-header-actions">
            <button type="button" className="icon-button" aria-label="Edit post" onClick={startEdit}>
              <i className="material-icons">edit</i>
            </button>
            <button
              type="button"
              className="icon-button delete-button"
              aria-label="Delete post"
              onClick={() => onDelete(item._id)}
            >
              <i className="material-icons">delete</i>
            </button>
          </div>
        )}
      </div>

      <Card.Body className="post-body">
        {isEditing ? (
          <div className="post-edit-form">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Edit title"
            />
            <textarea
              rows="4"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Edit body"
            />
            <div className="edit-actions">
              <button type="button" className="btn waves-effect waves-light auth-submit" onClick={saveChanges}>
                Save
              </button>
              <button type="button" className="btn waves-effect waves-light cancel-button" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h6>{item.title}</h6>
            <p>{item.body}</p>
          </>
        )}
      </Card.Body>

      <div className="post-image">
        <img src={item.photo} alt={item.title || "Post image"} />
      </div>

      <div className="post-actions">
        <button
          type="button"
          className="icon-button"
          onClick={() => (item.likes.includes(currentUserId) ? onUnlike(item._id) : onLike(item._id))}
          aria-label={item.likes.includes(currentUserId) ? "Unlike post" : "Like post"}
        >
          <i className="material-icons">{item.likes.includes(currentUserId) ? "thumb_down" : "thumb_up"}</i>
        </button>
        <span className="like-count">{item.likes.length} likes</span>
      </div>

      <div className="comment-list">
        {item.comments.map((record, index) => (
          <div className="comment-entry" key={record._id || record.id || `${item._id}-comment-${index}`}>
            <strong>{record.postedBy?.name || record.postedByName || "Anonymous"}</strong>
            <span>{record.text}</span>
          </div>
        ))}
      </div>

      <form
        className="comment-form"
        onSubmit={(e) => {
          e.preventDefault();
          const commentText = e.target.commentText?.value || e.target[0].value;
          if (!commentText.trim()) return;
          onComment(commentText, item._id);
          e.target.reset();
        }}
      >
        <input name="commentText" type="text" placeholder="Add a comment" />
        <button type="submit" className="comment-submit">
          Post
        </button>
      </form>
    </Card>
  );
}

export default function Home() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const { state } = useContext(UserContext);
  const currentUserId = String(state?._id || state?.id || "");

  useEffect(() => {
    getAllPosts();
  }, []);

  const transformPost = (p) => {
    const id = String(p._id ?? p.id ?? "");
    const comments = Array.isArray(p.comments) ? p.comments : [];
    const likes = Array.isArray(p.likes) ? p.likes.map((like) => String(like)) : [];

    return {
      _id: id,
      title: p.title || p.post_title || "",
      body: p.body || p.post_body || "",
      photo: p.photo || p.image || "",
      postedBy: {
        _id: String(p.postedBy || p.postedById || p.posted_by || ""),
        name: p.postedByName || p.postedBy_name || "",
        photo: p.postedByPhoto || null,
      },
      likes,
      comments,
      likesCount: p.likesCount ?? likes.length,
      commentsCount: p.commentsCount ?? comments.length,
      createdAt: p.createdAt || p.created_at,
      updatedAt: p.updatedAt || p.updated_at,
    };
  };

  const getAllPosts = async () => {
    try {
      const { data } = await axios.get(`${url}/posts`);
      const transformed = (data.data || []).map(transformPost);
      setPosts(transformed);
    } catch (error) {
      M.toast({ html: error.message });
    }
  };

  const updatePostInList = (payload) => {
    const mapped = transformPost(payload);
    const postIdStr = String(mapped._id);
    
    setPosts((prev) => {
      const updated = prev.map((item) => {
        const itemIdStr = String(item._id);
        return itemIdStr === postIdStr ? mapped : item;
      });
      return updated;
    });
  };

  const likePost = async (id) => {
    try {
      const res = await fetch(`${url}/posts/like`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ postId: id }),
      });
      const result = await res.json();
      updatePostInList(result);
    } catch (err) {
      console.error(err);
    }
  };

  const unlikePost = async (id) => {
    try {
      const res = await fetch(`${url}/posts/unlike`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ postId: id }),
      });
      const result = await res.json();
      updatePostInList(result);
    } catch (err) {
      console.error(err);
    }
  };

  const makeComment = async (text, postId) => {
    if (!text.trim()) return;

    try {
      const res = await fetch(`${url}/posts/comment`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ postId, text }),
      });
      const result = await res.json();
      updatePostInList(result);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (postid) => {
    try {
      const res = await fetch(`${url}/posts/${postid}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const result = await res.json();
      const deletedId = String(result._id || result.id || postid);
      setPosts((prev) => prev.filter((item) => item._id !== deletedId));
    } catch (err) {
      console.error(err);
    }
  };

  const savePostEdit = async (postId, title, body) => {
    try {
      const { data } = await postService.updatePost(postId, { title, body });
      
      // Ensure the post object has the updated title and body
      const updatedPost = {
        ...data,
        title: title || data.title,
        body: body || data.body
      };
      
      updatePostInList(updatedPost);
      
      // Force a fresh fetch to ensure UI is in sync
      setTimeout(() => {
        getAllPosts();
      }, 100);
      
      M.toast({ html: "Post updated successfully." });
    } catch (error) {
      M.toast({ html: error.message });
    }
  };

  return (
    <>
      {posts.length === 0 ? (
        <div className="home-loading">Loading posts...</div>
      ) : (
        <div className="home-container">
          {posts.map((item) => (
            <PostItem
              key={item._id}
              item={item}
              currentUserId={currentUserId}
              onDelete={deletePost}
              onSave={savePostEdit}
              onLike={likePost}
              onUnlike={unlikePost}
              onComment={makeComment}
            />
          ))}
        </div>
      )}
    </>
  );
}
