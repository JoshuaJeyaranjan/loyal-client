import React from 'react';

const UserItem = ({ user }) => {
  return (
    <div>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserItem;
