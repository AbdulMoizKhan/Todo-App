import './App.css';
import React, { useState } from 'react';
import { Routes, Route} from "react-router-dom";
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Wrapper from './pages/wrapper/Wrapper';

export const CredentialsContext = React.createContext();

const App = () => {
  const credentialsState = useState();
  return (
    <div className='App'>
      <CredentialsContext.Provider value={credentialsState}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/tasks' element={<Wrapper/>}/>
      </Routes>
      </CredentialsContext.Provider>
    </div>
    
  );
}

export default App

