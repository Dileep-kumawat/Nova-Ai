import { useState, useEffect } from 'react';
import '../styles/Register.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const Register = () => {
    const navigate = useNavigate();

    const { handleRegister } = useAuth();
    const { loading, error, user } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        terms: false
    });

    const [strength, setStrength] = useState({
        score: 0,
        label: 'Weak',
        color: '#ef4444' // red
    });

    // Calculate password strength whenever the password changes
    useEffect(() => {
        const val = formData.password;
        let score = 0;

        if (val.length > 5) score += 25;
        if (val.match(/[A-Z]/)) score += 25;
        if (val.match(/[0-9]/)) score += 25;
        if (val.match(/[^a-zA-Z0-9]/)) score += 25;

        let label = 'Weak';
        let color = '#ef4444'; // red

        if (score <= 25) {
            label = 'Weak';
            color = '#ef4444';
        } else if (score <= 50) {
            label = 'Fair';
            color = '#f97316'; // orange
        } else if (score <= 75) {
            label = 'Good';
            color = '#eab308'; // yellow
        } else {
            label = 'Strong';
            color = '#22c55e'; // green
        }

        setStrength({ score, label, color });
    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await handleRegister(formData);

        if (result?.success) {
            navigate('/dashboard');
        }
    };

    if (!loading && user) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="register-page">
            <main className="register-container">

                {/* Left Side Visual Panel */}
                <section className="visual-panel">
                    <div className="decorative-blur-top"></div>
                    <div className="decorative-blur-bottom"></div>

                    <div className="visual-content">
                        <div className="animate-float">
                            {/* Replace src with your actual illustration/image */}
                            <img
                                alt="AI Illustration"
                                className="visual-img"
                                src="register-logo.jpg"
                            />
                        </div>
                        <h2 className="visual-title">Unlock the Future of Search</h2>
                        <p className="visual-desc">
                            Join thousands of researchers and creators using our neural-engine to find exactly what they need in seconds.
                        </p>
                    </div>

                    <div className="grid-overlay"></div>
                </section>

                {/* Right Side Form Panel */}
                <section className="form-panel">
                    <div className="form-header">
                        <h1 className="form-title">Create Account</h1>
                        <p className="form-subtitle">Start your journey with our AI-powered assistant.</p>
                    </div>

                    {/* Error Message Display (Matches Login style) */}
                    {error && (
                        <div className="error-message">
                            <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="register-form" onSubmit={handleSubmit}>

                        {/* Name Field */}
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                className="form-input"
                                id="fullName"
                                name="username"
                                placeholder="John Doe"
                                required
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
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

                        {/* Password Field */}
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

                            {/* Password Strength Indicator */}
                            {formData.password.length > 0 && (
                                <div className="strength-container">
                                    <div className="strength-track">
                                        <div
                                            className="strength-bar"
                                            style={{
                                                width: `${strength.score}%`,
                                                backgroundColor: strength.color
                                            }}
                                        ></div>
                                    </div>
                                    <p
                                        className="strength-text"
                                        style={{ color: strength.color }}
                                    >
                                        {strength.label}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            className="submit-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Free Account'}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="form-footer">
                        <p>
                            Already have an account?
                            <Link className="link-primary" to={'/login'}>Log in here</Link>
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Register;