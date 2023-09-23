import React from 'react';

const NavBar = ({ auth, handleLogout }) => {
    return (
        <nav>
            <h1 className="nav-title">EXIF App</h1>
            {auth ? <a onClick={handleLogout}>Logout</a> : null}
        </nav>
    )
}

export default NavBar;