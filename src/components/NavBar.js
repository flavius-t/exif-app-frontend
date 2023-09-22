import React from 'react';
import axios from '../api/axios';
import { toastSuccess } from '../utility/customToasts';

const NavBar = () => {
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const csrf_token = document.cookie.split(';')[0].split('=')[1];
            const response = await axios.get(
                '/logout',
                {
                    headers: { 'X-CSRF-TOKEN': csrf_token },
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                toastSuccess('Logout Successful');
                console.log(response);
            }
        } catch (err) {
            console.log(err);
            console.log(err.response);
        }
    };

    return (
        <nav>
            <h1>EXIF App</h1>
            {/* TODO: display logout only if auth state is true */}
            <a onClick={handleLogout}>Logout</a>
        </nav>
    )
}

export default NavBar;