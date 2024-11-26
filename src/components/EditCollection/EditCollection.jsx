import { useEffect, useState } from "react";
import ManageCollectionImages from "../ManageCollectionImages/ManageCollectionImages";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditCollection = () => {
  const { id } = useParams();

  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    defaultImage: "",
  });

  // Fetch collections on mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:3000/collections", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCollections(response.data);
      } catch (error) {
        console.error("Error Fetching Collections:", error);
      }
    };

    fetchCollections();
  }, []); // Only run on initial render

  // Update form data when a collection is selected
  useEffect(() => {
    if (selectedCollection) {
      const collection = collections.find(
        (c) => c.id === parseInt(selectedCollection)
      );
      if (collection) {
        setFormData({
          name: collection.name || "",
          description: collection.description || "",
          defaultImage: collection.defaultImage || "",
        });
      }
    }
  }, [selectedCollection, collections]);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit updated collection details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3000/admin/collections/${selectedCollection}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Collection updated successfully!");
    } catch (error) {
      console.error("Error updating collection:", error);
    }
  };

  return (
    <div>
      <h2>Edit Collection</h2>
      {/* Dropdown to select a collection */}
      <select
        onChange={(e) => setSelectedCollection(e.target.value)}
        value={selectedCollection || ""}
      >
        <option value="" disabled>
          Select a Collection
        </option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>

      {/* Form for editing collection details */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="defaultImage">Default Image URL</label>
          <input
            type="text"
            name="defaultImage"
            value={formData.defaultImage}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={!selectedCollection}>
          Update Collection
        </button>
      </form>

      {/* Manage images for the selected collection */}
      {selectedCollection && (
        <ManageCollectionImages collectionId={selectedCollection} />
      )}
    </div>
  );
};

export default EditCollection;
