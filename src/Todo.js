import React, { Component } from 'react';
import './Todo.css';

var apiKey = "2987f1a1ce39da4ae4d7859af410f382c848d8d0a45588bf183a1d22b7b3ce0d";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: this.props.completed
        }


        this.checkTodo = this.checkTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    checkTodo(event) {
        var self=this;
        var todoId=this.props.id;
        var data = {
            completed: true
        };
        var completeRequest = new XMLHttpRequest();



        completeRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                self.setState({
                    completed:true
                })
            } else if (this.readyState === 4) {
                console.log(this.responseText);
            }
        }


        completeRequest.open("PUT", "https://api.kraigh.net/todos/" + todoId, true);
        completeRequest.setRequestHeader("Content-type", "application/json");
        completeRequest.setRequestHeader("x-api-key", apiKey);
        completeRequest.send(JSON.stringify(data));


    }

    deleteTodo(event) {

        this.props.removeDeletedTodo(this.props.id);
    }

    render() {
        let todoState = "todo";
        if(this.state.completed) {
            todoState = "comp"
        }
        return (
            <li id = {this.props.id} className={todoState}> {this.props.text} <i className = "fas fa-check" onClick={this.checkTodo}></i><i className= "fas fa-trash" onClick={this.deleteTodo}></i></li>
        );
    }
}

export default Todo;
