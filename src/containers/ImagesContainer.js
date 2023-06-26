import React, { useContext, useEffect } from "react";
import FilesContext from "../utility/FilesContext";

const getFileExt = (filename) => {
    let file_ext = filename.split('.').pop();
    if (file_ext === 'jpg') {
        return file_ext = 'jpeg';
    }
    return file_ext;
}

function ImagesContainer() {
    const { extractedFiles } = useContext(FilesContext);

    useEffect(() => {
        if (extractedFiles.length === 0) {
            return;
        }
        console.log("extractedFiles changed");
        console.log(extractedFiles);
    }, [extractedFiles]);

    return (
        <div>
            <h1>Images</h1>
            <div className="image-grid">
                {extractedFiles.map(
                    (file, index) => {
                        // get file type from blob
                        const fileType = (getFileExt(file.filename) === 'json') ? 'application/json' : 'image/jpeg'
                        console.log(`filename ${file.filename}: ${fileType}`)
                        if (fileType === 'image/jpeg') {
                            return (
                                <div className="grid-img-container" key={index}>
                                    <img src={file.data} alt={file.filename} type='image/jpeg'/>
                                    <h3>{file.filename}</h3>
                                </div>
                            );
                        }
                    }
                )}
            </div>
        </div>
    );
}

export default ImagesContainer;