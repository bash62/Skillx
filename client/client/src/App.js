import './App.css';
import React, { useState } from "react";
import Axios from 'axios';
import NavBar from "./components/NavBar/NavBar";


function App() {

  const [registerUsername, setRegisterUsername] =  useState("");
  const [registerPassword, setRegisterPassword] =  useState("");
  const [loginUsername, setLoginUsername] =  useState("");
  const [loginPassword, setLoginPassword] =  useState("");
  const [data, setData] = useState(null);

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:4000/register"
    }).then((res) => console.log(res)).catch(e => {console.log(e)});

  };

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:4000/login"
    }).then((res) => console.log(res));

  };

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user"
    }).then((res) => setData(res.data));

  };


  return (
    <div className="App">
        <NavBar />
        <div>

          <h1>Register</h1>
          <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)}></input>
          <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)}></input>
          <button onClick={register}>Submit</button>
        </div>

        <div>
          <h1>Login</h1>
          <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
          <input placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
          <button onClick={login}>Submit</button>
        </div>

        <div>
          <h1>GetUser</h1>
          <button onClick={getUser}>Submit</button>
        </div>
    </div>
  );
}

export default App;
