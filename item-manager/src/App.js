// change for app.js
import React, { useState } from "react";
import ItemList from "./ItemList";

function App() {
  const [items, setItems] = useState([]);
  const [formFields, setFormFields] = useState([
    {
      image: "",
      title: "",
      description: "",
      qty: 1,
      price: "",
      date: ""
    }
  ]);

  
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...formFields];
    updatedFields[index][name] = value;
    setFormFields(updatedFields);
  };

  
  const handleAddField = () => {
    setFormFields([
      ...formFields,
      { image: "", title: "", description: "", qty: 1, price: "", date: "" }
    ]);
  };

  
  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  
  const handleSave = () => {
    setItems([...items, ...formFields]);

    
    setFormFields([
      {
        image: "",
        title: "",
        description: "",
        qty: 1,
        price: "",
        date: ""
      }
    ]);
  };

  return (
    <div>
      <h1>Item Manager</h1>
      {formFields.map((field, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={field.image}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={field.title}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={field.description}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="number"
            name="qty"
            placeholder="Qty"
            value={field.qty}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={field.price}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={field.date}
            onChange={(e) => handleInputChange(index, e)}
          />

          <button onClick={() => handleAddField()}>+</button>
          {formFields.length > 1 && (
            <button onClick={() => handleRemoveField(index)}>-</button>
          )}
        </div>
      ))}
      <button onClick={handleSave}>Save</button>

      
      <ItemList items={items} />
    </div>
  );
}

export default App;