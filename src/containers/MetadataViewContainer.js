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
            <table id='meta-table'>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Format</td>
                        <td>{parsedData.format}</td>
                    </tr>
                    <tr>
                        <td>Mode</td>
                        <td>{parsedData.mode}</td>
                    </tr>
                    <tr>
                        <td>Size</td>
                        <td>{parsedData.size}</td>
                    </tr>
                    {parsedData.exif && Object.entries(parsedData.exif).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}