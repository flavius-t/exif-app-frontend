import React, { useContext, useState, useEffect } from 'react';
import FilesContext from "../context/FilesContext";
import Metadata from '../components/Metadata';

function readBlobAsJson(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            try {
                const jsonData = JSON.parse(reader.result);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read the Blob as JSON.'));
        };

        reader.readAsText(blob);
    });
}

export default function MetadataContainer({ imageFileName, onClose }) {
    const { extractedFiles } = useContext(FilesContext);
    const [metaFile, setMetaFile] = useState(null);
    const [metaUrl, setMetaUrl] = useState(null);
    const [parsedData, setParsedData] = useState({});

    useEffect(() => {
        try {
            const metaFileName = imageFileName.replace('.jpg', '_meta.json');
            const metaFile = extractedFiles.find(
                (file) => file.filename === metaFileName
            );

            if (!metaFile) {
                setMetaUrl(null);
                setMetaFile(null);
                return <div>Metadata not found</div>;
            }

            const metaUrl = URL.createObjectURL(new Blob([metaFile.data], { type: metaFile.type }));
            setMetaUrl(metaUrl);
            setMetaFile(metaFile);

            readBlobAsJson(metaFile.data).then((jsonData) => {
                setParsedData(jsonData);
            });

        } catch (error) {
            console.log(error);
        }

    }, [extractedFiles, imageFileName]);

    return (
        <Metadata
            metaFile={metaFile}
            metaUrl={metaUrl}
            parsedData={parsedData}
            imageFileName={imageFileName}
            onClose={onClose} />
    )
}