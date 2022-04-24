import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userOTPAction } from '../../React-Redux/Action/userAction';
import Error from '../Error';
import Loading from '../Loading';
import './Verification.css';

const Verification = () => {

    const [otp, setOtp] = useState("");
    const [id, setId] = useState();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    let { userInfo } = userLogin;

    const userOTP = useSelector(state => state.userOTP);
    const { loading, error, success } = userOTP;

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/register');
        }
        else {
            setId(userInfo._id);
        }
    }, [navigate, userInfo])


    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(userOTPAction(id, otp));
    }

    return (
        <>
            <div className="main_verification_container">
                <div className="center_verification_container">

                    {error && <Error variant='danger'>{error}</Error>}
                    {/* {loading && <Loading />} */}

                    <h1>Verify your Email</h1>
                    <h1>Enter your OTP</h1>

                    <form className="otp_form" onSubmit={submitHandler}>
                        <input
                            type="number"
                            placeholder='Enter OTP'
                            name="otp"
                            required
                            className='otp_input'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <button type="submit" className='otp_btn'>
                            Submit OTP
                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Verification