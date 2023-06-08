import React from 'react';

function FileSelector({ onDragEnter, onDragLeave, onDrop, onFileInputChange, onUploadClick, isDragging }) {
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
                accept="image/jpg, image/jpeg, image/png"
                multiple={true}
                onChange={onFileInputChange}
            />
        </div>
    );
}

export default FileSelector;