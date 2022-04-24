import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userProfileAction } from '../../React-Redux/Action/userAction';
import Error from '../Error';
import './ProfilePage.css';

const ProfilePage = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userProfile = useSelector((state) => state.userProfile);
    const { error, success } = userProfile;

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/register');
        }
        else {
            setFirstName(userInfo.firstname);
            setLastName(userInfo.lastname);
            setEmail(userInfo.email);
        }

    }, [navigate, userInfo])


    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(userProfileAction({ firstname, lastname, email }));

    }

    return (
        <>
            <div>
                <Row className='profileContainer'>
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>

                            {success && <Error variant='success'>Updated Successfully</Error>}
                            {error && <Error variant='danger'>{error}</Error>}

                            <Form.Group controlId="formGroupName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formGroupName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formGroupConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button type='submit'>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default ProfilePage