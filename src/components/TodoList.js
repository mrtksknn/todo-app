import React, { useEffect } from 'react'
import ListItem from './ListItem'
import { useSelector, useDispatch } from 'react-redux'
import { getTodosAsync } from '../redux/todoSlice'

const TodoList = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos) // getting data from redux getTodosAsync

  useEffect(() => {
    setTimeout(() => {
      dispatch(getTodosAsync())
    }, 5000)
  }, [dispatch]) // watch the dispatch action for rendering

  return (
    <ul className="list-group">
      {todos.length !== 0 ? ( // controlling todos list length to show spinner or not
        todos.map((todo) => (
          // display all items
          <ListItem
            key={todo.id}
            id={todo.id}
            title={todo.content}
            completed={todo.isCompleted}
          />
        ))
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </ul>
  )
}

export default TodoList
