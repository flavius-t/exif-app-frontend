import React from 'react';

const Metadata = ({ metaFile, metaUrl, parsedData, imageFileName, onClose }) => {
    return (
        <div className='popup-overlay'>
            <div className='popup-content'>
                <div className='popup-close'>
                    <button id='popup-close-btn' onClick={onClose}>X</button>
                </div>
                <h1 id='popup-title'>{imageFileName}</h1>
                <table id='metadata-table'>
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
                {metaUrl &&
                    <div id='meta-download'>
                        <a href={metaUrl} download={metaFile.filename}>Download Metadata</a>
                    </div>
                }
            </div>
        </div>
    );
};

export default Metadata;