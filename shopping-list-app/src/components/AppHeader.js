import React from 'react';
import './styles/AppHeader.css';

function AppHeader({ logoSrc, titleText }) {
    return (
        <header className="app-header">
            {logoSrc && <img src={logoSrc} alt="App Logo" />}
            <h1>{titleText}</h1>
        </header>
    );
}

export default AppHeader;
