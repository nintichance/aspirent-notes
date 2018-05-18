import React, { Component } from 'react'
import { InputContainer } from './styled-components/Containers'
import { Form } from './styled-components/Form'
class Input extends Component{
    state = {
        todo: ''
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }
    addTodo = (event) => {
        event.preventDefault()
        this.props.addTodo(this.state.todo)
    }

    render(){
        return(
            <InputContainer>
                <Form onSubmit={this.addTodo}>
                <input 
                        name="todo"
                        placeholder="Enter Todo"
                        onChange={this.handleChange} />
                <button className="input-button" type="submit" value="Login"> Submit </button>
                </Form>
            </InputContainer>
        )
    }

}

export default Input