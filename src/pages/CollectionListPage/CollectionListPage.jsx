import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CollectionsListPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:3000/collections');
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div>
      <h1>Collections</h1>
      <div>
        {collections.length > 0 ? (
          collections.map(collection => (
            <div key={collection.id}>
              <h2>{collection.name}</h2>
              <p>{collection.description}</p>
              <Link to={`/collection/${collection.id}`}>View Collection</Link>
            </div>
          ))
        ) : (
          <p>No collections found.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionsListPage;
