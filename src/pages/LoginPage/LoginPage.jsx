import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';
import axios from 'axios';

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginEndpoint = "http://localhost:3000/signup/login";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(loginEndpoint, {
        email: event.target.email.value,
        password: event.target.password.value
      });

      sessionStorage.setItem("token", response.data.token);
      navigate('/');
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <>
      <div>LoginPage</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input type="text" name="email" placeholder="Your email" />
        </label>
        <label htmlFor="password">
          <input type="text" name="password" placeholder="Your password" />
        </label>
        <label htmlFor="submit">
          <input type="submit" name="submit" />
        </label>
      </form>
      {error && <div className="error">{error}</div>}
    </>
  );
}
