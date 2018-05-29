import { shallow, mount } from 'enzyme'
import React from 'react'
import List from '../List'
//List takes in some props and returns some JSX
const renderComponent = () => {
    return shallow(
        <List todos={todos}/>
    )
}

let component
let todos 

beforeEach(()=>{
    todos = ['test1', 'test2', 'test3']
    component = renderComponent()
})

it('Returns a list of elements', ()=>{
    const todoItems = component.find('.todoItem')
    console.log(todoItems)
    todos.forEach((todo, index)=>{
        //.at is a method of enzyme.... which will get the element of the array-like element at the particular index
       const todoItem = todoItems.at(index)
       console.log(todoItem)
       const todoText = todoItem.text()
       expect(todoText).toEqual(todo)
    })
    //todoItems will return an array-like element
})
