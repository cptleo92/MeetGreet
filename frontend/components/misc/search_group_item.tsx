import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Group } from '../../types/types';

function SearchGroupItem({ group }: { group: Group }) {

  const truncate = (string: string) => {
    if (string.length > 123) {
      return string.slice(0, 120) + "..."
    } else {
      return string
    }
  }

  return (
    <Link to={`/groups/${group.id}`}>
    <div className="search-item">
      <img className="avatar-medium-long" src={group.avatar}></img>
      <div className="group-search-info">
        <h3>{group.title}</h3>
        <p className="location">{group.location}</p>
        <p className="description">{truncate(group.description)}</p>
        <p className="members-privacy">
          {group.members.length} member{group.members.length === 1 ? "" : "s"} - {group.public ? "Public" : "Private"}
        </p>
      </div>
    </div>
    </Link>
  )
}

export default SearchGroupItem;