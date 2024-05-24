import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Login = ({ status, setStatus }) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        axios.post('http://localhost:1000/get-started/login', {
            userName: user,
            password: password,
        })
        .then((res) => {
            setLoading(false);
            if (res.status === 200 && res.data.status === 'success') {
                localStorage.setItem('token', res.data.token);
                setStatus(true);
                navigate('/');
            } else {
                setError(res.data.msg || 'Login failed');
            }
        })
        .catch((err) => {
            setLoading(false);
            setError('Error in login');
        });
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow" style={{ width: '20rem' }}>
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">UserName</label>
                        <input
                            type="text"
                            className="form-control"
                            id="user"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
