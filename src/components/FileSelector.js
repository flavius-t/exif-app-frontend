import React from 'react';
import allowedFileTypes from '../utility/fileTypes';


function FileSelector({ onDragEnter, onDragLeave, onDrop, onFileInputChange, onUploadClick, isDragging, fileButtonRef, isProcessing }) {
    const processing_message = (
        <div>
            <p>Processing your images...this may take a few seconds</p>
            <p>Please do not refresh your browser</p>
        </div>
    )

    const upload_area = (
        <div id='upload-container'>
            <div
            id="file-upload-drag-area"
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
            <p>
                <strong>Supported file types:</strong> {allowedFileTypes.join(', ')}
            </p>
            <div id='welcome-text'>
                <h3>What is EXIF data?</h3>
                <p>
                    EXIF data is metadata that is automatically added to image files by digital cameras and smartphones.
                    This data can include the date and time the photo was taken, the camera settings used, and even the
                    location where the photo was taken. This data can be useful, if for example you are a photographer, but it can also be a privacy concern.
                    You may not want to share such information with others.
                </p>
                <h3>What does this tool do?</h3>
                <p>
                    This tool allows you to upload images and download copies of those images with the EXIF data removed.
                    It also allows you to view the extracted EXIF data for each image, and download it as well.
                </p>
                <h3>Why Remove Exif Data?</h3>
                <p>
                    There are many reasons why you might want to remove EXIF data from your images. As previously mentioned
                    you may be concerned about privacy. However, another benefit of removing EXIF data is that it can significantly reduce
                    image file size. For example, a 5MB image can be reduced to 1MB or less by removing EXIF data, without affecting image quality.
                    This may not be in your interest if you wish to preserve the EXIF data, but if you are just sharing images online, or don't plan on using the EXIF data
                    for photography purposes, it can be a great way to reduce file size and save memory.
                </p>
            </div>
        </div>    
    )

    return (
        <div id="file-upload-container">
            { isProcessing && processing_message}
            { !isProcessing && upload_area}
        </div>
    );
}

export default FileSelector;