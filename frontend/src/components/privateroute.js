// In PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        // Verify token with backend
        axios.get('http://localhost:5000/api/auth/users', { withCredentials: true })
            .then(() => setIsAuthenticated(true))
            .catch(() => {
                window.alert("Please log in first to access the dashboard!");
                setIsAuthenticated(false);
            });
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;