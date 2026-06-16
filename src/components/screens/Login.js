import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import auth from "../../services/authService";
import M from "materialize-css";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email" });
      return;
    }
    // const { data } = await auth.login(email, password);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        M.toast({ html: data.error });
      } else {
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));

          dispatch({ type: "USER", payload: data.user });
          M.toast({ html: "signin success" });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p>Sign in to your Connect account and continue sharing updates.</p>
        </div>

        <div className="auth-body">
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn waves-effect waves-light auth-submit"
            onClick={() => PostData()}
          >
            Login
          </button>

          <div className="auth-links">
            <Link className="auth-link" to="/signup">
              Create an account
            </Link>
            <Link className="auth-link" to="/reset">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
