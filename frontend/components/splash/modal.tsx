import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import UserForm from "../user_forms/user_form";
import AttendeesModal from "../events/attendees_modal";
import HomeGetUserLocation from "../home/home_get_user_location";

const Modal = ({ modal }: {modal: string}) => { 

  if (!modal) {
    return null;
  }

  const dispatch = useDispatch();

  let component;
  switch (modal) {
    case 'login':
      component = <UserForm formType={'login'} />
      break;
    case 'signup':
      component = <UserForm formType={'signup'}/>
      break;
    case 'attendees':
      component = <AttendeesModal />
      break;
    case 'user-location':
      component = <HomeGetUserLocation />
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={() => dispatch(closeModal())}>
  
      <div
        className="modal-child animate__animated animate__fadeIn animate__faster" 
        onClick={e => e.stopPropagation()}>
        { component }
      </div>

    </div>
  )
}

export default Modal;
