import React from 'react';

function FileSelector({ onFilesSelected }) {
    return (
        <form id="form-file-upload">
            <input id="input-file-upload" type="file" accept="image/jpg, image/jpeg, image/png" multiple onChange={onFilesSelected} />
            <label htmlFor="input-file-upload" id="label-file-upload">
                <div>
                    <p>
                        Drag and drop your images here or click to select images.
                    </p>
                    <button className="upload-button">Upload Files</button>
                </div>
            </label>
        </form>
    );
}

export default FileSelector;