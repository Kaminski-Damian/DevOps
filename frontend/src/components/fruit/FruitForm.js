import React, { useState, useEffect } from 'react';
import API from '../../api';

const FruitForm = (props) => {
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (props.editId) {
      setEditMode(true);
      setSuccess(false);

      API.get(`fruit/${props.editId}`)
        .then((res) => {
          const { data, success } = res.data;
          if (success) {
            const { id, name, amount } = data;
            setId(id);
            setName(name);
            setAmount(amount);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [props.editId]);

  const handleName = (event) => {
    const name = event.target.value;

    setName(name);
    setSuccess(false);
  };

  const handleAmount = (event) => {
    const amount = event.target.value;
    if (amount < 0) {
      return;
    }

    setAmount(amount);
    setSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!(name && amount)) {
      return;
    }

    if (editMode) {
      editFruit();
    } else {
      createFruit();
    }
  };

  const createFruit = () => {
    API.post('fruit', { name, amount })
      .then((res) => {
        if (res.data.success) {
          setSuccess(true);
          setName('');
          setAmount(0);
          props.setFetchMode(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const editFruit = () => {
    API.put('fruit', { id, name, amount })
      .then((res) => {
        if (res.data.success) {
          setSuccess(true);
          resetEditStates();
          props.setFetchMode(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCancel = (event) => {
    event.preventDefault();

    props.setEditId(null);
    resetEditStates();
  };

  const resetEditStates = () => {
    setId(null);
    setName('');
    setAmount(0);
    setEditMode(false);
  };

  const showCancelInputButton = () => {
    if (editMode) {
      return <input type="button" value="cancel" onClick={handleCancel} />;
    }
  };

  const showSuccessMessage = () => {
    if (success) {
      return <p>Success</p>;
    }
  };

  return (
    <div>
      <h3>{editMode ? 'Edit' : 'Create'} Fruit</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleName} />
        </label>
        <br />
        <br />
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmount} />
        </label>
        <br />
        <br />
        <input type="submit" value="send" />
        {showCancelInputButton()}
      </form>
      {showSuccessMessage()}
      <hr />
    </div>
  );
};

export default FruitForm;
