import React from 'react';

function FileSelector({ onFilesSelected, onFolderSelected }) {
    return (
        <div>
            <input type="file" accept="image/jpg, image/jpeg, image/png" multiple onChange={onFilesSelected} />
        </div>
    );
}

export default FileSelector;