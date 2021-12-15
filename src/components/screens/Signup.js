import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { register } from "../../services/userService";

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const uploadFields = async () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email" });
      return;
    }
    try {
      const { data } = await register({ name, password, email });
      M.toast({ html: data.message });
      history.push("/signin");
    } catch (error) {
      console.log(error.response);
      M.toast({ html: error.response.data.error });
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          onClick={() => uploadFields()}
        >
          Signup
        </button>
        <h5>
          <Link to="/signin">Have an account already </Link>
        </h5>
      </div>
    </div>
  );
};
export default SignUp;
