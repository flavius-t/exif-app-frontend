import React, { useState } from 'react';
import FileSelector from '../components/FileSelector';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        console.log('drag enter')
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        console.log('drag leave')
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
        <FileSelector
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileInputChange={handleFileInputChange}
            onUploadClick={handleUploadButtonClick}
            isDragging={isDragging}
        />
    );
};

export default FileUpload;
