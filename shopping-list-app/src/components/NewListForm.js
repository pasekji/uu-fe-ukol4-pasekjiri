import React, { useState } from 'react';

function NewListForm({ onCreate }) {
  const [listName, setListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ listName, items: [], archived: false });
    setListName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="List Name"
        required
      />
      <button type="submit">Create List</button>
    </form>
  );
}

export default NewListForm;
