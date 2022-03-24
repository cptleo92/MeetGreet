import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/session_actions'

const SessionForm: React.FC = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  })

  const dispatch = useDispatch();

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();  
    const user = input;
    dispatch(login(user))

    setInput({
      email: "",
      password: ""
    })
  }

  return (
    <form className="login-form">
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="text"
        value={input.email}
        onChange={update}   
        placeholder="Email"   
        name="email"  
      />

      <label htmlFor="password">Password: </label>
      <input
        id="password"
        type="password"
        value={input.password}
        onChange={update}     
        placeholder="Password"   
        name="password"
      />

      <button onClick={submit}>Log in</button>
    </form>
  )
}

export default SessionForm