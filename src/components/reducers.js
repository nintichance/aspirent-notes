const initialState = {
    todos: []
  }

const todosApp = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.todo]
            }
        default :
            return state
    }
}

export default todosApp