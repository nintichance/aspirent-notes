import React from 'react'
import { connect } from 'react-redux'

const List = (props) => {
    const listItems = props.todos.map((todo, index)=>{
        return(
            <div key={index} className='todoItem'>
                {todo}
            </div>
        )
    })
    console.log(props.todos)
    return(
        <div>
            {listItems}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps, undefined)(List)