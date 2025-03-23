import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
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

<<<<<<< Updated upstream
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
                                        <td style={styles.tableCell}>
                                            <img
                                                src={user.profilePic.startsWith("http")
                                                    ? user.profilePic // ✅ If `profilePic` is a link, use it
                                                    : `http://localhost:5000${user.profilePic}`} // ✅ Otherwise, use local upload
                                                width="80"
                                                height="80"
                                                alt="Profile Picture"
                                                style={{ borderRadius: "50%" }} // ✅ Make circular
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleLogout} style={styles.button}>
                        Logout
=======
const Navbar = ({ handleLogout }) => {
    return (
        <div className="navbar">
            <a href="/" className="logo">
                <img src="/logo.png" alt="FriendZone Logo" />
            </a>
            <div class="search-container">
                <input class="search" type="text" placeholder="Search" />
                <span class="material-symbols-outlined search-icon">search</span>
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
>>>>>>> Stashed changes
                    </button>
                    <div className="dropdown-content">
                        <p>Notifications</p>
                    </div>
                </div>
                <a href="/messages"><span className="material-symbols-outlined">message</span></a>
                <div className="dropdown">
                    <button className="dropbtn">
                        <span className="material-symbols-outlined">account_circle</span>
                    </button>
                    <div className="dropdown-content">
                        <a href="/settings"><span className="material-symbols-outlined">settings</span> Settings & Privacy</a>
                        <a href="/help"><span className="material-symbols-outlined">help</span> Help & Support</a>
                        <a href="#" id="darkModeToggle"><span className="material-symbols-outlined">dark_mode</span> Display Accessibility</a>
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
