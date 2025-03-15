import React, { useState, useEffect } from 'react'; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "./styles";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
        
        // Ensure Google Fonts link is added only once
        const googleFontsLink = document.createElement("link");
        googleFontsLink.rel = "stylesheet";
        googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
        document.head.appendChild(googleFontsLink);

        return () => {
            document.head.removeChild(googleFontsLink);
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", 
                { email, password }, 
                { withCredentials: true }
            );

            console.log('Login successful:', response.data);
            const confirmed = window.confirm("Login successful! Click OK to continue to dashboard.");
            if (confirmed) navigate("/dashboard");

        } catch (err) {
            console.error('Login error:', err);
            alert(err.response?.data?.error || "Login failed. Please try again.");
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.overlay}>
                <div style={{ 
                    ...styles.containerWrapper,  // New wrapper for flexibility
                    ...(isVisible ? styles.containerVisible : {}) 
                }}>
                    {/* Left: Secondary Container (Image/Info) */}
                    <div style={styles.secondaryContainer}>
                        <h2 style={styles.sideHeading}>Welcome Back!</h2>
                        <p style={styles.sideText}>Log in to continue and explore.</p>
                        {/* You can add an image/logo here */}
                    </div>

                    {/* Right: Login Form Container */}
                    <div style={styles.container}>
                        <h2 style={styles.heading}>Login</h2>
                        <form onSubmit={handleLogin} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email:</label>
                                <input 
                                    type="email" 
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Password:</label>
                                <input 
                                    type="password"
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Forgot Password Link */}
                            <div style={styles.forgotPasswordContainer}>
                                <a href="/forgot-password" style={styles.forgotPasswordLink}>
                                    Forgot Password?
                                </a>
                            </div>
                            {/* Remember Me Checkbox */}
                            <div style={styles.checkboxContainer}>
                                <input 
                                    type="checkbox" 
                                    id="rememberMe" 
                                    checked={rememberMe} 
                                    onChange={(e) => setRememberMe(e.target.checked)} 
                                    style={styles.checkbox}
                                />
                                <label htmlFor="rememberMe" style={styles.checkboxLabel}>Remember Me</label>
                            </div>
                            <button type="submit" style={styles.loginButton}>
                                Login
                            </button>
                            <hr style={styles.divider} />
                            <div style={styles.socialLoginContainer}>
                                <div style={styles.socialCircle}>
                                    <img src="https://img.icons8.com/?size=100&id=118489&format=png&color=000000" alt="Facebook" style={styles.socialIcon} />
                                </div>
                                <div style={styles.socialCircle}>
                                    <img src="https://img.icons8.com/?size=100&id=85795&format=png&color=000000" alt="Google" style={styles.socialIcon} />
                                </div>
                                <div style={styles.socialCircle}>
                                    <img src="https://img.icons8.com/?size=100&id=85141&format=png&color=000000" alt="LinkedIn" style={styles.socialIcon} />
                                </div>
                            </div>
                            <div style={styles.signUpContainer}>
                                <span>Don't have an account?</span>
                                <a href="/register" style={styles.signUpLink}>Sign Up</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
