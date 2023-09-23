import React, { useEffect, useState, useRef } from 'react';
import { toastError, toastSuccess } from '../utility/customToasts';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';

const LOGIN_URL = '/login';

const LoginView = () => {
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
            } else if (err.response?.status === 400) {
                toastError('Missing Username or Password');
            } else if (err.response?.status === 401) {
                toastError('Login Failed: Invalid Username or Password');
            } else {
                toastError('Login Failed: Unknown Error');
            }
        }
    };

    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    ref={usernameRef}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete='off'
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete='off'
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Need an account? <br />
                <span className="line">
                    <a href="/register">Register</a>
                </span>
            </p>
        </section>
    )

}

export default LoginView;