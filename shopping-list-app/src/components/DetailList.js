import React from 'react';
import './styles/DetailList.css';

function DetailList({ details }) {
    return (
        <ul className="detail-list">
            {details.map((detail, index) => (
                <li key={index}>{detail}</li>
            ))}
        </ul>
    );
}

export default DetailList;
