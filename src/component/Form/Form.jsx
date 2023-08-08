import React, { useState } from "react";

const Form = ({ addItem }) => {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(newItem);
    setNewItem("");
  };

  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          autoComplete="off"
          type="text"
          id="item"
          value={newItem}
          placeholder="Add your new todo item here"
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="btn btn-add" title="Add new task">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </form>
  );
};

export default Form;
