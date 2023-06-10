import React, { useState, useRef } from 'react';
import FileSelector from '../components/FileSelector';
import allowedFileTypes from '../utility/fileTypes';


const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const fileButton = useRef(null);

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

    const areFilesAllowed = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (!allowedFileTypes.includes(files[i].type)) {
                return false;
            }
        }
        return true;
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (!areFilesAllowed(e.dataTransfer.files)) {
            alert('Only image files are allowed!');
            return;
        }

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
        fileButton.current.click();
    };

    return (
        <FileSelector
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileInputChange={handleFileInputChange}
            onUploadClick={handleUploadButtonClick}
            isDragging={isDragging}
            fileButtonRef = {fileButton}
        />
    );
};

export default FileUpload;
