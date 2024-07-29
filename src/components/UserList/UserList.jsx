import React, {useEffect, useState} from 'react'
import axios from 'axios'
import UserItem from '../UserItem/UserItem'

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:3000/admin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setUsers(response.data)
            } catch(error) {
                console.log('Error Fetching User:s', error)
            }
        }
        fetchUsers();
    }, [])
  return (
    <div>
        <p>User List</p>
        {users.map((user) => (
            <UserItem key={user.id} user={user}/>
        ))}
    </div>
  )
}
