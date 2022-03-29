import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../util/hooks";
import { RootState } from "../../store/store";
import { Group } from "../../types/types";
import { getUserGroups } from "../../selectors/selectors";
import HomeSidebarGroupItem from "./home_sidebar_group_item";

const HomeSidebarGroupsPreview = () => {
  let userGroups: Group[] = useSelector((state: RootState) => getUserGroups(state))
  userGroups = userGroups.slice(0, 5)

  const renderGroups = () => {
    if (userGroups.length === 0) {
      return (
        <div className="no-preview">          
          <strong>You have not joined any groups</strong>
          <a>Discover groups</a>
        </div>
      )
    } else {
      return (                  
        userGroups.map(group => <HomeSidebarGroupItem key={group.id} group={group} />)        
      )
    }  
  }

  return (
    <div className="sidebar-preview">
      {renderGroups()}
    </div>
  )
}

export default HomeSidebarGroupsPreview

