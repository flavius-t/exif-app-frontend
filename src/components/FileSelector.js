import React from 'react';
import allowedFileTypes from '../utility/fileTypes';


function FileSelector({ onDragEnter, onDragLeave, onDrop, onFileInputChange, onUploadClick, isDragging, fileButtonRef, isProcessing }) {
    const processing_message = (
        <div>
            <p>Processing your images...this may take a few seconds</p>
            <p>Please do not refresh your browser</p>
        </div>
    )

    const upload_area = (
        <div
            id="file-upload-drag-area"
            className={isDragging ? 'drag-active' : ''}
            onDragEnter={onDragEnter}
            onDragOver={onDragEnter} // Needed for drop events to work
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={onUploadClick}
        >
            <p>Drag and drop files here or click to select</p>
            <input
                type="file"
                id="input-file-upload"
                accept={allowedFileTypes.join(',')}
                multiple={true}
                onChange={onFileInputChange}
                ref = {fileButtonRef}
            />
        </div>
    )

    return (
        <div id="file-upload-container">
            { isProcessing && processing_message}
            { !isProcessing && upload_area}
        </div>
    );
}

export default FileSelector;