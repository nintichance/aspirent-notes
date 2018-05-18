import React from 'react'

const List = (props) => {
    const listItems = props.todos.map((todo, index)=>{
        return(
            <div key={index}>
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

export default List