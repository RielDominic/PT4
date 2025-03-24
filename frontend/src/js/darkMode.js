import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'enabled';
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    }, [darkMode]);

    return (
        <a href="#" id="darkModeToggle" onClick={() => setDarkMode(prev => !prev)}>
            <span class="material-symbols-outlined">
                {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
            Display Accessibility
        </a>

    );
}
