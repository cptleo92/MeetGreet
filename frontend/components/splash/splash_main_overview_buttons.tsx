import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../actions/modal_actions";

const SplashMainOverviewButtons = () => {
  const dispatch = useDispatch();  

  return (
    <div className="splash-main-overview-buttons">
      <button className="splash-button">Boost your career</button>
      <button className="splash-button">Find your zen</button>
      <button className="splash-button">Get moving</button>
      <button className="splash-button">Share language + culture</button>
      <button className="splash-button">Read with friends</button>
      <button className="splash-button">Write together</button>
      <button className="splash-button">Hone your craft</button>
    </div>
  )

}

export default SplashMainOverviewButtons