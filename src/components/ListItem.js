import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './ListItem.css'
import {
  deleteTodoAsync,
  toggleCompleteAsync,
  updateTodoAsync,
} from '../redux/todoSlice'

const ListItem = ({ id, title, completed }) => {
  const [isEditing, setIsEditting] = useState(false)
  const [editTask, setEditTask] = useState(title)
  const dispatch = useDispatch()

  const handleCompleteClick = () => {
    // changing the todo item done or not
    dispatch(toggleCompleteAsync({ id: id, isCompleted: !completed }))
  }

  const handleUpdateClick = () => {
    // updating data or value of todo item
    dispatch(updateTodoAsync({ id: id, content: editTask }))
  }

  const handleDeleteClick = () => {
    // removing todo item from list of api
    dispatch(deleteTodoAsync({ id: id }))
  }

  const handleUpdate = (e) => {
    // controlling and getting data from update form
    e.preventDefault()
    handleUpdateClick()
    setIsEditting(false)
  }

  return (
    <li
      key={id}
      className={`list-group-item ${completed && 'list-group-item-success'}`}
      style={{
        padding: '10px',
        marginBottom: '10px',
        border: 'none',
        color: '#8D4040',
        fontSize: '22px',
      }}
    >
      <div className="d-flex justify-content-between">
        {isEditing ? ( // controlling making updating or not right now
          <div key="editing">
            <form className="todo-edit-form" onSubmit={handleUpdate}>
              <input
                type="text"
                name="task"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)} // watch data value
              />
            </form>
          </div>
        ) : (
          <span className=" d-flex align-items-center">
            <input
              type="checkbox"
              style={{ marginRight: '20px' }}
              checked={completed} // getting and display the todo is done or not
              onChange={handleCompleteClick} // controlling the todo item is done or not
            />
            {/* if get click the value of item show input to update */}
            <span onClick={() => setIsEditting(true)}>{title}</span>
          </span>
        )}
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default ListItem
