import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

var apiKey = "2987f1a1ce39da4ae4d7859af410f382c848d8d0a45588bf183a1d22b7b3ce0d";


class App extends Component {

  constructor (props) {


    super(props);


    this.state = {todos: [], imput: ''};
    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeDeletedTodo = this.removeDeletedTodo.bind(this);
    this.sortAlphaCreated = this.sortAlphaCreated.bind(this);


    this.currSort = 0;

    }

  onChange(event) {


    this.setState({
      input: event.target.value
    });


  }




  componentDidMount() {

      var self=this;
      var listRequest = new XMLHttpRequest();


      listRequest.onreadystatechange = function() {
          if(this.readyState===4 && this.status===200) {
              var todos = JSON.parse(this.responseText);
              self.setState({todos: todos});
          } else if(this.readyState===4) {
              console.log(this.responseText);
          }
      }


      listRequest.open("GET", "https://api.kraigh.net/todos", true);
      listRequest.setRequestHeader("x-api-key", apiKey);
      listRequest.send();


  }

  addTodo(event) {
      event.preventDefault();
      var self=this;
      var data = {
        text: self.state.input
      };
      var createRequest = new XMLHttpRequest();


      createRequest.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
          self.setState({
            todos: [...self.state.todos, JSON.parse(this.responseText)]
          })
          self.setState({input: ''});

        } else if (this.readyState === 4) {

          // this.status !== 200, error from server
          console.log(this.responseText);

        }
      };

      createRequest.open("POST", "https://api.kraigh.net/todos", true);
      createRequest.setRequestHeader("Content-type", "application/json");
      createRequest.setRequestHeader("x-api-key", apiKey);
      createRequest.send(JSON.stringify(data));

  }

  removeDeletedTodo(id) {

    var self=this;
    var deleteRequest = new XMLHttpRequest();


    deleteRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const remainingTodos = self.state.todos.filter((todo) => {
          if (todo.id !== id) {
            return todo;
          }
        });
        self.setState({todos: remainingTodos});
      }
      else if (this.readyState===4) {
        console.log(this.responseText);
      }
    }

    deleteRequest.open("DELETE", "https://api.kraigh.net/todos/" + id, true);
    deleteRequest.setRequestHeader("Content-type", "application/json");
    deleteRequest.setRequestHeader("x-api-key", apiKey);
    deleteRequest.send();

}

deleteTodo(event) {

    this.props.removeDeletedTodo(this.props.id);
    
  }

sortAlphaCreated () {
  var todos = this.state.todos;

  if(this.currSort == 0){
    todos.sort(function(a,b){
      return a.created-b.created
    });
  this.currSort = 1;
  }
  else if(this.currSort == -1){
    todos.sort(function(a,b){
      return a.created-b.created
    });
  this.currSort = 1;
  }
  else if(this.currSort == 1){
    todos.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    })
    this.currSort = -1;
  }



  this.setState({todos: todos});
}


  render() {
    return (
      <body>
        <i id = "sort" className="far fa-list-alt fa-2x" onClick={this.sortAlphaCreated}></i>


        <h1 id="heading">GET TO WORK.</h1>
        <NewTodo addTodo={this.addTodo} onChange={this.onChange} input={this.state.input}/>
        <div id="list">
          <ul id = "items">


            {this.state.todos.map((todo) =>
              <Todo key={todo.id} id={todo.id} completed={todo.completed}
                text={todo.text} removeDeletedTodo={this.removeDeletedTodo} />
            )}

          </ul>
        </div>
      </body>
    );
  }




}

export default App;
