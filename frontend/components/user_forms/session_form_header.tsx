import React from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../actions/modal_actions";

const SessionFormHeader = ({ formType }: {formType: string}) => {
  const dispatch = useDispatch();

  let head: string, text: string, link: string;
  if (formType === "login") {
    head = "Log in"
    text = "Not a member yet?"
    link = "Sign up"
  } else if (formType === "signup") {
    head = "Sign up"
    text = "Already a member?"
    link = "Log in"
  }

  const handleToggle = () => {
    if (formType === "login") {
      // dispatch(closeModal());
      dispatch(openModal("signup"))
    } else {
      // dispatch(closeModal());
      dispatch(openModal("login"))
    }
  }

  return (
    <div className="session-header">
      <span className="close" onClick={() => dispatch(closeModal())}>x</span>
      <img
        src={window.smallLogo}
        alt="meetgreet logo"        
      />   
      <h3>{head}</h3>
      <p>{text} <a href="#" onClick={handleToggle}>{link}</a></p>      
      
    </div>
  )
}

export default SessionFormHeader