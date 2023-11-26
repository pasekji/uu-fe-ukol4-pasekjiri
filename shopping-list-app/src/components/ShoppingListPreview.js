import React from 'react';
import './styles/ShoppingListPreview.css';

function ShoppingListPreview({ list, onSelect, onArchiveToggle, onDelete, currentUserId }) {
    const handleArchiveToggle = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${list.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ archived: !list.archived }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            onArchiveToggle(list.id);
        } catch (error) {
            console.error('Failed to toggle archive:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${list.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            onDelete(list.id);
        } catch (error) {
            console.error('Failed to delete list:', error);
        }
    };

    return (
        <div className="shopping-list-preview">
            <h2>{list.listName}</h2>
            <p>{list.items.length} items in total</p>
            <p>{list.items.filter(item => item.solved).length} items solved</p>
            <button onClick={() => onSelect(list)}>View detail</button>
            <button onClick={handleArchiveToggle}>
                {list.archived ? 'Unarchive' : 'Archive'}
            </button>
            {list.owner === currentUserId && (
                <button onClick={handleDelete}>Delete</button>
            )}
        </div>
    );
}

export default ShoppingListPreview;
