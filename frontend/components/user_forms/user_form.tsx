import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, signup } from '../../actions/session_actions'
import { RootState } from '../../store/store'
import SessionFormHeader from './session_form_header'
import FormErrors from './form_errors'
import { useNavigate } from 'react-router-dom'
import { closeModal } from '../../actions/modal_actions'

const UserForm = ({ formType }: {formType: string}) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    fname: "",
    lname: ""
  })

  const [hidden, setHidden] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  // this basically clones the hidden button (generated in application.html.erb)
  // each time the modal opens
  // kind of a ridiculous method of getting it to work but I'm out of ideas :(
  useEffect( () => {
    const btn = $(".google-btn")
    btn.clone().appendTo( $(".modal-child") ).addClass("shown")
  }, [])

  const loginSuccess = () => {
    dispatch(closeModal())
    navigate('/home')
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    e.stopPropagation();
    const user = input; 

    // sorry Typescript! have to ignore you for now
    formType === "login" ? 
      dispatch(login(user)).then(loginSuccess) :
      dispatch(signup(user)).then(loginSuccess) ;    
  }

  const handleDemoLogin = () => {
    dispatch(login({
      email: "demo@fake.com",
      password: 'password'
    })).then(loginSuccess)
  }

  const toggleShowPassword = () => {
    setHidden(!hidden)
  }

  const errors = useSelector((state: RootState) => state.errors.session)  

  return (
    <div className="login-form">
      <SessionFormHeader formType={formType} />
      
      <form onSubmit={submit}>
      {/* only render this section if this is a signup form */}
      { formType === "signup" && 
        <>
        <label htmlFor="fname">First name</label>
        <div className="fname-field">
          <svg 
            className="icon"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
              <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
          <input
          id="fname"
          type="text"
          value={input.fname}
          onChange={update}     
          name="fname"  
          />
        </div>

        <label htmlFor="lname">Last name</label>
        <div className="lname-field">
          <svg 
            className="icon"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
          <input
          id="lname"
          type="text"
          value={input.lname}
          onChange={update}     
          name="lname"  
          />
        </div>
        </>
      }

      <label htmlFor="email">Email</label>
      <div className="email-field">
        <svg 
          className="icon"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{/*Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.*/}<path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z"/></svg>
      <input
        id="email"
        type="text"
        value={input.email}
        onChange={update}     
        name="email"  
      />
      </div>    

      <label htmlFor="password">Password</label>
      <div className="password-field">
      <svg 
        //toggle show/hide password
        className="icon"
        style={{display: hidden ? "none" : "block"}}    
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">{/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
        <path 
          onClick={toggleShowPassword}
          id="hidden"
          d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM393.6 469.4L54.65 203.7C62.6 190.1 72.08 175.8 83.09 161.5L446.2 447.5C429.8 456.4 412.3 463.8 393.6 469.4V469.4zM34.46 268.3C31.74 261.8 31.27 254.5 33.08 247.8L329.2 479.8C326.1 479.9 323.1 480 320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3H34.46z"/>
        </svg>

      <svg 
        //toggle show/hide password
        className="icon shown" 
        style={{display: !hidden ? "none" : "block"}} 
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">{/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
        <path 
          onClick={toggleShowPassword}
          id="shown"
          d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/>
        </svg>
      <input
        id="password"
        type={hidden ? "password" : "text"}
        value={input.password}
        onChange={update}       
        name="password"
      />
      </div>     

      <button className="btn-red" type="submit">
        {formType === "login" ? "Log in" : "Sign up"}
      </button>
    </form>


      {errors && <FormErrors formType={formType} />}

      {formType === "login" && 
        <a className="demo" onClick={handleDemoLogin}>
          See what the app has to offer without the hassle of registering an account! Click here to sign in as a demo user.
        </a>
      }

    </div>
  )
}

export default UserForm