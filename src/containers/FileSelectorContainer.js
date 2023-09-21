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

    // submit files to server once files state has been set (useState is async)
    useEffect(
        () => {
            // ignore empty array during initial render
            if (files.length === 0) {
                return;
            }
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
        /**
         * 
         * @description Processes drag enter events for drop box area
         * @param {Event} e - drag enter event
         * @return {void}
         * 
        */
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        /**
         * 
         * @description Processes drag leave events for drop box area
         * @param {Event} e - drag leave event
         * @return {void}
         * 
         */
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
        /**
         * 
         * @description Extracts request id from response headers
         * @param {Headers} headers - response headers
         * @return {void}
         * 
         */
        for (let entry of headers.entries()) {
            if (entry[0] === 'x-request-id') {
                setRequestId(entry[1]);
            }
        }
    }

    const submitFilesToServer = async () => {
        /**
         * 
         * @description Submits uploaded files to server for processing
         * @return {void}
         * 
         */
        setIsProcessing(true);

        let zip_blob = null;

        try {
            zip_blob = await zipFiles(files);
        }
        catch (error) {
            console.error(error);
            toastError('Error zipping files: ' + error.message);
            setIsProcessing(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', zip_blob, 'images.zip');

        const csrf_token = document.cookie.split(';')[0].split('=')[1];
        
        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: {
                'X-CSRF-TOKEN': csrf_token
            }
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    response.text().then(text => {
                        toastError(text);
                    });
                    throw new Error('Network response was not ok');
                }
                toastSuccess("Files uploaded successfully.");
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
                console.log(error);
                setIsProcessing(false);
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