import axios from "axios";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListItem from "../components/ListItem";


function ToDoList() {
    const [inputText, setInputText] = useState("");
    //const [newItem, setNewItem] = useState([]);
    const [newItems, setNewItems] = useState<string[]>([]);
  
    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
      const newValue = event.target.value;
      setInputText(newValue);
      console.log(newValue);
    }
  
    function addItem() {
      // setNewItem(prevItems => {
      //   return {...prevItems, inputText};
      // })
      // setInputText("");
      setNewItems(prevItems => [...prevItems, inputText]);
      setInputText("");
    }
  
    return (
      <div className="container">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <div className="form">
          <input value={inputText} onChange={handleChange} type="text" />
          <button onClick={addItem}>
            <span>Add</span>
          </button>
        </div>
        <div>
          <ul>
            {newItems.map((item, index) => (
              <ListItem key={index} text={item} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  export default ToDoList;
  