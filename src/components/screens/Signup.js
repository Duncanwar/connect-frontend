import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { register } from "../../services/userService";

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const uploadFields = async () => {
    if (!name.trim()) {
      M.toast({ html: "Please enter your name" });
      return;
    }

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid email address" });
      return;
    }

    if (password.length < 6) {
      M.toast({ html: "Password must be at least 6 characters" });
      return;
    }

    if (password !== confirmPassword) {
      M.toast({ html: "Passwords do not match" });
      return;
    }

    try {
      const { data } = await register({ name, password, email });
      M.toast({ html: data.message });
      history.push("/signin");
    } catch (error) {
      console.log(error?.response);
      M.toast({ html: error?.response?.data?.error || "Signup failed" });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") uploadFields();
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--signup">
        <div className="auth-header">
          <h2>Join Connect</h2>
          <p>Create an account to start sharing and connecting with others.</p>
        </div>

        <div className="auth-body">
          <div className="auth-field">
            <label htmlFor="signup-name">Full Name</label>
            <div className="input-row">
              <span className="input-icon material-icons">person</span>
              <input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email">Email</label>
            <div className="input-row">
              <span className="input-icon material-icons">email</span>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="signup-password">Password</label>
            <div className="input-row">
              <span className="input-icon material-icons">lock</span>
              <input
                id="signup-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <small className="field-help">Minimum 6 characters</small>
          </div>

          <div className="auth-field">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <div className="input-row">
              <span className="input-icon material-icons">lock_outline</span>
              <input
                id="signup-confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn waves-effect waves-light auth-submit"
            onClick={() => uploadFields()}
          >
            Create Account
          </button>

          <div className="auth-links">
            <Link className="auth-link" to="/signin">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
