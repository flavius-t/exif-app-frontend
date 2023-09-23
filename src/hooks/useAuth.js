import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


// this custom hooks helps avoid having to import useContext and AuthContext
// in every component that needs access to the AuthContext
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;