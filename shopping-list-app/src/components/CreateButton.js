import React from 'react';
import './styles/CreateButton.css';

function CreateButton({ onClick }) {
    return (
        <button className="create-btn" onClick={onClick}>
            Create new list
        </button>
    );
}

export default CreateButton;
