import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "../css/styles";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);

        const googleFontsLink = document.createElement("link");
        googleFontsLink.rel = "stylesheet";
        googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
        document.head.appendChild(googleFontsLink);

        return () => {
            document.head.removeChild(googleFontsLink);
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!"); 
            return;
        }

        setError(""); // Clear previous errors

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (profilePic) {
            formData.append("profilePic", profilePic);
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Registration successful! Please login.");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div style={styles.pageBackground}>
            <div style={styles.overlay}>
                <div style={{
                    ...styles.containerWrapper,
                    ...(isVisible ? styles.containerVisible : {})
                }}>
                    {/* Left: Secondary Container */}
                    <div style={styles.secondaryContainer}>
                        <h2 style={styles.sideHeading}>Join us today!</h2>
                        <p style={styles.sideText}>Create an account and unlock amazing features.</p>
                    </div>

                    {/* Right: Register Form Container */}
                    <div style={styles.container}>
                        <h2 style={styles.heading}>Register</h2>
                        <form onSubmit={handleRegister} style={styles.form}>
                            {/* Profile Picture Picker */}
                            <div style={styles.profilePicContainer}>
                                <label htmlFor="profilePicInput" style={styles.profilePicLabel}>
                                    <div style={styles.profilePicCircle}>
                                        {preview ? (
                                            <img src={preview} alt="Profile Preview" style={styles.profilePic} />
                                        ) : (
                                            <span style={styles.profilePicPlaceholder}>+</span>
                                        )}
                                    </div>
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    id="profilePicInput"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                            {/* Name Field */}
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Name:</label>
                                <input
                                    type="text"
                                    style={styles.input}
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Email Field */}
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

                            {/* Password Field */}
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

                            {/* Confirm Password Field */}
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Confirm Password:</label>
                                <input
                                    type="password"
                                    style={styles.input}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {/* Submit Button */}
                            <button type="submit" style={styles.registerButton}>Register</button>

                            {/* Already have an account? Login Link */}
                            <div style={styles.signUpContainer}>
                                <span>Already have an account?</span>
                                <a href="/" style={styles.signUpLink}>Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
