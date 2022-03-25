import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../actions/modal_actions";

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

  return (
    <div className="session-header">
      <span className="close" onClick={() => dispatch(closeModal())}>x</span>
      <img
        src={window.smallLogo}
        alt="meetgreet logo"        
      />   
      <h3>{head}</h3>
      <p>{text} <a href="#">{link}</a></p>      
      
    </div>
  )
}

export default SessionFormHeader