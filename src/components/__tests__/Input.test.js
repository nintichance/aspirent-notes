//Everything in its virtual DOM is a JS object with access to the render method
//Only replaces parts of the DOM that needs the change
//Basically a test virtual DOM, JS DOM
//Focus on test for UI Components
//Test the behavior of the component, or the internal workings
//Everytime you press a key, it updates the state
//We don't want to test the internal state, just verify that from the user's perspective, it does what it needs
import { shallow, mount } from 'enzyme'
import React from 'react'
import Input from '../Input'
import { Form } from '../styled-components/Form'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todosApp from '../reducers'
//mount mounts everything as it would be in the tree, while shallow just mounts the component without it children
//shallow is much lighter weight
//you won't have to worry about other component breaking
//mount is better for integration tests
//Context API is using render props, which doesn't play nicely with enzyme's shallow

//Input only takes one prop in

const renderComponent = () => {
    //render our component
    //mount renders both the component and any children that it may have
    //shallow just renders the component
    return mount(
        <Provider store={store}>
            <Input />
        </Provider>
    )
}
//we need to simulate addTodo
let store
let component
let initialState
//this gets run before reach of the test below, also have beforeAll, afterEach, afterAll
beforeEach(()=>{
    //just creates a mock function that we can then assert stuff that's been called on it
    //we can also pass in an empty arrow function....
    initialState = {
        todos: ['test1', 'test2', 'test3']
    }
    store = createStore(todosApp, initialState)
    component = renderComponent()
})
//either test or it for this syntax
// it('Fails', ()=>{

//     expect(true).toEqual(false)
//     //toEqual can compare objects
// })

it('Submits user text to the addTodo action', ()=>{
    //finds the native element for the input
    //we want to simlate the user typing info 
    const input = component.find('input')
    //this also takes CSS selectors
    //enzyme creates a shallow wrapper
    //.find is a method of enzyme
    // const button = component.find('button')
    const form = component.find(Form)
    //all the wrappers have a method called simulate
    //'change' string applies to the onChange method, and this syntax is consistent with all native events
    const userInput = 'testString'
    const changeEvent = {
        target: {
            name: 'todo',
            value: userInput
        },
        preventDefault: jest.fn()
    }
    
    input.simulate('change', changeEvent)
    // button.simulate('click',)
    //only need to simulate the native DOM event
    const submitEvent = {
        preventDefault: jest.fn()
    }
    form.simulate('submit', submitEvent)
    const state = store.getState()
    const expectedState = {
        todos: ['test1', 'test2', 'test3', userInput]
    }
    expect(state).toEqual(expectedState)
})

//propTypes is a way to determine that your component has the props that its expected to have

