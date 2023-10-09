import React, { useContext, useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../../App';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOutput, setOutput] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const config = {
      timeout: 5000
    };
    axios
      .post('http://localhost:3001/login', { username, password }, config)
      .then((response) => {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        console.log(username, password)
        setCredentials({
          username,
          password,
        });
        setOutput("Login successfull");
        console.log(response.data)
        navigate("/tasks")
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setOutput('Invalid Login Credentials.');
        } else {
          setOutput('Login error: ' + error.message);
        }
      });
  }
  const back = () => {
    navigate('/')
  }
  return (
    <div className='login'>
      <form className='form_login' onSubmit={login}>
        <div className="insideform_login">
          <h1>Login Menu</h1>
          <br />
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            placeholder='Username' />
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            name=""
            id=""
            placeholder='Password' />
          <br />
          <button type='submit'>Login</button>
          <br />
          <button onClick={back}>Back</button>
          <p>{isOutput}</p>
        </div>
      </form>
    </div>
  )
}

export default Login
