import React, { Component } from 'react'

class Input extends Component{
    render(){
        return(
            <div>
                <input 
                        name="todo"
                        placeholder="Enter Todo"
                        onChange={this.handleChange} />
                Hello from Input
            </div>
        )
    }

}

export default Input