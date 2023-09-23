import React from 'react';
import ImagesGrid from './ImagesGrid';
import MetadataContainer from '../containers/MetadataContainer';

const Images = ({ extractedFiles, handleTriggerSingleView, zipBlobUrl, selectedImage, handleReturnToUpload, handleClosePopup }) => {
    return (
        <div className='images-container'>
            <h1>Images</h1>
            <p>Click on an image to view its metadata, or its hyperlink to download a copy with no exif data</p>
            <ImagesGrid
                extractedFiles={extractedFiles}
                handleTriggerSingleView={handleTriggerSingleView}
            />
            <div>
                {zipBlobUrl && <a href={zipBlobUrl} download="images.zip">Download All</a>}
            </div>
            {selectedImage && <MetadataContainer imageFileName={selectedImage} onClose={handleClosePopup}/>}
            <button onClick={handleReturnToUpload}>Back</button>
        </div>
    )
}

export default Images;