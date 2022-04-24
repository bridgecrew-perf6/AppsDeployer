import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { userLoginAction } from '../../React-Redux/Action/userAction';
import Error from '../Error';
import Loading from '../Loading';
import './Login.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(userLoginAction(email, password));
  }

  return (
    <>
      <div className="main_login_container">
        <div className="form_login_container">

          <div className="left_login">

            {error && <Error variant='danger' >{error}</Error>}
            {loading && <Loading />}

            <form className="login_form" onSubmit={submitHandler}>
              <h1>Login to your Account</h1>

              <input
                type="email"
                name='email'
                placeholder='Email'
                required
                className='second_input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                name='password'
                placeholder='Password'
                required
                className='second_input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit" className='second_login_btn'>
                Login
              </button>
            </form>
          </div>

          <div className="right_login">
            <h1>New here?</h1>
            <Link to='/register'>
              <button type='button' className='second_register_btn'>
                Register
              </button>
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login