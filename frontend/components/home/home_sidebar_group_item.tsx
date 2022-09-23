import React from "react";
import { useNavigate } from "react-router-dom";
import { Group } from "../../types/types";
import { useUser } from "../../util/hooks";

const HomeSidebarGroupItem = ({ group }: {group: Group}) => {
  const user = useUser();
  const navigate = useNavigate();
  const goToGroup = () => {
    navigate(`/groups/${group.id}`)
  }

  const showPending = () => {
    return group.pending.length !== 0 && group.organizers.includes(user.id)
  }

  return (
    <div className="sidebar-group-item">
      <img className="avatar-round" src={group.avatar}/>
      <div className="group-info">
        <a onClick={goToGroup}>{group.title}</a>
        {showPending() && <p className="pending">Pending requests!</p> }
      </div>
    </div>
  )
}

export default HomeSidebarGroupItem