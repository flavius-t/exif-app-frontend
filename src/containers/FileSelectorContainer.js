import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FileSelector from '../components/FileSelector';
import allowedFileTypes from '../utility/fileTypes';
import { zipFiles, unzipBlob } from '../utility/zip';
import FilesContext from '../utility/FilesContext';


const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(
        () => {
            // ignore empty files array during initial render
            if (files.length === 0) {
                return;
            }
            console.log('files changed: submitting files to server');
            console.log(files);
            submitFilesToServer();
        },
        [files]
    );

    const fileButton = useRef(null);
    const navigate = useNavigate();
    const { updateFiles } = useContext(FilesContext);

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

    const submitFilesToServer = async () => {
        setIsProcessing(true);

        // TODO: error handling
        const zip_blob = await zipFiles(files);

        const formData = new FormData();
        formData.append('file', zip_blob, 'images.zip');
        
        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                return response.blob()
            })
            .then(blob => {
                unzipBlob(blob)
                    .then(extracted => {
                        updateFiles(extracted);
                    })
                    .catch(error => {
                        console.error(error);
                });

                setIsProcessing(false);

                // TODO: get request id from response
                const request_id = "avadfadfadfdas" 
                navigate(`/images/${request_id}`);
            })
            .catch(error => {
                // Handle errors
                console.log(error);
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
            isProcessing={isProcessing}
        />
    );
};

export default FileUpload;
