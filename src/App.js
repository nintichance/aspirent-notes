import React, { Component } from 'react'
import Input from './components/Input'
import List from './components/List'

class App extends Component {
  state = {
    todos: []
  }

  addTodo = (todo) => {
    console.log("addTodo Called")
    this.setState((oldState)=>({todos: [...oldState.todos, todo] }))
  }

  render() {
    return (
      <div>
        Hello from App.js
        <Input addTodo={this.addTodo}/>
        <List todos={this.state.todos}/>
      </div>
    )
  }
}

export default App
