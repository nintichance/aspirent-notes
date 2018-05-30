import { shallow, mount } from 'enzyme'
import React from 'react'
import List from '../List'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todosApp from '../reducers'
//List takes in some props and returns some JSX

let component
let store
let initialState 

const renderComponent = () => {
    //instead of using shallow, we are using mount as it is wrapped in a Provider
    return mount(
        <Provider store={store}>
            <List />
        </Provider>
    )
}

beforeEach(()=>{
    initialState = {
        todos: ['test1', 'test2', 'test3']
    }
    store = createStore(todosApp, initialState)
    component = renderComponent()
})

it('Returns a list of elements', ()=>{
    const todoItems = component.find('.todoItem')
    console.log(todoItems)
    initialState.todos.forEach((todo, index)=>{
        //.at is a method of enzyme.... which will get the element of the array-like element at the particular index
       const todoItem = todoItems.at(index)
       console.log(todoItem)
       const todoText = todoItem.text()
       expect(todoText).toEqual(todo)
    })
    //todoItems will return an array-like element
})
