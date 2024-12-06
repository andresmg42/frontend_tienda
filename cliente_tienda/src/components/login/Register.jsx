import React, { useState } from 'react';
import { authService } from '../../services/authService';

export function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''

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

        if(formData.password!=formData.confirmPassword){
            setError('las contraseñas no coinciden')
            setSuccess(false);
            return;
        }
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
        <div className='max-w-xl mx-auto mt-10' >
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

                <input
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button className='bg-indigo-500 p-3 rounded-lg w-48 mt-3 hover:bg-indigo-700
        hover:cursor-pointer' type="submit">Registrarse</button>
            </form>
        </div>
    );
}

