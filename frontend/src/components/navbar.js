import React from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from '../js/darkMode';
import '../css/styles.css';

const Navbar = ({ handleLogout, currentUser }) => {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <a href="/dashboard" className="logo">
                <img src="/logo.png" alt="FriendZone Logo" />
            </a>
            <div className="search-container">
                <input id="searchInput" className="search" type="text" placeholder="Search" />
                <span className="material-symbols-outlined search-icon">search</span>
                <div id="searchResults" className="dropdown"></div>
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
                        {currentUser?.profilePic ? (
                            <img
                                src={`http://localhost:5000${currentUser.profilePic}`}
                                alt="Profile"
                                className="profile-pic"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/default-profile.png';
                                }}
                            />
                        ) : (
                            <div className="default-profile-icon"></div>
                        )}
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

export default Navbar;