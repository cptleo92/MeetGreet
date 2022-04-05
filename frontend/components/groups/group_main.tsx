import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Group, Membership } from '../../types/types';
import { deleteMembership, createMembership } from '../../actions/users_actions'
import { useUser } from '../../util/hooks';
import GroupAbout from './group_about';
import GroupEvents from "./group_events"
import GroupMembers from './group_members';
import { openModal } from '../../actions/modal_actions';


function GroupMain({ group }: {group: Group}) {
  const user = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let membershipsFromStore = useSelector((state: RootState) => state.ui.group.memberships)
  let membership = membershipsFromStore[user.id]

  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const leaveGroup = () => {
    // user can't leave if they're the last organizer
    if (group.organizers.length === 1 && group.organizers[0] === user.id) {
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
    const data: Membership = {
      member_id: user.id,
      group_id: group.id,
      organizer: false
    }
    setUpdating(true)
    dispatch(createMembership(data))
      .then(() => navigate(0))
  }

  const renderButton = () => {
    if (group.members.includes(user.id)) {
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
          <li><a>Photos</a></li>
          <li><a>Discussions</a></li>
          <li><a>More</a></li>
        </ul> 

        {renderButton()}
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