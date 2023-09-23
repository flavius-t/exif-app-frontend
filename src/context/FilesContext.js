import { createContext, useState } from "react";


const FilesContext = createContext({});


export const FilesProvider = ({ children }) => {
    const [extractedFiles, setExtractedFiles] = useState([]);
    const [zipBlob, setZipBlob] = useState(null);


    return (
        <FilesContext.Provider value={{ extractedFiles, setExtractedFiles, zipBlob, setZipBlob }}>
            {children}
        </FilesContext.Provider>
    );
}

export default FilesContext;