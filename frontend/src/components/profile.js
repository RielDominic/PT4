import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/users", { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(error => console.error("Error fetching profile:", error));
    }, []);

    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="profile-container">
            <h1>{user.name}'s Profile</h1>
            <img src={`http://localhost:5000${user.profilePic}`} alt="Profile" />
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default Profile;
