import React from 'react';
import './styles/ShoppingItem.css';

function ShoppingItem({ item, onSolvedChange, onRemove }) {
    return (
        <div className="shopping-item">
            <input 
                type="checkbox" 
                checked={item.solved} 
                onChange={() => onSolvedChange(item)} 
            />
            {item.amount} {item.unit} {item.name}
            <button onClick={() => onRemove(item)}>Odstranit</button>
        </div>
    );
}

export default ShoppingItem;
