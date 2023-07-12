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
            <div className='about-text'>
                <h3>What is EXIF data?</h3>
                <p>
                    EXIF data is metadata that is automatically added to image files by digital cameras and smartphones.
                    This data can include the date and time the photo was taken, the camera settings used, and even the
                    location where the photo was taken. This data can be useful, for example for photography editing, but it can also be a privacy concern.
                    You may not wish to share such information with others over the internet.
                </p>
                <h3>What Does This Application Do?</h3>
                <p>
                    This application allows you to upload images and download copies of those images with the EXIF data removed.
                    It also allows you to view the extracted EXIF data for each image, and download it as well.
                </p>
                <h3>Why Remove Exif Data?</h3>
                    <ul>
                        <li>
                            <p>
                                <strong>Privacy</strong> - EXIF data can contain sensitive information.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>File Size</strong> - Removing EXIF data can significantly reduce image file size.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Copyright</strong> - Professional photographers may wish to remove EXIF data for copyright reasons.
                            </p>
                        </li>
                    </ul>
                <h3>Privacy</h3>
                    <p>
                        This application temporarily stores your images on a server for processing.
                        Your images are deleted from the server immediately after processing is complete.
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