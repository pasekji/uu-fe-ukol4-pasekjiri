import React, { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import NavBar from './components/NavBar';
import ShoppingListWrapper from './components/ShoppingListWrapper';
import './App.css';
import { users, shoppingLists } from './data';
import Modal from './components/Modal';
import NewListForm from './components/NewListForm';

function App() {
    const [shoppingListData, setShoppingListData] = useState(shoppingLists);
    const [filteredLists, setFilteredLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const [currentUser, setCurrentUser] = useState(users[0]);
    const [showArchived, setShowArchived] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (currentUser) {
            setFilteredLists(shoppingListData.filter(list => list.members.includes(currentUser.id) || list.owner === currentUser.id));
        }
    }, [currentUser, shoppingListData]);

    /*
    const handleUpdateItems = (listId, updatedItems) => {
        setShoppingListData(prevData =>
            prevData.map(list =>
                list.id === listId ? { ...list, items: updatedItems } : list
            )
        );
    };
    */

    const handleUpdateItems = async (listId, updatedItems) => {
        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: updatedItems }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const updatedList = await response.json();
            setShoppingListData(prevData =>
                prevData.map(list => list.id === listId ? updatedList : list)
            );
        } catch (error) {
            console.error('Failed to update items:', error);
        }
    };

    const [editingListName, setEditingListName] = useState(null);

    /*
    const handleUpdateListName = (listId, newName) => {
        setShoppingListData(prevData =>
            prevData.map(list => 
                list.id === listId ? { ...list, listName: newName } : list
            )
        );
        setEditingListName(null);
    };
    */

    const handleUpdateListName = async (listId, newName) => {
        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ listName: newName }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const updatedList = await response.json();
            setShoppingListData(prevData =>
                prevData.map(list => list.id === listId ? updatedList : list)
            );
            setEditingListName(null);
        } catch (error) {
            console.error('Failed to update list name:', error);
        }
    };

    useEffect(() => {
        if (selectedList) {
            const updatedList = shoppingListData.find(list => list.id === selectedList.id);
            if (updatedList) {
                setSelectedList(updatedList);
            }
        }
    }, [shoppingListData]);

    /*
    const handleUpdateMembers = (listId, updatedMembers) => {
        setShoppingListData(prevData =>
            prevData.map(list =>
                list.id === listId ? { ...list, members: updatedMembers } : list
            )
        );
    };
    */

    const handleUpdateMembers = async (listId, updatedMembers) => {
        try {
            const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: updatedMembers }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const updatedList = await response.json();
            setShoppingListData(prevData =>
                prevData.map(list => list.id === listId ? updatedList : list)
            );
        } catch (error) {
            console.error('Failed to update members:', error);
        }
    };

    const onArchiveToggle = listId => {
        setShoppingListData(prevData =>
            prevData.map(list =>
                list.id === listId ? { ...list, archived: !list.archived } : list
            )
        );
    };

    const onToggleShowArchived = () => {
        setShowArchived(prevShowArchived => !prevShowArchived);
    };

    const handleDeleteList = async listId => {
        if (window.confirm("Are you sure you want to delete this list?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/shopping-lists/${listId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Network response was not ok');
                setShoppingListData(prevData => prevData.filter(list => list.id !== listId));
            } catch (error) {
                console.error('Failed to delete list:', error);
            }
        }
    };
    
    /*
    const handleDeleteList = listId => {
        if (window.confirm("Are you sure you want to delete this list?")) {
            setShoppingListData(prevData => prevData.filter(list => list.id !== listId));
        }
    };
    */
    /*
    const handleCreateNewList = (newList) => {
        setShoppingListData(prevData => [
            ...prevData, 
            { ...newList, id: Date.now(), owner: currentUser.id, members:[currentUser.id] }
        ]);
        setIsModalOpen(false);
    };
    */

    const handleCreateNewList = async (newList) => {
        try {
            const response = await fetch('http://localhost:5000/api/shopping-lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newList, owner: currentUser.id, members: [currentUser.id] }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const createdList = await response.json();
            setShoppingListData(prevData => [...prevData, createdList]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to create a new list:', error);
        }
    };

    return (
        <div className="app-container">
            <AppHeader logoSrc="/cart.png" titleText="Shopping list app" />
            <NavBar
                users={users}
                currentUser={currentUser}
                onSelectUser={setCurrentUser}
            />
            <button onClick={() => setIsModalOpen(true)}>Create New List</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <NewListForm onCreate={handleCreateNewList} />
            </Modal>
            <ShoppingListWrapper
                shoppingListData={filteredLists}
                selectedList={selectedList}
                onSelectList={setSelectedList}
                onDeselectList={() => setSelectedList(null)}
                currentUser={currentUser}
                onUpdateItems={handleUpdateItems}
                editingListName={editingListName}
                onEditListName={setEditingListName}
                onUpdateListName={handleUpdateListName}
                onUpdateMembers={handleUpdateMembers}
                onArchiveToggle={onArchiveToggle}
                showArchived={showArchived}
                onToggleShowArchived={onToggleShowArchived}
                onDeleteList={handleDeleteList}
            />
        </div>
    );
}

export default App;