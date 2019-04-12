import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
      <li>ToDo Item <i class = "fas fa-check"></i><i class= "fas fa-trash"></i></li>
    );
  }
}

export default Todo;
