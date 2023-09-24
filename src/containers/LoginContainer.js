import React, { useEffect, useState, useRef } from 'react';
import { toastError, toastSuccess } from '../utility/customToasts';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

import axios from '../api/axios';

const LOGIN_URL = '/login';

const LoginContainer = () => {
    const usernameRef = useRef();
    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: username, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                toastSuccess('Login Successful');
                setUsername('');
                setPassword('');
                setAuth(true);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                toastError('Network Error: No Server Response');
            } else if (err.response?.status === 401 || err.response?.status === 400) {
                toastError('Login Failed: Invalid Username or Password');
            } else {
                toastError('Login Failed: Unknown Error');
            }
        }
    };

    return (
        <Login
            usernameRef={usernameRef}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    )

}

export default LoginContainer;