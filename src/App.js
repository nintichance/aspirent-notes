import React, { Component } from 'react'
import Input from './components/Input'
import List from './components/List'
import { AppContainer } from './components/styled-components/Containers'
//instance of the App class
//render method takes the JSX and turns it into a JS object which holds it to the tree
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
      <AppContainer>
        <Input addTodo={this.addTodo}/>
        <List todos={this.state.todos}/>
      </AppContainer>
    )
  }
}

export default App
