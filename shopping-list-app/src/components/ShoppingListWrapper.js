import React from 'react';
import ShoppingListPreview from './ShoppingListPreview';
import Members from './Members';
import Items from './Items';
import './styles/ShoppingListWrapper.css';
import { users } from '../data';

function ShoppingListWrapper({ shoppingListData, selectedList, onDeleteList, onSelectList, onDeselectList, onArchiveToggle, currentUser, onUpdateItems, editingListName, onEditListName, onUpdateListName, onUpdateMembers, showArchived, onToggleShowArchived }) {
    return (
        <div className="shopping-list-wrapper">
            {selectedList === null && (
                <div className="archive-toggle-button">
                    <button onClick={onToggleShowArchived}>
                        {showArchived ? 'Show Unarchived' : 'Show Archived'}
                    </button>
                </div>
            )}
            {selectedList === null ? (
                shoppingListData
                .filter(list => showArchived ? list.archived : !list.archived)
                .map(list => (
                    <ShoppingListPreview key={list.id} list={list} onSelect={onSelectList} onArchiveToggle={onArchiveToggle} onDelete={() => onDeleteList(list.id)}  currentUserId={currentUser.id}/>
                ))
            ) : (
                <div>
                    {editingListName === selectedList.id ? (
                        <input
                            type="text"
                            defaultValue={selectedList.listName}
                            onBlur={(e) => onUpdateListName(selectedList.id, e.target.value)}
                        />
                    ) : (
                        <h2>{selectedList.listName}</h2>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {currentUser.id === selectedList.owner && (
                            <button onClick={() => onEditListName(selectedList.id)}>Edit Name</button>
                        )}
                    </div>
                    <Members 
                        memberList={selectedList.members.map(memberId => users.find(user => user.id === memberId))}
                        allUsers={users}
                        listId={selectedList.id}
                        currentUser={currentUser}
                        onUpdateMembers={onUpdateMembers}
                    />
                    <Items 
                        itemList={selectedList.items} 
                        currentUser={currentUser} 
                        listOwner={selectedList.owner}
                        listMembers={selectedList.members}
                        onUpdateItems={(updatedItems) => onUpdateItems(selectedList.id, updatedItems)}
                        listId={selectedList.id}
                    />
                    <button onClick={onDeselectList}>Back</button>
                </div>
            )}
        </div>
    );
}

export default ShoppingListWrapper;