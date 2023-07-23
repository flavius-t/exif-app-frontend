import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FileSelector from '../components/FileSelector';
import allowedFileTypes from '../utility/fileTypes';
import { zipFiles, unzipBlob } from '../utility/zip';
import FilesContext from '../utility/FilesContext';
import { toastError, toastSuccess } from '../utility/customToasts';


const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [requestId, setRequestId] = useState(null);

    const fileButton = useRef(null); // ref to hidden file input button for drag area click events
    const navigate = useNavigate();
    const { updateFiles, setZipBlob } = useContext(FilesContext);

    useEffect(
        () => {
            // ignore empty array during initial render
            if (files.length === 0) {
                return;
            }
            toastSuccess("Files uploaded successfully.");
            submitFilesToServer();
        },
        [files]
    );

    // navigate to images page only once requestId has been set (useState is async)
    useEffect(
        () => {
            // ignore null requestId during initial render
            if (!requestId) {
                return;
            }
            navigate(`/images/${requestId}`);
        },
        [requestId]
    )

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const areFilesAllowed = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].type === '') {
                toastError('Directories not allowed. Please select supported image file types only.');
                return false;
            }

            if (!allowedFileTypes.includes(files[i].type)) {
                toastError(`File type '${files[i].type}' not allowed. Please select supported image file types only.`);
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
            })
            .catch(error => {
                // Handle errors
                console.log(error);
        });
    };

    const handleDrop = (e) => {
        /**
         *
         * @description Process file drop events
         * @param {Event} e - drop event
         * @return {void}
         * 
        */
        e.preventDefault();
        setIsDragging(false);

        if (!areFilesAllowed(e.dataTransfer.files)) {
            return;
        }

        // setFiles is async, use useEffect to submit files
        setFiles(e.dataTransfer.files);
    };

    const handleFileInputChange = (e) => {
        /**
         * 
         * @description Process file selection events
         * @param {Event} e - file input change event
         * @return {void}
         * 
        */

        if (!areFilesAllowed(e.target.files)) {
            return;
        }

        // setFiles is async, use useEffect to submit files
        setFiles(e.target.files);
    };
    
    const handleUploadButtonClick = () => {
        /**
         * 
         * @description Handles clicking hidden input button when user clicks on upload area.
         * @return {void}
         */
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