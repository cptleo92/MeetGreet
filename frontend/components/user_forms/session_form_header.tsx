import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { closeModal, openModal } from "../../actions/modal_actions";

const SessionFormHeader = ({ formType }: {formType: string}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isModal = () => {
    return !pathname.includes("login") && !pathname.includes("signup")
  }

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

  const navigate = useNavigate();

  const handleToggle = () => {
    if (!isModal()) {
      if (formType === "login") {
        navigate("/signup")
      } else {
        navigate("/login")
      }
    } else {      
      if (formType === "login") {
        dispatch(openModal("signup"))
      } else {
        dispatch(openModal("login"))
      }
    }
  }

  return (
    <div className="session-header">
      { isModal() && <span className="close" onClick={() => dispatch(closeModal())}>x</span> }
      <img
        src={window.smallLogo}
        alt="meetgreet logo"        
      />   
      <h3>{head}</h3>
      <p>{text} <a onClick={handleToggle}>{link}</a></p>      
      
    </div>
  )
}

export default SessionFormHeader