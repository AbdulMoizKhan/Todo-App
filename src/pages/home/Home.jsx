import React from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'
const Home = () => {
  const navigate = useNavigate();
  const reg = () => {
    navigate('/register')
  }
  const log = () => {
    navigate('/login')
  }

  return (
    <div className='home'>
        <form className='form_home'>
          <div className='insideform'>
            <h1>Welcome</h1>
            <button type="button" onClick={reg}>Register</button>
            <br />
            <button type="button" onClick={log}>Login</button>
          </div>
        </form>
    </div>

  )
}

export default Home
