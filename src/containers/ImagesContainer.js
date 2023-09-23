import React, { useEffect, useState } from "react";
import useFiles from "../hooks/useFiles";
import { useNavigate } from "react-router-dom";
import Images from "../components/Images";


function ImagesContainer() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [zipBlobUrl, setZipBlobUrl] = useState(null);
    const { extractedFiles, zipBlob } = useFiles();

    const navigate = useNavigate();

    useEffect(() => {
        if (extractedFiles.length === 0) {
            return;
        }
    }, [extractedFiles]);

    useEffect(() => {
        if (zipBlob && zipBlob.blob) {
            setZipBlobUrl(window.URL.createObjectURL(zipBlob.blob));
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