import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FruitList = (props) => {
  const [fruit, setFruit] = useState([]);
  const [listLength, setListLength] = useState(0);

  useEffect(() => {
    if (props.fetchMode) {
      axios
        .get('http://localhost:5000/fruit')
        .then((res) => {
          const { data, success } = res.data;
          if (success) {
            setFruit(data);
            setListLength(data.length);
            props.setFetchMode(false);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [props.fetchMode]);

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:5000/fruit/${id}`)
      .then((res) => {
        if (res.data.success) {
          props.setFetchMode(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const prepareFruitList = () => {
    return fruit.slice(0, listLength).map((fruit, index) => (
      <div key={fruit.id}>
        <p>
          {index + 1}. name: {fruit.name} | amount: {fruit.amount}
          <br />
          <button onClick={() => props.setEditId(fruit.id)}>edit</button>
          <button onClick={() => onDelete(fruit.id)}>delete</button>
        </p>
      </div>
    ));
  };

  const changeListLength = (event) => {
    const inputValue = event.target.value;
    if (inputValue < 0 || inputValue > fruit.length) {
      return;
    }

    setListLength(inputValue);
  };

  return (
    <div>
      <label>
        List Length:
        <input type="number" value={listLength} onChange={changeListLength} />
      </label>
      <hr />
      <h3>Fruit List</h3>
      {prepareFruitList()}
    </div>
  );
};

export default FruitList;
