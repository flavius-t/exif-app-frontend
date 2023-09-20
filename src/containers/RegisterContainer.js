import React, { useEffect, useState, useRef } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toastError, toastSuccess } from '../utility/customToasts';

import axios from '../api/axios';

const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,20}$/; // 3-20 characters, must begin with a letter, letters, numbers, dashes, underscores, hyphens allowed
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // 8-24 characters, at least one lowercase, one uppercase, one number, and one special character
const REGISTER_URL = '/register';

const RegisterContainer = () => {
    const userRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [usernameFocus, setusernameFocus] = useState(false);

    const [pass, setPass] = useState('');
    const [passValid, setPassValid] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [matchPass, setMatchPass] = useState('');
    const [matchPassValid, setMatchPassValid] = useState(false);
    const [matchPassFocus, setMatchPassFocus] = useState(false);

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
        const result = PASS_REGEX.test(pass);
        setPassValid(result);
        const match = pass === matchPass;
        setMatchPassValid(match);
    }, [pass, matchPass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // check if the username and password are valid again (in case submit button is bypassed)
        const test_user = USERNAME_REGEX.test(username);
        const test_pass = PASS_REGEX.test(pass);

        if (!test_user || !test_pass) {
            toastError('Invalid username or password.');
            return;
        }

        console.log('submitting form to server')
        // submit the form to server
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ username: username, password: pass }),
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
            setPass('');
            setMatchPass('');
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
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>Your account has been created.</p>
                    <p><a href="/login">Sign In</a></p>
                </section>
            ) : (
                <section>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <span className={validName ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !username ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            onFocus={() => setusernameFocus(true)}
                            onBlur={() => setusernameFocus(false)}
                        />
                        <p className={usernameFocus && username && !validName ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3-20 characters.<br />
                            Must begin with a letter.<br />
                            letters, numbers, hyphens, and underscores allowed.
                        </p>
                        <label htmlFor="password">
                            Password:
                            <span className={passValid ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={passValid || !pass ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            onChange={(e) => setPass(e.target.value)}
                            required
                            onFocus={() => setPassFocus(true)}
                            onBlur={() => setPassFocus(false)}
                        />
                        <p className={passFocus && !passValid ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8-24 characters.<br />
                            Please include at least one lowercase, one uppercase, one number, and one special character.
                        </p>
                        <label htmlFor="confirm_password">
                            Confirm Password:
                            <span className={matchPassValid && matchPass ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={matchPassValid || !matchPass ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            autoComplete="off"
                            onChange={(e) => setMatchPass(e.target.value)}
                            required
                            onFocus={() => setMatchPassFocus(true)}
                            onBlur={() => setMatchPassFocus(false)}
                        />
                        <p className={matchPassFocus && !matchPassValid ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Passwords must match.
                        </p>
                        <button
                            type="submit"
                            disabled={!validName || !passValid || !matchPassValid ? true : false}
                            className={!validName || !passValid || !matchPassValid ? 'disabled' : 'active'}
                        >Sign Up</button>
                        <p>
                            Already have an account?<br />
                            {/* router link goes here */}
                            <span className="link"><a href="/login">Log in</a></span>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
};

export default RegisterContainer;