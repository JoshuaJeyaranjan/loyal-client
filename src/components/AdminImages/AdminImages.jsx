import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminImages = () => {
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  // Fetch all images, products, and collections on component mount
  useEffect(() => {
    // Fetch images
    axios.get("http://localhost:3000/aws/images")
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));

    // Fetch products
    axios.get("http://localhost:3000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch collections
    axios.get("http://localhost:3000/collections")
      .then((response) => setCollections(response.data))
      .catch((error) => console.error("Error fetching collections:", error));
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (imageId) => {
    setSelectedImageIds((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  // Associate images with a product
  const associateWithProduct = () => {
    if (!selectedProductId) return alert("Please select a product");

    axios.post(`http://localhost:3000/aws/products/${selectedProductId}/images`, { imageIds: selectedImageIds })
      .then(() => {
        alert("Images associated with product successfully!");
        setSelectedImageIds([]);
      })
      .catch((error) => console.error("Error associating images with product:", error));
  };

  // Associate images with a collection
  const associateWithCollection = () => {
    if (!selectedCollectionId) return alert("Please select a collection");

    axios.post(`http://localhost:3000/aws/collections/${selectedCollectionId}/images`, { imageIds: selectedImageIds })
      .then(() => {
        alert("Images associated with collection successfully!");
        setSelectedImageIds([]);
      })
      .catch((error) => console.error("Error associating images with collection:", error));
  };

  return (
    <div>
      <h2>Admin Image Management</h2>

      <div>
        <h3>Available Images</h3>
        <ul>
          {images.map((image) => (
            <li key={image.id}>
              <input
                type="checkbox"
                checked={selectedImageIds.includes(image.id)}
                onChange={() => handleCheckboxChange(image.id)}
              />
              <img src={image.image_url} alt={image.name} width="100" />
              <span>{image.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Associate Images with Product</h3>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <button onClick={associateWithProduct}>Associate with Product</button>
      </div>

      <div>
        <h3>Associate Images with Collection</h3>
        <select
          value={selectedCollectionId}
          onChange={(e) => setSelectedCollectionId(e.target.value)}
        >
          <option value="">Select a Collection</option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
        <button onClick={associateWithCollection}>Associate with Collection</button>
      </div>
    </div>
  );
};

export default AdminImages;
