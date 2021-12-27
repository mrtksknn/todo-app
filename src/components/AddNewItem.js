import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoAsync } from '../redux/todoSlice'

const AddNewItem = () => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (event) => {
    event.preventDefault()
    // controlling the input is empty or its length short than 3
    if (value.length !== 0 && value.length >= 3) {
      dispatch(
        addTodoAsync({
          content: value,
        })
      )
    }
    setValue('')
  }

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3 d-flex">
      <input
        type="text"
        className="form-control mb-2 mr-sm-2 rounded-0 rounded-start"
        placeholder="Add todo..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  )
}

export default AddNewItem
