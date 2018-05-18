import React, { Component } from 'react'
class Input extends Component{
    state = {
        todo: ''
    }

    handleChange = (event) => {
        event.preventDefault()
        console.log(this.state.todo)
        this.setState({ [event.target.name]: event.target.value })
    }
    addTodo = (event) => {
        event.preventDefault()
        this.props.addTodo(this.state.todo)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.addTodo}>
                <input 
                        name="todo"
                        placeholder="Enter Todo"
                        onChange={this.handleChange} />
                <button className="input-button" type="submit" value="Login"> Submit </button>
                </form>
                Hello from Input
            </div>
        )
    }

}

export default Input