import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from '../js/darkMode';
import Navbar from './navbar'; // Make sure this path is correct
import '../css/styles.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]); // Fixed: Added state variable name
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch current user's data
        axios.get("http://localhost:5000/api/auth/me", { withCredentials: true })
            .then(response => setCurrentUser(response.data))
            .catch(error => {
                console.error("Error loading current user:", error);
            });

        // Fetch all users
        axios.get("http://localhost:5000/api/auth/users", { withCredentials: true })
            .then(response => setUsers(response.data))
            .catch(error => {
                if (error.response?.status === 401) {
                    alert("Unauthorized access! Please login first");
                    navigate("/");
                } else {
                    console.error("Error loading users:", error);
                }
            });
    }, [navigate]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div>
            <Navbar handleLogout={handleLogout} currentUser={currentUser} />
            <StorySection currentUser={currentUser} />
            <PostCreator currentUser={currentUser} />
        </div>
    );
};

const PostCreator = ({ currentUser }) => {
    const [postText, setPostText] = useState("");

    const handlePost = () => {
        console.log("Post created:", postText);
    };

    return (
        <div className="post-creator">
            <div className="image-preview">
                {currentUser?.profilePic ? (
                    <img
                        src={`http://localhost:5000${currentUser.profilePic}`}
                        alt="Profile"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '../assets/pfp.png';
                        }}
                    />
                ) : (
                    <img className="default-profile-icon" alt="Default profile" />
                )}
            </div>
            <input
                className="captions"
                type="text"
                placeholder="What's on your mind"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
            />
            <button
                className="post-button"
                onClick={handlePost}
                disabled={!postText.trim()}
            >
                <span className="material-symbols-outlined">send</span>
            </button>
            <hr />
            <button onClick={handlePost}>
                <span className="material-symbols-outlined">video_call</span>Live Video
            </button>
            <button onClick={handlePost}>
                <span className="material-symbols-outlined">photo_library</span>Photo/Video
            </button>
            <button onClick={handlePost}>
                <span className="material-symbols-outlined">show_chart</span>Activity
            </button>
        </div>
    );
};

const StorySection = ({ currentUser }) => {
    return (
        <div className="story-section-container">
            <div className="stories-container" id="storiesContainer">
                <div className="story create-story">
                    <div className="story-profile-container">
                        {currentUser?.profilePic ? (
                            <img
                                src={`http://localhost:5000${currentUser.profilePic}`}
                                alt="Your profile"
                                className="story-user-profile"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/default-profile.png';
                                }}
                            />
                        ) : (
                            <div className="default-profile-icon"></div>
                        )}
                    </div>
                    <div className="story-add-icon">+</div>
                </div>
            </div>
            <div className="navs">
                <button id="prevStory">
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button id="nextStory">
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
            <div className="posts-container" id="postsContainer"></div>
        </div>
    );
};

export default Dashboard;