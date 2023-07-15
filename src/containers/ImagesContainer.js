import React, { useContext, useEffect, useState } from "react";
import FilesContext from "../utility/FilesContext";
// import "../styles/ImagesContainer.css";
import { useNavigate } from "react-router-dom";
import Images from "../components/Images";


function ImagesContainer() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [zipBlobUrl, setZipBlobUrl] = useState(null);
    const { extractedFiles, zipBlob } = useContext(FilesContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (extractedFiles.length === 0) {
            return;
        }
    }, [extractedFiles]);

    useEffect(() => {
        if (zipBlob) {
            setZipBlobUrl(URL.createObjectURL(zipBlob));
        }
    }, [zipBlob]);

    const handleTriggerSingleView = (e) => {
        e.preventDefault();
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

    return (
        <Images
            extractedFiles={extractedFiles}
            handleTriggerSingleView={handleTriggerSingleView}
            zipBlobUrl={zipBlobUrl}
            selectedImage={selectedImage}
            handleReturnToUpload={handleReturnToUpload}
            handleClosePopup={handleClosePopup}
        />
    );
}

export default ImagesContainer;