import React, { useState } from 'react';
import { authService } from '../../services/authService';

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
    
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(
        formData.username, 
        formData.email, 
        formData.password, 
        
      );
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      {error && <div className="error">{JSON.stringify(error)}</div>}
      {success && (
        <div className="success">
          Registro exitoso. Por favor revisa tu correo para verificación.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
        className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

