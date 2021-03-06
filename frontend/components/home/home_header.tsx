import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/session_actions";
import { createSearchParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLoggedIn, useUser } from "../../util/hooks";
import { RootState } from "../../store/store";
import Modal from "../splash/modal";

const HomeHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();
  const loggedIn = useLoggedIn();
  const [searchParams] = useSearchParams();
  const modal = useSelector((state: RootState) => state.ui.modal)

  const getParams = () => {
    return {
      keyword: searchParams.get("keyword") || "",
      location: searchParams.get("location") || ""
    }
  }

  const [searchInput, setSearchInput] = useState(getParams())

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput({
      ...searchInput,
      [e.target.name]: e.target.value
    })
  }

  const goHome = () => {
    navigate("/home");
  }

  const handleLogout = () => {
    goHome();
    dispatch(logout());
  }

  const handleCreateGroup = () => {
    loggedIn ? navigate("groups/new") : navigate("/login")
  }

  const handleSearch = () => {
    navigate(`/search/?${createSearchParams(searchInput)}&type=events`)
  }

  useEffect(() => {
    window.scrollTo(0,0)
    getParams();
  }, [searchParams])

  return (
    <nav className="splash-header-nav home-header">
      <Modal modal={modal} />
      <img
        src={window.smallLogo}
        alt="meetgreet logo"
        className="splash-header-logo"
        onClick={goHome}
      />

      <div className="header-search">
        <input
          type="text"
          placeholder='Search for keywords'
          value={searchInput.keyword}
          name="keyword"
          onChange={update}
        />

        <input
          type="text"
          placeholder='Search by city'
          value={searchInput.location}
          name="location"
          onChange={update}
        />
        <button className="btn-red" onClick={handleSearch}>
          {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.  */}
          <svg className="svg-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" /></svg>
        </button>
      </div>

      {loggedIn &&
        <ul className="splash-header-nav-right">
          <li className="create-group">
            <a onClick={handleCreateGroup}>Create a new group!</a>
          </li>
          <li className="login">
            <a onClick={handleLogout}>Log out</a>
          </li>
          <li><Link to="/myprofile">Your Profile</Link></li>
          <Link to="/myprofile"><img className="avatar-round-small" src={user.avatar} /></Link>
        </ul>
      }

      {!loggedIn &&
        <ul className="splash-header-nav-right">
          <li className="splash-header-nav-right-login">
            <a onClick={() => navigate("/login")}>Log in</a>
          </li>
          <li className="splash-header-nav-right-signup">
            <a onClick={() => navigate("/signup")}>Sign up</a>
          </li>
        </ul>
      }

    </nav>
  )
}

export default HomeHeader;