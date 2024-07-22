import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.scss';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const signupEndpoint = "http://localhost:3000/signup";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      username,
      password,
      email,
      emailNotifications,
    };

    try {
      const response = await axios.post(signupEndpoint, formData);
      console.log('Response:', response);

      if (response.status === 201) {
        setEmail('');
        setUsername('');
        setEmailNotifications(false);
        setPassword('');
      } else {
        setErrorMessage("Signup failed, check details");
        console.log(errorMessage);
      }
    } catch (error) {
      setErrorMessage('Signup failed, post request error');
      console.log(error);
    }
  };

  return (
    <>
      <div>SignupPage</div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            placeholder="Your username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          <input
            type="text"
            name="email"
            placeholder="Your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          <input
            type="text"
            name="password"
            placeholder="Your password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label htmlFor="email-notifications-approved">
          <input
            type="radio"
            id="notifications-approved"
            name="notifications-approved"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
          <p>'I would love to get valuable knowledge sent directly to my inbox '</p>
        </label>

        <label htmlFor="submit">
          <input type="submit" name="submit" id="submit" />
        </label>
      </form>
    </>
  );
}
