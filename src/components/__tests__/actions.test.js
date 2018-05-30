import { addTodo }  from '../actions'

it('Creates an action called add_todo', () => {
    const todo = 'test'
    const todoItem = {
        type: 'ADD_TODO',
        todo
    }

    const todoAction = addTodo(todo)
    expect(todoAction).toEqual(todoItem)
})