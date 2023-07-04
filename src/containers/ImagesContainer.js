import React, { useContext, useEffect, useState } from "react";
import FilesContext from "../utility/FilesContext";
// import "../styles/ImagesContainer.css";
import MetadataViewContainer from "./MetadataViewContainer";


function ImagesContainer() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { extractedFiles } = useContext(FilesContext);

    useEffect(() => {
        if (extractedFiles.length === 0) {
            return;
        }
        console.log("extractedFiles changed");
        console.log(extractedFiles);
    }, [extractedFiles]);

    const handleTriggerSingleView = (e) => {
        e.preventDefault();
        console.log("clicked image");
        console.log(e.target.alt);
        setSelectedImage(e.target.alt);
    }

    if (selectedImage) {
        return (
            <MetadataViewContainer imageFileName={selectedImage} />
        );
    }

    // TODO: turn this into ImagesGrid presentational component
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
                                        <img src={imageUrl} alt={file.filename} type='image/jpeg' onClick={handleTriggerSingleView} />
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