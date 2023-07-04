import React, { useContext, useState, useEffect } from 'react';
import FilesContext from "../utility/FilesContext";

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

export default function MetadataViewContainer({ imageFileName }) {
    const { extractedFiles } = useContext(FilesContext);
    const [parsedData, setParsedData] = useState({});
    
    useEffect(() => {
        try {
            const metaFileName = imageFileName.replace('.jpg', '_meta.json');
            console.log(metaFileName);

            const metaFile = extractedFiles.find(
                (file) => file.filename === metaFileName
            );

            console.log(metaFile);

            if (!metaFile) {
                return <div>Metadata not found</div>;
            }

            readBlobAsJson(metaFile.data).then((jsonData) => {
                console.log(jsonData);
                setParsedData(jsonData);
            });

        } catch (error) {
            console.log(error);
        }
        
    }, [extractedFiles, imageFileName]);

    return (
        <div id='metadata-container'>
            <h1>Metadata</h1>
            <div id='metadata'>
                <p>Format: {parsedData.format}</p>
                <p>Mode: {parsedData.mode}</p>
                <p>Size: {parsedData.size}</p>
                {parsedData.exif && Object.entries(parsedData.exif).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </div>
        </div>
    )
}