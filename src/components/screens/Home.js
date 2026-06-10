import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import M from "materialize-css";

export default function Home() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    getAllPosts();
  }, [posts]);

  const getAllPosts = async () => {
    try {
      const { data } = await axios.get(`${url}/posts`);
      setPosts(data.data);
    } catch (error) {
      M.toast({ html: error.message });
    }
  };

  const likePost = async (id) => {
    fetch(`${url}/posts/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((item) => {
          return item._id === result._id ? result : item;
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch(`${url}/posts/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((item) => {
          return item._id === result._id ? result : item;
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch(`${url}/posts/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId, text }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((item) => {
          return item._id === result._id ? result : item;
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`${url}/posts/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.filter((item) => item._id !== result._id);
        setPosts(newData);
      });
  };

  return (
    <>
      {posts.length === 0 ? (
        <div className="home-loading">Loading posts...</div>
      ) : (
        <div className="home-container">
          {posts.map((item) => (
            <Card className="post-card" key={item._id}>
              <div className="post-header">
                <div className="post-author">
                  <Link
                    to={
                      item.postedBy._id !== state._id
                        ? "/profile/" + item.postedBy._id
                        : "/profile"
                    }
                  >
                    {item.postedBy.name}
                  </Link>
                </div>
                {item.postedBy._id === state._id && (
                  <button
                    type="button"
                    className="icon-button delete-button"
                    aria-label="Delete post"
                    onClick={() => deletePost(item._id)}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                )}
              </div>

              <Card.Body className="post-body">
                <h6>{item.title}</h6>
                <p>{item.body}</p>
              </Card.Body>

              <div className="post-image">
                <img src={item.photo} alt={item.title || "Post image"} />
              </div>

              <div className="post-actions">
                <button
                  type="button"
                  className="icon-button"
                  onClick={() =>
                    item.likes.includes(state._id)
                      ? unlikePost(item._id)
                      : likePost(item._id)
                  }
                  aria-label={
                    item.likes.includes(state._id) ? "Unlike post" : "Like post"
                  }
                >
                  <i className="material-icons">
                    {item.likes.includes(state._id) ? "thumb_down" : "thumb_up"}
                  </i>
                </button>
                <span className="like-count">{item.likes.length} likes</span>
              </div>

              <div className="comment-list">
                {item.comments.map((record) => (
                  <div className="comment-entry" key={record._id}>
                    <strong>{record.postedBy.name}</strong>
                    <span>{record.text}</span>
                  </div>
                ))}
              </div>

              <form
                className="comment-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                  e.target.reset();
                }}
              >
                <input type="text" placeholder="Add a comment" />
                <button type="submit" className="comment-submit">
                  Post
                </button>
              </form>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
