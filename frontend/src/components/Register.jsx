import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'staff',
  });

  const { username, password, role } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { username, password, role });
      setToken(res.data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={onChange}
        required
      />
      <select name="role" value={role} onChange={onChange}>
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
