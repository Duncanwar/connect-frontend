import React, { useEffect, useState, useContext, useMemo } from "react";
import { UserContext } from "../../App";
import M from "materialize-css";
import * as postService from "../../services/postService";
import { uploadImage } from "../../services/cloudinaryService";
import { transformUser } from "../../utils/transformers";

export default function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const user = useMemo(() => transformUser(state), [state]);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        const { data } = await postService.getMyPosts();
        if (!cancelled) {
          setMyPosts(data.data || []);
        }
      } catch (error) {
        if (!cancelled) {
          M.toast({ html: error.message });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
    window.reload();
  }, [user.photo]);

  const handlePhotoChange = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      const { data } = await postService.updateProfilePic(imageUrl);
      const updatedUser = { ...state, photo: data.photo };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch({ type: "UPDATEPIC", payload: data.photo });
    } catch (error) {
      M.toast({ html: error.message });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="home-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <img
            className="profile-avatar"
            src={user.photo || "https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png"}
            alt={user.name || "Profile"}
          />
          <div className="profile-stats">
            <h4>{user.name || "User"}</h4>
            <div className="profile-counts">
              <span>{myPosts.length} posts</span>
              <span>{user.followers.length} followers</span>
              <span>{user.following.length} following</span>
            </div>
          </div>
        </div>

        <label className="profile-upload">
          <span>{uploading ? "Uploading..." : "Upload profile photo"}</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => handlePhotoChange(e.target.files[0])}
          />
        </label>
      </div>

      <div className="gallery">
        {myPosts.map((item) => (
          <img
            key={item._id}
            className="item"
            src={item.photo}
            alt={item.title}
          />
        ))}
      </div>
    </div>
  );
}
