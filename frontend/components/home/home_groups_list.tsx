import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../util/hooks";
import { RootState } from "../../store/store";
import { Group } from "../../types/types";
import { getUserGroups } from "../../selectors/selectors";
import HomeSidebarGroupItem from "./home_sidebar_group_item";

const HomeGroupsList = ({preview, organizerOnly}: { preview: boolean, organizerOnly: boolean}) => {
  const user = useUser();
  let userGroups: Group[] = useSelector((state: RootState) => getUserGroups(state))
  
  if (preview) {
    userGroups = userGroups.slice(0, 5)
  }

  if (organizerOnly) {
    userGroups = userGroups.filter(group => group.organizers.includes(user.id))
  }

  const renderGroups = () => {
    if (userGroups.length === 0) {
      if (preview) {
        return (
          <div className="no-preview">          
          <strong>You have not joined any groups</strong>
          <a>Discover groups</a>
        </div>
        )
      } else {
        return (
          <h2>{organizerOnly ? "You are not organizing any groups!" : "You are not in any groups!"}</h2>
        )
      }
    } else {
      return (                  
        userGroups.map(group => <HomeSidebarGroupItem key={group.id} group={group} />)        
      )
    }  
  }

  return (
    <div className={preview ? "sidebar-preview" : ""}>
      {renderGroups()}
    </div>
  )
}

export default HomeGroupsList

