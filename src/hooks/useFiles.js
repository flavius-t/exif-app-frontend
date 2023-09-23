import { useContext } from 'react';
import FilesContext from '../context/FilesContext';


const useFiles = () => {
    return useContext(FilesContext);
}

export default useFiles;