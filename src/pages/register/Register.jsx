import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PROD_URL } from "../../backend-url";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState(false);
  const [credentials, setCredentials] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleFinish = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${PROD_URL}auth/register`, {
        email: credentials.email,
        username: credentials.username,
        password: credentials.password,
      });
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <button
            className="loginButton"
            onClick={() => history.push("/login")}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input
              type="email"
              placeholder="email address"
              name="email"
              onChange={handleChange}
            />
            <button className="registerButton" onClick={() => setEmail(true)}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
