import React from 'react';
import './styles/MemberItem.css';

function MemberItem({ member }) {
    return (
        <div className="member-item">
            {member.name} ({member.email})
        </div>
    );
}

export default MemberItem;
