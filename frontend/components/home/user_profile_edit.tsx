import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../actions/users_actions';
import { RootState } from '../../store/store';
import { useUser } from '../../util/hooks';
import FormErrors from '../user_forms/form_errors';

export interface newUserType {
  id: number;
  fname: string;
  lname: string;
  location: string;
}

function UserProfileEdit() {
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state: RootState) => state.errors.user)

  const [input, setInput] = useState({
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    location: user.location
  })

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      ...input,
      fname: capitalize(input.fname),
      lnmae: capitalize(input.lname)
    }

    dispatch(updateUser(userData))
      .then(() => navigate("/home"))
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="body group-form">
      <div className="back" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          {/* ! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
          <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" /></svg>
      </div>
      <h2 className="form-header">
        Edit your profile!
      </h2>

      <form onSubmit={submit}>
        <div className="form-line">
          <label htmlFor="fname">First Name</label>
          <input
            id="fname"
            type="text"
            value={input.fname}
            onChange={update}
            name="fname"
          />
        </div>

        <div className="form-line">
          <label htmlFor="lname">Last Name</label>
          <input
            id="lname"
            value={input.lname}
            onChange={update}
            name="lname"
          />
        </div>

        <div className="form-line">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={input.location}
            onChange={update}
            name="location"
          />
        </div>

        <button type="submit" className="btn-red">
          Save
        </button>

        {errors && <FormErrors formType="signup" />}
      </form>
    </div>
  );
}

export default UserProfileEdit;