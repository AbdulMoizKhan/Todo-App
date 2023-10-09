import React, { useContext, useState } from 'react'
import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../../App';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOutput, setOutput] = useState("");

  const [, setCredentials] = useContext(CredentialsContext);

  const navigate = useNavigate();
  const register = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/register', { username, password })
      .then(() => {
        setOutput("Registration successfull");
        setCredentials({
          username,
          password,
        });
        navigate("/")
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setOutput('Username already exists.');
        } else {
          setOutput('Registration error', error);
        }
      });
  }
  const back = () => {
    navigate('/')
  }

  return (
    <div className='registration'>
        <form className='form_register' onSubmit={register}>
          <div className="insideform_registration">
          <h1>Register Menu</h1>
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
          <button type='submit'>Register</button>
          <button onClick={back}>Back</button>
          <br />
          {isOutput}
          </div>
        </form>
    </div>
  )
}

export default Register
