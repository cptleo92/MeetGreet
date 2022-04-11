import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../actions/modal_actions";

const SplashMainOverviewButtons = () => {
  const dispatch = useDispatch();  

  return (
    <div className="splash-main-overview-buttons">
      <button onClick={() => dispatch(openModal('login'))} className="splash-button">Boost your career</button>
      <button onClick={() => dispatch(openModal('login'))} className="splash-button">Find your zen</button>
      <button onClick={() => dispatch(openModal('login'))} className="splash-button">Get moving</button>
      <button onClick={() => dispatch(openModal('login'))} className="splash-button">Share language + culture</button>
      <button onClick={() => dispatch(openModal('login'))} className="splash-button">Read with friends</button>
      <button onClick={() => dispatch(openModal('login'))} className="splash-button">Write together</button>
      <button onClick={() => dispatch(openModal('login'))} className="splash-button">Hone your craft</button>
    </div>
  )

}

export default SplashMainOverviewButtons