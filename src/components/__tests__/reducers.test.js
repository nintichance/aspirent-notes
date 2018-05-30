import todosApp from '../reducers'

it('Initializes the state', ()=>{
    const action = {
        type: 'TEST_ACTION'
    }
    const updatedState = todosApp(undefined, action) 
    expect(updatedState).toEqual({
        todos: []
      })
})

it('Returns state unchanged if action is unknown', ()=> {
    const state = {}
    const action = {
        type: 'TEST_ACTION'
        //we don't have this case inside of the reducers file, therefore it's expecting it to be unchanged
    }
    const updatedState = todosApp(state, action)
    expect(updatedState).toBe(state)
})

it('Adds a todo to state', ()=>{
    const state = {
        todos: ['one', 'two', 'three']
    }
    const action = {
        type: 'ADD_TODO',
        todo: 'four'
    }
    const updatedState = todosApp(state, action)
    const expectedState = {todos:['one', 'two', 'three', 'four']}
    expect(updatedState).toEqual(expectedState)

})