import React, {useEffect, useState} from 'react'
import axios from 'axios'
import AdminInventoryItem from '../AdminInventoryItem/AdminInventoryItem'


export default function AdminInventoryList() {
    const [inventory, setInventory] =useState([])

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const token = localStorage.getItem('authToken'); 
                const response = await axios.get('http://localhost:3000/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInventory(response.data)
            } catch (error) {
                console.error('Error fetching inventory:', error)
            }
        }
        fetchInventory();
    }, [])
  return (
    <div>
    <p>Admin Inventory List </p>

    {inventory.map((item) => (
        <AdminInventoryItem key={item.id} item={item}/>
    ) )}
    </div>
  )
}
