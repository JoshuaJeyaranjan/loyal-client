import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCollectionImages = ({ collectionId }) => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    // Fetch images for the collection
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`http://localhost:3000/admin/collections/${collectionId}/images`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [collectionId]);

    // Handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(
                `http://localhost:3000/admin/collections/${collectionId}/images`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setImages([...images, response.data]); // Add the new image to the list
            setSelectedFile(null); // Clear the file input
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // Handle image removal
    const handleRemove = async (imageId) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:3000/admin/collections/images/${imageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setImages(images.filter((img) => img.id !== imageId)); // Remove the image from the list
        } catch (error) {
            console.error('Error removing image:', error);
        }
    };

    return (
        <div>
            <h3>Manage Collection Images</h3>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Image</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {images.map((image) => (
                    <div key={image.id} style={{ position: 'relative' }}>
                        <img
                            src={`http://localhost:3000/${image.path}`}
                            alt="Collection"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <button
                            onClick={() => handleRemove(image.id)}
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCollectionImages;
