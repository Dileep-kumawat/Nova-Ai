import { useState } from 'react';
import '../styles/Login.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { handleLogin } = useAuth();
    const { loading, error, user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await handleLogin(formData);

        if (result?.success) {
            navigate('/dashboard');
        }
    };

    if (!loading && user) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <div className="login-page">
            {/* Background Ambient Glow */}
            <div className="bg-glow"></div>

            <main className="login-container">
                {/* Glassmorphic Card */}
                <div className="glass-card">

                    {/* Brand/Header Section */}
                    <div className="header-section">
                        <div className="icon-wrapper">
                            <svg
                                className="brand-icon"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                            </svg>
                        </div>
                        <h1 className="header-title">Welcome back</h1>
                        <p className="header-subtitle">Sign in to your AI search assistant</p>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div className="error-message">
                            <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                className="form-input"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="form-input"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            className="submit-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Card Footer Info */}
                    <div className="card-footer">
                        <span>Don't have an account?</span>
                        <Link className="link-primary" to="/register">Create one for free</Link>
                    </div>
                </div>

                {/* Legal/Footer */}
                <div className="page-footer">
                    <a href="#">Terms of Service</a>
                    <span className="separator">•</span>
                    <a href="#">Privacy Policy</a>
                </div>
            </main>
        </div>
    );
};

export default Login;