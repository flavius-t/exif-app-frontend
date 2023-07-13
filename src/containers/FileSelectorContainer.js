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
    const [requestId, setRequestId] = useState(null);

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

    // Navigate to images page only once request id has been set (useState is async)
    useEffect(
        () => {
            // ignore empty request id during initial render
            if (!requestId) {
                return;
            }
            console.log('request id changed', requestId)
            navigate(`/images/${requestId}`);
        },
        [requestId]
    )

    const fileButton = useRef(null);
    const navigate = useNavigate();
    const { updateFiles, setZipBlob } = useContext(FilesContext);

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

    const getRequestId = (headers) => {
        for (let entry of headers.entries()) {
            if (entry[0] === 'x-request-id') {
                setRequestId(entry[1]);
            }
        }
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
                getRequestId(response.headers);
                return response.blob()
            })
            .then(blob => {
                setZipBlob(blob);
                unzipBlob(blob)
                    .then(extracted => {
                        updateFiles(extracted);
                    })
                    .catch(error => {
                        console.error(error);
                });

                setIsProcessing(false);

                console.log('request id at nav time', requestId)
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
