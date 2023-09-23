import React, { useEffect, useState, useRef } from 'react';
import { toastError, toastSuccess } from '../utility/customToasts';
import axios from '../api/axios';
import Register from '../components/Register';


const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,20}$/; // 3-20 characters, must begin with a letter, letters, numbers, dashes, underscores, hyphens allowed
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 8-24 characters, at least one lowercase, one uppercase, one number, and one special character
const REGISTER_URL = '/register';

const RegisterContainer = () => {
    const userRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [matchPasswordValid, setMatchPasswordValid] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [success, setSuccess] = useState(false); // is the form valid?

    // set focus to username input field on page load
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // check if username input is valid anytime it changes
    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidName(result);
    }, [username]);

    // check if password input is valid and if it matches the confirm password input
    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setPasswordValid(result);
        const match = password === matchPassword;
        setMatchPasswordValid(match);
    }, [password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // check if the username and password are valid again (in case submit button is bypassworded)
        const test_user = USERNAME_REGEX.test(username);
        const test_password = PASSWORD_REGEX.test(password);

        if (!test_user || !test_password) {
            toastError('Invalid username or password.');
            return;
        }

        console.log('submitting form to server')
        // submit the form to server
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ username: username, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(response.data);
            // console.log(response.accessToken);
            console.log(JSON.stringify(response))
            if (response.status === 201) {
                setSuccess(true);
                toastSuccess('Account created successfully.');
            }

            // clear the form
            setUsername('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            console.log(err);

            if (!err?.response) {
                toastError('Network error: no response from server.');
            }
            else if (err.response.status === 409) {
                toastError('Account creation failed: user already exists.');
            }
            else if (err.response.status === 400) {
                toastError('Account creation failed: missing username or password.');
            }
            else if (err.response.status === 500) {
                toastError('Account creation failed: server error. Please try again later.');
            }
        }
    };

    return (
        <Register
            handleSubmit={handleSubmit}
            userRef={userRef}
            username={username}
            setUsername={setUsername}
            validName={validName}
            usernameFocus={usernameFocus}
            setUsernameFocus={setUsernameFocus}
            password={password}
            setPassword={setPassword}
            passwordValid={passwordValid}
            passwordFocus={passwordFocus}
            setPasswordFocus={setPasswordFocus}
            matchPassword={matchPassword}
            setMatchPassword={setMatchPassword}
            matchPasswordValid={matchPasswordValid}
            matchPasswordFocus={matchPasswordFocus}
            setMatchPasswordFocus={setMatchPasswordFocus}
            success={success} />
    );
};

export default RegisterContainer;