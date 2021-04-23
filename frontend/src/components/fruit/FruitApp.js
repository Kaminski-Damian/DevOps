import React, { useState } from 'react';
import FruitForm from './FruitForm';
import FruitList from './FriutList';

const FruitApp = () => {
  const [fetchMode, setFetchMode] = useState(true);
  const [editId, setEditId] = useState();

  return (
    <div>
      <FruitForm
        editId={editId}
        setFetchMode={setFetchMode}
        setEditId={setEditId}
      />
      <FruitList
        fetchMode={fetchMode}
        setFetchMode={setFetchMode}
        setEditId={setEditId}
      />
    </div>
  );
};

export default FruitApp;
