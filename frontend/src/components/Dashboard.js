import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from '../js/darkMode'; // Adjust the path as necessary
import '../css/styles.css'; // Ensure the path is correct

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
        e.preventDefault(); // Prevent default behavior of anchor tag
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div>
            <Navbar handleLogout={handleLogout} />
            <StorySection />
            <PostCreator />
        </div>
    );
};

const Navbar = ({ handleLogout }) => {
    const navigate = useNavigate(); // Add this inside Navbar
    return (
        <div className="navbar">
            <a href="/" className="logo">
                <img src="/logo.png" alt="FriendZone Logo" />
            </a>
            <div class="search-container">
                <input id="searchInput" class="search" type="text" placeholder="Search" />
                <span class="material-symbols-outlined search-icon">search</span>
                <div id="searchResults" class="dropdown"></div>
            </div>

            <div className="nav-links">
                <a href="/dashboard"><span className="material-symbols-outlined">home</span></a>
                <a href="/live"><span className="material-symbols-outlined">live_tv</span></a>
                <a href="/market"><span className="material-symbols-outlined">storefront</span></a>
                <a href="/groups"><span className="material-symbols-outlined">groups</span></a>
            </div>
            <div className="nav-right">
                <div className="dropdown">
                    <button className="dropbtn">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="dropdown-content">
                        <p>Notifications</p>
                    </div>
                </div>
                <a href="/messages"><span className="material-symbols-outlined">message</span></a>
                <div className="dropdown">
                    <button className="dropbtn" onClick={() => navigate("/profile")}>
                        <span className="material-symbols-outlined">account_circle</span>
                    </button>
                    <div className="dropdown-content">
                        <a href="/settings"><span className="material-symbols-outlined">settings</span> Settings & Privacy</a>
                        <a href="/help"><span className="material-symbols-outlined">help</span> Help & Support</a>
                        <DarkModeToggle />
                        <a href="/" title="Logout" onClick={handleLogout}>
                            <span className="material-symbols-outlined">logout</span> Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PostCreator = () => {
    const [postText, setPostText] = useState("");

    const handlePost = () => {
        console.log("Post created:", postText);
    };

    return (
        <div className="post-creator">
            <div className="image-preview">
                <img src="/" alt="Profile" />
            </div>
            <input class="captions" type="text" placeholder="What's on your mind" />
            <hr></hr>
            <button onClick={handlePost}><span class="material-symbols-outlined">
                video_call
            </span>Live Vide</button>
            <button onClick={handlePost}><span class="material-symbols-outlined">
                photo_library
            </span>Photo/Video</button>
            <button onClick={handlePost}><span class="material-symbols-outlined">
                show_chart
            </span>Activity</button>
        </div>
    );
};

const StorySection = ({ openStoryUpload = () => { }, prevStory = () => { }, nextStory = () => { } }) => {
    return (
        <div>
            {/* Story Section */}
            <div className="stories-container" id="storiesContainer">
                <div className="story create-story" onClick={openStoryUpload}></div>
            </div>

            {/* Navigation Buttons */}
            <div className="navs">
                <button id="prevStory" onClick={prevStory}>
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button id="nextStory" onClick={nextStory}>
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>

            {/* Posts Container */}
            <div className="posts-container" id="postsContainer"></div>
        </div>
    );
};

export default Dashboard;
