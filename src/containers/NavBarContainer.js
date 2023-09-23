import React from 'react';
import axios from '../api/axios';
import { toastSuccess } from '../utility/customToasts';
import useAuth from '../hooks/useAuth';
import NavBar from '../components/NavBar';

const NavBarContainer = () => {
    const { auth, setAuth } = useAuth();

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
                setAuth(false);
                console.log(response);
            }
        } catch (err) {
            console.log(err);
            console.log(err.response);
        }
    };

    return (
        <NavBar auth={auth} handleLogout={handleLogout} />
    )
}

export default NavBarContainer;