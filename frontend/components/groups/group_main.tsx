import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Group, Membership } from '../../types/types';
import { deleteMembership, createMembership } from '../../actions/users_actions'
import { useUser, useLoggedIn } from '../../util/hooks';
import GroupAbout from './group_about';
import GroupEvents from "./group_events"
import GroupMembers from './group_members';

function GroupMain({ group }: {group: Group}) {
  const user = useUser();
  const loggedIn = useLoggedIn();
  const userId = loggedIn ? user.id : 0
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let membershipsFromStore: Membership[] = useSelector((state: RootState) => state.ui.group.memberships)
  let membership = membershipsFromStore[userId]

  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const leaveGroup = () => {
    // user can't leave if they're the last organizer
    if (group.organizers.length === 1 && group.organizers[0] === userId) {
      setError(true);
      setErrorMsg("Group must have at least 1 organizer!")
      return;
    }

    // user can't leave if group is private and they're attending an event
    if (!group.public && group.events.some(eventId => user.events.indexOf(eventId) >= 0)) {
      setError(true);
      setErrorMsg("You are attending an event! Cancel your RSVPs before leaving.")
      return;
    }

    if (membership !== undefined) {
      setUpdating(true) 
      const membershipId = membership.id
      dispatch(deleteMembership(membershipId))
        .then(() => navigate(0))       
    }
  }

  const joinGroup = () => {
    const status = group.public ? "APPROVED" : "PENDING"
    const data: Membership = {
      member_id: userId,
      group_id: group.id,
      organizer: false,
      status: status
    }
    setUpdating(true)
    dispatch(createMembership(data))
      .then(() => navigate(0))
  }

  const renderButton = () => {
    if (membership === undefined) {
      return (
        <button onClick={joinGroup} className="btn-red">
          {updating ? "Updating..." : "Join group"}
        </button>
      )
    } else {
      switch (membership.status) {
        case "APPROVED":
          return (
            <button onClick={leaveGroup} className="joined">
              {updating ? "Updating..." : "Leave group"}
            </button>
          )
        case "PENDING":
          return (
            <button className="requested">
              {updating ? "Updating..." : "Requested"}
            </button>
          )
        case "REJECTED":
          return (
            <button className="rejected">
              {updating ? "Updating..." : "Request Denied"}
            </button>
          )
      }
    
    }

    if (group.members.includes(userId)) {
      return (
        <button onClick={leaveGroup} className="joined">
          {updating ? "Updating..." : "Leave group"}
        </button>
      )
    } else {
      return (
        <button onClick={joinGroup} className="btn-red">
          {updating ? "Updating..." : "Join group"}
        </button>
      )
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const shown = {
    display: error ? "block" : "none"
  }

  return (
    <div className="group-main">
      <nav className="group-nav body">
        <ul className="group-nav-links">
          <NavLink to="" end>About</NavLink>
          <NavLink to="allevents">Events</NavLink>
          <NavLink to="members">Members</NavLink>          
        </ul> 

        {loggedIn && renderButton()}
        <span style={shown} className="group-error">{errorMsg}</span>
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