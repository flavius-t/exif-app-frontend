import React, { useContext, useEffect } from "react";
import FilesContext from "../utility/FilesContext";


// TODO: move rendering to presentational component
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
                        if (file.type === 'image/jpeg') {
                            const imageUrl = URL.createObjectURL(new Blob([file.data], { type: file.type }));
                            return (
                                <div className="grid-img-container" key={index}>
                                    <a href={imageUrl} download={file.filename}>
                                        <img src={imageUrl} alt={file.filename} type='image/jpeg'/>
                                        <h3>{file.filename}</h3>
                                    </a>
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