import React, { useState } from "react";
import axios from "axios";
import './UploadImages.scss'

const UploadImages = ({ collectionId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]); // "images" matches backend field
    }
    formData.append("collectionId", collectionId);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post("http://localhost:3000/aws/upload-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };

  return (
    <div>
      <h3>Upload Images in Batches</h3>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
};

export default UploadImages;
