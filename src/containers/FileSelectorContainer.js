import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FileSelector from '../components/FileSelector';
import allowedFileTypes from '../utility/fileTypes';
import zipFiles from '../utility/zip';
import convertZipToBlob from '../utility/blob';


const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(
        () => {
            // ignore empty files array during initial render
            if (files.length === 0) {
                return;
            }
            console.log('files changed');
            console.log(files);
            handleSubmit();
        },
        [files]
    ); 

    const fileButton = useRef(null);

    const navigate = useNavigate();

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

    const handleSubmit = () => {
        const zip = zipFiles(files);
        const formData = new FormData();

        // TODO: clean this up
        convertZipToBlob(zip)
            .then(blob => {
                formData.append('file', blob, 'filename.zip');
                console.log('formData')
                for (const entry of formData.entries()) {
                    console.log('formData')
                    console.log(entry);
                }

                // ... send the FormData object to the server ...
                fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => response.text()) // TODO: change to json()
                    .then(data => {
                    // Handle response from backend
                    console.log(data);

                    // TODO: replace with actual request_id and images from backend
                    const request_id = "ah532sf";
                    const processedImages = ["img_1", "img_2", "img_3" , "img_4", "img_5", "img_6", "img_7", "img_8"];
                    navigate(`/images/${request_id}`, { state: { processedImages: processedImages } });
                    })
                    .catch(error => {
                    // Handle errors
                });
            })
            .catch(error => {
                // Handle any errors that occur during the conversion process
                console.error(error);
            });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (!areFilesAllowed(e.dataTransfer.files)) {
            alert('Only image files are allowed!');
            return;
        }

        // setFiles is async, use useEffect to submit files
        setFiles(e.dataTransfer.files);
    };

    const handleFileInputChange = (e) => {
        // setFiles is async, use useEffect to submit files
        setFiles(e.target.files);
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
