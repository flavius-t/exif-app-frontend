import React from 'react';

const Login = ({ usernameRef, username, setUsername, password, setPassword, handleSubmit }) => {
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
    );
}

export default Login;