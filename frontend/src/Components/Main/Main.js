import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogoutAction } from '../../React-Redux/Action/userAction';
import ProfilePage from '../ProfilePage/ProfilePage';
import './Main.css';

const Main = () => {

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(userLogoutAction());
    navigate('/login')
  };

  useEffect(() => { }, [userInfo])

  return (
    <>
      <div className="main_container">
        <nav className="navbar">
          <h1>AppsDeployer</h1>
          <button className="logout" onClick={logoutHandler}>Log out</button>
        </nav>
        <ProfilePage />
      </div>
    </>
  )
}

export default Main