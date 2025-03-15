import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "./styles";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/users", {withCredentials: true})
            .then(response => setUsers(response.data))
            .catch((error) => {
                if (error.response?.status === 401) {
                    alert("Unauthorized access! Please login first");
                } else {
                    alert("Error loading users");
                }
                navigate("/");
            });
    }, [navigate]);

    const handleLogout = async () => {
        await axios.post("http://localhost:5000/api/auth/logout", {}, {withCredentials: true});
        navigate("/");
    }

    return (
        <div style={styles.pageBackground}>
            <div style={styles.overlay}>
                <div style={styles.dash_container}>
                    
                    <h2 style={styles.heading}>User Lists</h2>
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.tableHeader}>Name</th>
                                    <th style={styles.tableHeader}>Email</th>
                                    <th style={styles.tableHeader}>Profile Picture</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td style={styles.tableCell}>{user.name}</td>
                                        <td style={styles.tableCell}>{user.email}</td>
                                        <td style={styles.tableCell}>{user.profilePic}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleLogout} style={styles.button}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;