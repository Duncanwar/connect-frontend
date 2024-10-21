import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../App";

function Profile() {
  const url = process.env.REACT_APP_BACKEND_URL;
  const { state, dispatch } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    mypics: [],
    image: "",
    isPicUpdated: false,
  });

  useEffect(() => {
    const getAllPics = async () => {
      try {
        const result = await axios.get(`${url}/posts/myposts`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        setProfileData((prevData) => ({
          ...prevData,
          mypics: result.data.data,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    getAllPics();
  }, [profileData.isPicUpdated, url]);

  useEffect(() => {
    const uploadImage = async () => {
      // if (!profileData.image) return;
      try {
        const formData = new FormData();
        // formData.append("file", profileData.image);
        // formData.append("upload_preset", "insta-clone");
        // formData.append("cloud_name", "semugeshi");

        // const cloudinaryResponse = await fetch(
        //   process.env.REACT_APP_CLOUDINARY_API,
        //   {
        //     method: "post",
        //     body: formData,
        //   }
        // );

        // const cloudinaryData = await cloudinaryResponse.json();
        const url =
          "https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg";
        if (url) {
          console.log("passed if");

          const result = await axios.put(
            `${url}/users/updatepic`,
            {
              pic: "https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          );
          // const result = await updateResponse.json();
          console.log(result);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, photo: result.photo })
          );
          dispatch({ type: "UPDATEPIC", payload: result.photo });
          setProfileData((prevData) => ({ ...prevData, isPicUpdated: true }));
        }
      } catch (error) {
        console.error("Image upload error", error);
      }
    };
    uploadImage();
  }, [profileData.image, url, state, dispatch]);

  const changePhoto = (file) => {
    setProfileData((prevData) => ({ ...prevData, image: file }));
  };

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.photo : "loading..."}
            />
          </div>
          <div>
            <h4>{state ? state.name : "loading"}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h5>{profileData.mypics.length} posts</h5>
              <h5>{state ? state.followers.length : "0"} followers</h5>
              <h5>{state ? state.following.length : "0"} following</h5>
            </div>
          </div>
        </div>
        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload profile</span>
            <input
              type="file"
              title="profile"
              onChange={(e) => changePhoto(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className="gallery">
        {profileData.mypics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Profile;
