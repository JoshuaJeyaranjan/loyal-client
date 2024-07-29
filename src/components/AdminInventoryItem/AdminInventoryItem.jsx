import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AdminInventoryItem( {item} ) {
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('authToken')
            await axios.delete(`http://localhost:3000/admin/inventory/${item.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        } catch (error) {
            console.error( 'Error Deleting Item:', error)            
        }
    }

    const handleEdit = () => {
        navigate(`/admin/edit-inventory/${item.id}`)
    }
  return (
    <div>
        <p>Name: {item.name}  </p>
        <p> Description: {item.description} </p>
        <p> Regular Price: {item.regular_price} </p>
        <p> Sale Price: {item.sale_price} </p>
        <button onClick={handleEdit} > Edit </button>
        
        <button onClick={handleDelete}> Delete</button>
    </div>
  )
}
