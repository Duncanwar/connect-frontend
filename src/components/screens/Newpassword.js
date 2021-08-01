import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from "materialize-css";

const Update = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const PostData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/new-password`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: data.message });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Connect</h2>
        <input
          type="password"
          placeholder="enter a new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2 "
          onClick={() => PostData()}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};
export default Update;
