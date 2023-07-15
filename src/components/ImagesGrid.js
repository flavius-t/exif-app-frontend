import React from 'react';
import GridItem from './GridItem';

const ImagesGrid = ({ extractedFiles, handleTriggerSingleView }) => {
    return (
        <div className="image-grid">
            {extractedFiles.map((file, index) => {
                if (file.type === 'image/jpeg') {
                const imageUrl = URL.createObjectURL(new Blob([file.data], { type: file.type }));
                return (
                    <GridItem
                        imageUrl={imageUrl}
                        key={index}
                        file={file}
                        handleTriggerSingleView={handleTriggerSingleView}
                    />
                );
                }
            })}
        </div>
    )
}

export default ImagesGrid;