import React, { useState } from 'react';
import ShoppingItem from './ShoppingItem';
import './styles/Items.css';

function Items({ itemList, currentUser, listOwner, listMembers, onUpdateItems, listId  }) {
    const [items, setItems] = useState(itemList);
    const [newItem, setNewItem] = useState({ name: '', amount: '', unit: '', solved: false });
    const [showUnresolved, setShowUnresolved] = useState(true);
    const displayedItems = showUnresolved ? items : items.filter(item => !item.solved);

    const handleSolvedChange = async (changedItem) => {
        if (currentUser.id === listOwner || listMembers.includes(currentUser.id)) {
            const updatedItems = items.map(item =>
                item === changedItem ? { ...item, solved: !item.solved } : item
            );

            try {
                const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: updatedItems }),
                });
                if (!response.ok) throw new Error('Network response was not ok');
                setItems(updatedItems);
            } catch (error) {
                console.error('Error updating item solved status:', error);
            }
        }
    };

    const handleAddItem = async () => {
        if (newItem.name) {
            const updatedItems = [...items, newItem];
            try {
                const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: updatedItems }),
                });
                if (!response.ok) throw new Error('Network response was not ok');
                setItems(updatedItems);
                setNewItem({ name: '', amount: '', unit: '', solved: false });
            } catch (error) {
                console.error('Error updating items:', error);
            }
        }
    };

    const handleRemoveItem = async (itemToRemove) => {
        const updatedItems = items.filter(item => item !== itemToRemove);

        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updatedItems }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setItems(updatedItems);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };  

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="items-container">
            <div>
                <h3>Items</h3>
                <div>
                    <button onClick={() => setShowUnresolved(true)}>Show all</button>
                    <button onClick={() => setShowUnresolved(false)}>Show unresolved</button>
                </div>
            </div>
            {displayedItems.map((item, index) => (
                <ShoppingItem key={index} item={item} onSolvedChange={handleSolvedChange} onRemove={handleRemoveItem} />
            ))}
            <div className="add-item-form">
                <input 
                    type="text" 
                    name="name"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    name="amount"
                    placeholder="Amount"
                    value={newItem.amount}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    name="unit"
                    placeholder="Unit"
                    value={newItem.unit}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
        </div>
    );
}

export default Items;
