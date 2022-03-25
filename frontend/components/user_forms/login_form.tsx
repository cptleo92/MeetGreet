import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/session_actions'
import SessionFormHeader from './session_form_header'

const LoginForm = ({ formType }: {formType: string}) => {
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
    <div className="login-form">
      <SessionFormHeader formType={formType} />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        value={input.email}
        onChange={update}     
        name="email"  
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={input.password}
        onChange={update}       
        name="password"
      />

      <button className="btn-red" onClick={submit}>Log in</button>
    </div>
  )
}

export default LoginForm