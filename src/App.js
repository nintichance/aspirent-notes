import React, { Component } from 'react'
import Input from './components/Input'
import List from './components/List'

class App extends Component {
  state = {
    todos: []
  }
  render() {
    return (
      <div>
        Hello from App.js
        <Input />
        <List />
      </div>
    )
  }
}

export default App
