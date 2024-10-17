import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Bookmark } from "react-bootstrap-icons";
import { getPosts, like } from "../../services/postService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import axios from "axios";

export default function Home() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  const getAllPosts = async () => {
    const { data } = await axios.get(`${url}/posts`);
    setPosts(data.data);
  };

  const likePost = async (id) => {
    // const { data } = await like(id, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + localStorage.getItem("jwt"),
    //   },
    // });
    // console.log(data);
    fetch(`${url}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch(`${url}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((item) => {
          if (item._id === result._id) {
            console.log(result);
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch(`${url}/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`${url}/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.filter((item) => {
          return item._id !== result._id;
        });
        setPosts(newData);
      });
  };
  const bookMark = () => {
    return (
      <h2 style={{ color: "black" }}>
        Bookmark
        {console.log("Here")}
      </h2>
    );
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPagedData = async () => {
    // const fil = data;
    const { data } = await axios.get(`${url}/posts`);
    // totalCount: fil.length
    // console.log(data.data);
    return { posts: data.data };
  };
  // const { posts: data, totalCount } = getPagedData();
  {
    /* {console.log(allPosts)}
  {allPosts.length == 0 ? (
    <div>Loading ...</div>
  ) : ( */
  }
  return (
    <>
      {/* <Card> */}
      <Card>
        <h2>Hello</h2>
      </Card>
      {posts?.map((item) => (
        <div className="card home-card" key={item._id}>
          {console.log(item)}
          {console.log(posts)}
          <h5 style={{ padding: "5px" }}>
            <Link
              to={
                item.postedBy._id !== state._id
                  ? "/profile/" + item.postedBy._id
                  : "/profile"
              }
            >
              {item.postedBy.name}
            </Link>{" "}
            {item.postedBy._id == state._id && (
              <i
                className="material-icons"
                style={{
                  float: "right",
                }}
                onClick={() => deletePost(item._id)}
              >
                delete
              </i>
            )}
          </h5>
          <div className="center">
            <h6>{item.title}</h6>
            <p>{item.body}</p>
          </div>
          <div className="card-image shadow-lg card">
            <img src={item.photo} />
          </div>
          <div className="card-content shadow-lg">
            {item.likes.includes(state._id) ? (
              <i
                className="material-icons"
                onClick={() => {
                  unlikePost(item._id);
                }}
              >
                thumb_down
              </i>
            ) : (
              <i
                className="material-icons"
                onClick={() => {
                  likePost(item._id);
                }}
              >
                thumb_up
              </i>
            )}
            <h6>{item.likes.length} likes</h6>
            {item.comments.map((record) => {
              return (
                <h6 key={record._id}>
                  <span style={{ fontWeight: "500" }}>
                    {record.postedBy.name}
                  </span>{" "}
                  {record.text}
                </h6>
              );
            })}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(e.target[0].value, item._id);
              }}
            >
              <input type="text" placeholder="add a comment" />
            </form>
          </div>
        </div>
      ))}
      {/* </Card> */}
      {/* <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(currentPage) => handlePageChange(currentPage)}
          /> */}
    </>
  );
}
