import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './Components/Main/Main';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Verification from './Components/Verification/Verification';

function App() {

  const user = localStorage.getItem("userInfo");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path='/verify-email' element={<Verification />} />
    </Routes>
  );
}

export default App;
