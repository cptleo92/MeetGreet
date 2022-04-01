import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Routes, Route } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Group, Membership } from '../../types/types';
import { deleteMembership, createMembership } from '../../actions/users_actions'
import { useUser } from '../../util/hooks';
import GroupAbout from './group_about';
import GroupEvents from "./group_events"
import GroupMembers from './group_members';
import { fetchMemberships } from '../../actions/ui_actions';

function GroupMain({ group }: {group: Group}) {
  const user = useUser();
  const dispatch = useDispatch();
  let membershipsFromStore = useSelector((state: RootState) => state.ui.group.memberships)
  let membership = membershipsFromStore[user.id]

  // const [memberships, setMemberships] = useState(Object.values(membershipsFromStore))
  const [updating, setUpdating] = useState(false);

  // const updateMemberships = () => {
  //   membershipsFromStore = useSelector((state: RootState) => state.ui.group.memberships)
  //   setMemberships(Object.values(membershipsFromStore))
  //   setUpdating(false)
  // }

  const leaveGroup = () => {
    if (membership !== undefined) {
      setUpdating(true)
      const membershipId = membership.id
      dispatch(deleteMembership(membershipId))
          .then(() => setTimeout(() => {
            // setUpdating(false)
            window.location.reload(false)
          }, 0))
    }
  }

  const joinGroup = () => {
    const data: Membership = {
      member_id: user.id,
      group_id: group.id,
      organizer: false
    }
    setUpdating(true)
    dispatch(createMembership(data))
      .then(() => setTimeout(() => {
        // setUpdating(false)
        window.location.reload(false)
      }, 0))
  }

  const pending = {
    opacity: 50
  }

  const renderButton = () => {
    if (group.members.includes(user.id)) {
      return (
        <button style={pending} onClick={leaveGroup} className="joined">
          {updating ? "Updating..." : "You're a member"}
        </button>
      )
    } else {
      return (
        <button style={pending} onClick={joinGroup} className="btn-red">
          {updating ? "Updating..." : "Join this group"}
        </button>
      )
    }
  }

  return (
    <div className="group-main">
      <nav className="group-nav body">
        <ul className="group-nav-links">
          <NavLink to="" end>About</NavLink>
          <NavLink to="allevents">Events</NavLink>
          <NavLink to="members">Members</NavLink>          
          <li><a>Photos</a></li>
          <li><a>Discussions</a></li>
          <li><a>More</a></li>
        </ul> 

        {renderButton()}
      </nav>

      <div className="content-bg">
        <div className="body">
          <Routes>
            <Route index element={<GroupAbout group={group}/>} />
            <Route path="allevents/*" element={<GroupEvents group={group}/>} />
            <Route path="members/*" element={<GroupMembers group={group}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default GroupMain;