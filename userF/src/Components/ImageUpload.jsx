import React, { useState } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.filePath);
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={`http://localhost:3001${imageUrl}`} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
