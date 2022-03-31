import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SplashFooterLinks from "./splash_footer_links";
import SplashFooterSocials from "./splash_footer_socials";
import { openModal } from "../../actions/modal_actions";
import { useLoggedIn } from "../../util/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./modal";
import { RootState } from "../../store/store";

const SplashFooter = () => {  
  const dispatch = useDispatch();
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const modal = useSelector((state: RootState) => state.ui.modal)

  const handleClick = () => {
    loggedIn ? navigate("groups/new") : dispatch(openModal("login"))
  }

  return (
    <footer className="splash-footer">
      {!loggedIn && <Modal modal={modal} /> }
      <div className="splash-footer-body">
        <div className="footer-head">
          <h4>Create your own MeetGreet group.</h4>
          <button className="footer-button" onClick={handleClick}>Get Started</button>
        </div>

        <SplashFooterLinks />
        <SplashFooterSocials />

        <ul className="footer-copy">
          <li>&copy; 2022 MeetGreet</li>
          <li><a>Terms of Service</a></li>
          <li><a>Privacy Policy</a></li>
          <li><a>Cookie Policy</a></li>
          <li><a>Help</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default SplashFooter;