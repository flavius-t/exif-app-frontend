import React from 'react';

function FileSelector({ onFilesSelected, onFolderSelected }) {
    return (
        <div>
            <label htmlFor="file-input" className="input-label">
                Select Files
            </label>
            <input id="file-input" type="file" multiple onChange={onFilesSelected} />
            <input id="folder-input" type="file" directory="" webkitdirectory="" onChange={onFolderSelected} /> 
        </div>
    );
}

export default FileSelector;