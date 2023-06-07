import React, { useState } from 'react';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
    };

    const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
    };

    const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // TODO: allow only image files

    setFiles(e.dataTransfer.files);
    // Process the dropped files -- setFiles is async, useEffect to handle files
    console.log(e.dataTransfer.files)
    console.log(files);
    };

    const handleFileInputChange = (e) => {
        setFiles(e.target.files);
        // Process the selected files -- setFiles is async, useEffect to handle files
        console.log(e.target.files);
        console.log(files);
    };
    
    const handleUploadButtonClick = () => {
        document.getElementById('input-file-upload').click();
    };

    return (
        <div
            id="file-upload-container"
            className={isDragging ? 'drag-active' : ''}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter} // Needed for drop events to work
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadButtonClick}
        >
            <p>Drag and drop files here or click to select</p>
            <input
                type="file"
                id="input-file-upload"
                accept="image/jpg, image/jpeg, image/png"
                multiple={true}
                onChange={handleFileInputChange}
            />
        </div>
    );
};

export default FileUpload;
