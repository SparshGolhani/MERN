import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [items, setItems] = useState([
    { image: "", title: "", description: "", qty: 1, price: "", date: "" },
  ]);

  const handleChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleAddFields = () => {
    setItems([
      ...items,
      { image: "", title: "", description: "", qty: 1, price: "", date: "" },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddItem(data);
        setItems([{ image: "", title: "", description: "", qty: 1, price: "", date: "" }]);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={item.image}
            onChange={(event) => handleChange(index, event)}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={item.title}
            onChange={(event) => handleChange(index, event)}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={(event) => handleChange(index, event)}
            maxLength="250"
            required
          />
          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={item.qty}
            onChange={(event) => handleChange(index, event)}
            min="1"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={item.price}
            onChange={(event) => handleChange(index, event)}
            required
          />
          <input
            type="date"
            name="date"
            value={item.date}
            onChange={(event) => handleChange(index, event)}
            required
          />
          <button type="button" onClick={() => handleRemoveFields(index)}>
            -
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddFields}>
        +
      </button>
      <button type="submit">Save</button>
    </form>
  );
}

export default ItemForm;

