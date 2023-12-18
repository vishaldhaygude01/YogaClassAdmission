import React, { useState } from 'react';
import AuthService from './services/AuthService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        AuthService.login(email, password)
            .then(() => {
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <label>Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
