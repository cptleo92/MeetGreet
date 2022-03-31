import React from "react";
import { useNavigate } from "react-router-dom";
import { Group } from "../../types/types";

const HomeSidebarGroupItem = ({ group }: {group: Group}) => {
  const navigate = useNavigate();
  const goToGroup = () => {
    navigate(`/groups/${group.id}`)
  }

  return (
    <div className="sidebar-group-item">
      <div className="avatar"></div>
      <a onClick={goToGroup}>{group.title}</a>
    </div>
  )
}

export default HomeSidebarGroupItem