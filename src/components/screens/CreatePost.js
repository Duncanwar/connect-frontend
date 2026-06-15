import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [image]);

  useEffect(() => {
    if (url) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            M.toast({ html: "created post " });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "semugeshi");

    fetch(process.env.REACT_APP_CLOUDINARY_API, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const imageLabel = image ? image.name : "No image selected";

  return (
    <div className="create-post-card card input-field">
      <div className="create-post-header">
        <h2>Create Post</h2>
        <p className="create-post-subtitle">
          Add a title, share your story, and attach an image to publish instantly.
        </p>
      </div>

      <div className="create-post-body">
        <div className="create-post-field">
          <label htmlFor="post-title">Title</label>
          <input
            id="post-title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="create-post-field">
          <label htmlFor="post-body">Body</label>
          <textarea
            id="post-body"
            placeholder="Write something interesting..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="4"
          />
        </div>

        <div className="create-post-file-section">
          <div className="file-field input-field create-post-file-field">
            <div className="btn create-post-upload-btn">
              <span>Choose Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder={imageLabel}
                readOnly
              />
            </div>
          </div>
          <div className="create-post-image-note">
            {image ? `Selected file: ${image.name}` : "Select an image to attach to your post."}
          </div>
     
          {imagePreview && (
            <div className="create-post-image-preview">
              <img src={imagePreview} alt="Preview of selected post" />
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className="btn waves-effect waves-light create-post-submit"
        onClick={() => postDetails()}
      >
        Publish Post
      </button>
    </div>
  );
};
export default CreatePost;
