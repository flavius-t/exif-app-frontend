import React, { useContext, useEffect, useState } from "react";
import FilesContext from "../utility/FilesContext";
// import "../styles/ImagesContainer.css";
import MetadataViewContainer from "./MetadataViewContainer";
import { useNavigate } from "react-router-dom";


function ImagesContainer() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [zipBlobUrl, setZipBlobUrl] = useState(null);
    const { extractedFiles, zipBlob } = useContext(FilesContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (extractedFiles.length === 0) {
            return;
        }
        console.log("extractedFiles changed");
        console.log(extractedFiles);
    }, [extractedFiles]);

    useEffect(() => {
        if (zipBlob) {
            console.log("zipBlob changed");
            console.log(zipBlob);
            setZipBlobUrl(URL.createObjectURL(zipBlob));
        }
    }, [zipBlob]);

    const handleTriggerSingleView = (e) => {
        e.preventDefault();
        console.log("clicked image");
        console.log(e.target.alt);
        setSelectedImage(e.target.alt);
    }

    const handleReturnToUpload = (e) => {
        e.preventDefault();
        navigate('/upload')
    }

    const handleClosePopup = (e) => {
        e.preventDefault();
        setSelectedImage(null);
    }

    // if (selectedImage) {
    //     return (
    //         <div>
    //             <MetadataViewContainer imageFileName={selectedImage} />
    //             <button onClick={() => setSelectedImage(null)}>Back</button>
    //         </div>
    //     );
    // }

    // TODO: turn this into ImagesGrid presentational component
    return (
        <div>
            <h1>Images</h1>
            <p>Click on an image to view its metadata, or its hyperlink to download a copy with no exif data</p>
            <div className="image-grid">
                {extractedFiles.map((file, index) => {
                    if (file.type === 'image/jpeg') {
                    const imageUrl = URL.createObjectURL(new Blob([file.data], { type: file.type }));
                    return (
                        <div className="grid-item" key={index}>
                            <a href={imageUrl} download={file.filename}>
                                <div className="grid-img-container">
                                <img src={imageUrl} alt={file.filename} type="image/jpeg" onClick={handleTriggerSingleView} />
                                </div>
                                <h3 className='grid-img-title'>{file.filename}</h3>
                            </a>
                        </div>
                    );
                    }
                })}
            </div>
            <div>
                {zipBlobUrl && <a href={zipBlobUrl} download="images.zip">Download All</a>}
            </div>
            {selectedImage && <MetadataViewContainer imageFileName={selectedImage} onClose={handleClosePopup}/>}
            <button onClick={handleReturnToUpload}>Back</button>
        </div>
    );
}

export default ImagesContainer;