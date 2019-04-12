import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  render() {
    return (
      <body>
        <NewTodo />
        <div id="list">
          <ul id = "items">
            <Todo />
          </ul>
        </div>
      </body>
    );
  }
}

export default App;
