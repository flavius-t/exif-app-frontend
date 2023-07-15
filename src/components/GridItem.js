import React from 'react';

const GridItem = ({ imageUrl, index, file, handleTriggerSingleView }) => {
    return (
        <div className="grid-item" key={index}>
            <a href={imageUrl} download={file.filename}>
                <div className="grid-img-container">
                    <img src={imageUrl} alt={file.filename} type="image/jpeg" onClick={handleTriggerSingleView} />
                </div>
                <h3 className='grid-img-title'>{file.filename}</h3>
            </a>
        </div>
    )
}

export default GridItem;