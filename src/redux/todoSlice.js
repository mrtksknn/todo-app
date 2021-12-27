import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTodosAsync = createAsyncThunk(
  // get all the datas of todo items
  'todos/getTodoasync',
  async () => {
    const response = await fetch(
      // sending request to mockapi
      'https://61c42343f1af4a0017d99378.mockapi.io/todos'
    )
    if (response.ok) {
      // control response is okay if its okay then get datas
      const todos = await response.json()
      return { todos }
    }
  }
)

export const addTodoAsync = createAsyncThunk(
  // adding new todo item to mockapi
  'todos/addTodoAsync',
  async (payload) => {
    const response = await fetch(
      // sending request to mockapi
      'https://61c42343f1af4a0017d99378.mockapi.io/todos',
      {
        // set method to post for adding new todo item
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: payload.content }),
      }
    )
    if (response.ok) {
      const todo = await response.json()
      return { todo }
    }
  }
)

export const toggleCompleteAsync = createAsyncThunk(
  // changing the completed value of data done value
  'todos/completeTodoAsync',
  async (payload) => {
    const response = await fetch(
      // sending request to mockapi for specific todo item
      `https://61c42343f1af4a0017d99378.mockapi.io/todos/${payload.id}`,
      {
        // to change value of completed of specific item of todo
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: payload.isCompleted }),
      }
    )
    if (response.ok) {
      const todo = await response.json()
      return { id: todo.id, isCompleted: todo.isCompleted } // if response is okay turn the data of that todo item
    }
  }
)

export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodoAsync',
  async (payload) => {
    const response = await fetch(
      // sending request to specific mockapi for todo item
      `https://61c42343f1af4a0017d99378.mockapi.io/todos/${payload.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: payload.content }),
      }
    )
    if (response.ok) {
      const todo = await response.json()
      return { id: todo.id, content: todo.content } // turn data of that specific todo item
    }
  }
)

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload) => {
    const response = await fetch(
      // sendign request to mockapi for specific todo item
      `https://61c42343f1af4a0017d99378.mockapi.io/todos/${payload.id}`,
      {
        method: 'DELETE',
      }
    )
    if (response.ok) {
      return { id: payload.id }
    }
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],

  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        isCompleted: false,
        content: action.payload.content,
      }
      state.push(newTodo)
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      state[index].isCompleted = action.payload.isCompleted
    },
    updateTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      state[index].content = action.payload.content
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id)
    },
  },
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo)
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      state[index].isCompleted = action.payload.isCompleted
    },
    [updateTodoAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      state[index].content = action.payload.content
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id)
    },
  },
})

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions

export default todoSlice.reducer
