import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import '../css/styles.css';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [suggestedFriends, setSuggestedFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch current user's data
                const userResponse = await axios.get("http://localhost:5000/api/auth/me", { 
                    withCredentials: true 
                });
                setCurrentUser(userResponse.data);

                // Fetch suggested friends
                const friendsResponse = await axios.get(
                    "http://localhost:5000/api/auth/suggested-friends", 
                    { withCredentials: true }
                );
                console.log("Suggested friends data:", friendsResponse.data); // Debugging
                setSuggestedFriends(friendsResponse.data);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar handleLogout={handleLogout} currentUser={currentUser} />
            
            <div className="profile-container">
                {/* Profile Header */}
                <div className="profile-header">
                    <img 
                        src={currentUser?.profilePic ? `http://localhost:5000${currentUser.profilePic}` : '/default-profile.png'} 
                        alt="Profile"
                        className="profile-picture"
                        onError={(e) => e.target.src = '/default-profile.png'}
                    />
                    <div className="profile-info">
                        <h2>{currentUser?.name || "User"}</h2>
                        <p>{currentUser?.email || "No email"}</p>
                        <p>{currentUser?.bio || "No bio yet"}</p>
                    </div>
                </div>

                {/* Friend Suggestions Section */}
                <div className="friend-suggestions">
                    <h3>People You May Know</h3>
                    <div className="suggestions-grid">
                        {suggestedFriends.map(user => (
                            <div key={user._id} className="suggestion-card">
                                <img 
                                    src={user.profilePic ? `http://localhost:5000${user.profilePic}` : '/default-profile.png'} 
                                    alt={user.name}
                                    onError={(e) => e.target.src = '/default-profile.png'}
                                />
                                <div className="suggestion-info">
                                    <h4>{user.name}</h4>
                                    <p>5 mutual friends</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;