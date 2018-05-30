import React, { Component } from 'react'
import Input from './components/Input'
import List from './components/List'
import { AppContainer } from './components/styled-components/Containers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todosApp from './components/reducers'
//instance of the App class
//render method takes the JSX and turns it into a JS object which holds it to the tree

//createStore takes the root reducer as a parameter
const store = createStore(todosApp)

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
      <Provider store={store}>
        <AppContainer>
          <Input addTodo={this.addTodo}/>
          <List />
        </AppContainer>
      </Provider>
    )
  }
}

export default App
