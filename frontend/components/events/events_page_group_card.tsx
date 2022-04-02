import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '../../types/types';

function EventsPageGroupCard({ group }: { group: Group }) {
  const navigate = useNavigate();

  const linkToGroup = () => {
    navigate(`/groups/${group.id}`)
  }

  return (
    <div className="group-card" onClick={linkToGroup}>
      <img className="avatar-square" src={group.avatar}/>
      <div className="group-info">
        <h5>{group.title}</h5>
        <p className="type">{group.public ? "Public" : "Private"} group</p>
      </div>
    </div>
  );
}

export default EventsPageGroupCard;