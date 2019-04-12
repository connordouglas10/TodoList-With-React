

import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div id = "insert">
      <form id= "iA">
          <input type = "text" id = "input" placeholder = "I need to:"></input>
          <i class="far fa-arrow-alt-circle-down fa-3x" id = "add" ></i>
      </form>
    </div>
    );
  }
}

export default NewTodo;
