import React, { useContext, useEffect } from "react";
import FilesContext from "../utility/FilesContext";

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
                    (image, index) => {
                        return (
                            <div className="grid-img-container" key={index}>
                                <img src={image.data} alt={image.filename} type='image/jpeg'/>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default ImagesContainer;