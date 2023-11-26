import React from 'react';
import './styles/NavBar.css';

function NavBar({ users, currentUser, onSelectUser }) {
    return (
        <nav className="nav-bar">
            <select 
                value={currentUser ? currentUser.id : ""}
                onChange={e => {
                    const selectedUser = users.find(user => user.id === parseInt(e.target.value));
                    onSelectUser(selectedUser);
                }}
            >
                <option value="" disabled>Select User</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
        </nav>
    );
}

export default NavBar;
