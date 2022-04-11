import React from "react";
import { useSelector } from "react-redux";
import { useUser } from "../../util/hooks";
import { RootState } from "../../store/store";
import { Group } from "../../types/types";
import { getUserGroups } from "../../selectors/selectors";
import HomeSidebarGroupItem from "./home_sidebar_group_item";
import { Link } from "react-router-dom";

const HomeGroupsList = ({preview, organizerOnly}: { preview: boolean, organizerOnly: boolean}) => {
  const user = useUser();
  let userGroups: Group[] = useSelector((state: RootState) => getUserGroups(state))

  // push pending groups to top if user is organizer
  userGroups.sort((groupA, groupB) => {
    if (groupA.organizers.includes(user.id) && groupA.pending.length !== 0) {
      return -1;
    }
    return 0;
  })
  
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
          <Link to="/search/?keyword=hiking&location=&type=groups">Discover groups</Link>
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

