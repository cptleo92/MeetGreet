import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const FormErrors = ({ formType }: {formType: string}) => {
  const errors = useSelector((state: RootState) => {
    // if (formType === "login") {
    //   return state.errors.session;
    // } else {
    //   return state.errors.user;
    // }

    switch(formType) {
      case "login":
        return state.errors.session;
      case "signup":
        return state.errors.user;
      case "group":
        return state.errors.group;
      default:
        return;
    }
  })

  return (
    <div className="form-errors">
      <ul>
        {
          errors.map((err: string, idx: number) => {
            return (
              <li key={idx} className="error">{err}</li>
            )
          })
        }
      </ul>            
    </div>
  )
}

export default FormErrors;