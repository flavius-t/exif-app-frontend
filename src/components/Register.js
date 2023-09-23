import React from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = ({
    handleSubmit, userRef, username, setUsername, validName, usernameFocus, setUsernameFocus,
    password, setPassword, passwordValid, passwordFocus, setPasswordFocus, matchPassword,
    setMatchPassword, matchPasswordValid, matchPasswordFocus, setMatchPasswordFocus, success
}) => {
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
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p className={usernameFocus && username && !validName ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3-20 characters.<br />
                            Must begin with a letter.<br />
                            letters, numbers, hyphens, and underscores allowed.
                        </p>
                        <label htmlFor="password">
                            Password:
                            <span className={passwordValid ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={passwordValid || !password ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p className={passwordFocus && !passwordValid ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8-24 characters.<br />
                            Please include at least one lowercase, one uppercase, one number, and one special character.
                        </p>
                        <label htmlFor="confirm_password">
                            Confirm Password:
                            <span className={matchPasswordValid && matchPassword ? 'valid' : 'hide'}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={matchPasswordValid || !matchPassword ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            autoComplete="off"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            required
                            onFocus={() => setMatchPasswordFocus(true)}
                            onBlur={() => setMatchPasswordFocus(false)}
                        />
                        <p className={matchPasswordFocus && !matchPasswordValid ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Passwords must match.
                        </p>
                        <button
                            type="submit"
                            disabled={!validName || !passwordValid || !matchPasswordValid ? true : false}
                            className={!validName || !passwordValid || !matchPasswordValid ? 'disabled' : 'active'}
                        >Sign Up</button>
                        <p>
                            Already have an account?<br />
                            <span className="link"><a href="/login">Log in</a></span>
                        </p>
                    </form>
                </section>
            )}
        </>
    )
}

export default Register;