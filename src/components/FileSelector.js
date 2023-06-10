import React from 'react';
import allowedFileTypes from '../utility/fileTypes';


function FileSelector({ onDragEnter, onDragLeave, onDrop, onFileInputChange, onUploadClick, isDragging, fileButtonRef }) {
    return (
        <div
            id="file-upload-container"
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
    );
}

export default FileSelector;