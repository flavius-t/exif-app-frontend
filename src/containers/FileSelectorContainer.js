import React, { useState } from 'react';
import FileSelector from '../components/FileSelector';

function FileSelectorContainer({ onFilesSelected }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFilesSelected = (e) => {
        e.preventDefault();
        onFilesSelected(e.target.files);
    }

    return (
        <FileSelector onFilesSelected={handleFilesSelected} />
    );
}

export default FileSelectorContainer;