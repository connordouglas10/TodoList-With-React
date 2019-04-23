
import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
    render() {
        return (

            <div id = "insert">
            <form id= "iA" onSubmit={this.props.addTodo}>
                <input  value={this.props.input} onChange={this.props.onChange} type = "text" id = "input" placeholder = "I need to:"></input>
                <i className="far fa-arrow-alt-circle-down fa-3x" id = "add" onClick = {this.props.addTodo}></i>
            </form>
          </div>
        );
    }
}

export default NewTodo;
