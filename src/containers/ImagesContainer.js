import React from "react";
import { useParams, useLocation } from "react-router-dom";

function ImagesContainer(props) {
    const { request_id } = useParams();
    const location = useLocation();
    const { processedImages } = location.state;

    return (
        <div>
            <h1>Images</h1>
            <p>Request ID: {request_id}</p>
            <div className="image-grid">
                {processedImages.map(
                    (image, index) => {
                        return (
                            <div key={index}>
                                <p>{image}</p>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default ImagesContainer;