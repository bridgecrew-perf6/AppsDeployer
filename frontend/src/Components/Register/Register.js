import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css';
import Error from '../Error';
import Loading from '../Loading';
import { useDispatch, useSelector } from 'react-redux';
import { userOTPAction, userRegisterAction } from '../../React-Redux/Action/userAction';
import Verification from '../Verification/Verification';

const Register = () => {

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/');
  //   }
  // }, [navigate, userInfo])

  

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMessage('Passwords do not match');
    }
    else {
      dispatch(userRegisterAction(firstname, lastname, email, password));
    }

    navigate('/verify-email');
  }

  return (
    <>
      <div className="main_register_container">
        <div className="form_register_container">

          <div className="left_register">
            <h1>Welcome</h1>
            <Link to='/login'>
              <button type='button' className="first_login_btn">
                Login
              </button>
            </Link>
          </div>

          <div className="right_register">

            {error && <Error variant='danger'>{error}</Error>}
            {passwordMessage && <Error variant='danger'>{passwordMessage}</Error>}
            {loading && <Loading />}

            <form className="register_form" onSubmit={submitHandler}>
              <h1>Create Account</h1>

              <input
                type="text"
                placeholder='First Name'
                name="firstname"
                required
                className='first_input'
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                placeholder='Last Name'
                name="lastname"
                required
                className='first_input'
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                type="email"
                placeholder='Email'
                name="email"
                required
                className='first_input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                name='password'
                placeholder='Password'
                required
                className='first_input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                type="password"
                name='confirmpassword'
                placeholder='Confirm Password'
                required
                className='first_input'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type='submit' className='first_register_btn' >
                Register
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register