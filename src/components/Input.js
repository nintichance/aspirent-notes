import React, { Component } from 'react'
import { InputContainer } from './styled-components/Containers'
import { Form } from './styled-components/Form'
import { addTodo } from './actions'
import { connect } from 'react-redux'
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
        this.setState({todo: ''})
    }

    render(){
        return(
            <InputContainer>
                <Form onSubmit={this.addTodo}>
                <input 
                        name="todo"
                        value={this.state.todo}
                        placeholder="Enter Todo"
                        onChange={this.handleChange} />
                <button className="input-button" type="submit" value="Login"> Submit </button>
                </Form>
            </InputContainer>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (todo) => {
            dispatch(addTodo(todo))
        }
    }
}

//mapStateToProps handles state 
//mapDispatchToProps handle actions
export default connect(undefined, mapDispatchToProps)(Input)