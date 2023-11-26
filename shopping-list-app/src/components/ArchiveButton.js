import React from 'react';
import './styles/ArchiveButton.css';

function ArchiveButton({ onClick }) {
    return (
        <button className="archive-btn" onClick={onClick}>
            View archive
        </button>
    );
}

export default ArchiveButton;
