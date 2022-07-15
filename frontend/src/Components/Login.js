import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const backendUrl = "http://localhost:9000/api/login";
  const submitHandler = (event) => {
    event.preventDefault();
    if (!email.length && !password.length) alert("Enter Email and Password");
    else if (email.length === 0) {
      alert("Enter Email");
    } else if (password.length == 0) {
      alert("Enter Password");
    } else {
      axios
        .post(backendUrl, {
          email: email,
          password: password,
        },{
          withCredentials: true,
        })
        .then((res) => {
          alert("Login Successful");
          localStorage.setItem("login", true);
          localStorage.setItem("email", res.data[0].email);
          localStorage.setItem("name", res.data[0].name);
          localStorage.setItem("id", res.data[0]._id);
        })
        .catch((err) => {
          alert(
            err.response.data.message +
              "\nPlease Login or Sign Up With Another Email"
          );
          console.log(err.response.data);
        });
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={submitHandler}>
        <div className="box">
          <label>Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="text"
          ></input>
        </div>
        <div className="box">
          <label>Password</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type="password"
          ></input>
        </div>
        <div className="box">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
