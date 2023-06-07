import React from 'react';

function FileSelector({ onFilesSelected, onDrag, dragActive }) {
    return (
        <form id="form-file-upload" onDragEnter={onDrag} onDragLeave={onDrag} onSubmit={(e) => e.preventDefault()}>
            {dragActive? <div className="drag-active-overlay" onDragEnter={onDrag} onDragLeave={onDrag} onDragOver={onDrag}></div>: null}
            <input id="input-file-upload" type="file" accept="image/jpg, image/jpeg, image/png" multiple onChange={onFilesSelected} />
            <label htmlFor="input-file-upload" id="label-file-upload"  className={dragActive? "drag-active": ""}>
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