import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getGroup } from '../../selectors/selectors';
import { RootState } from '../../store/store';
import Missing from '../misc/missing';

function Group() {
  const { id } = useParams();
  const group = useSelector((state: RootState) => getGroup(state, id))

  // group disappears from state after refresh so for now...
  if (group === undefined) {
    return (
      <Missing />
    )
  }

  return (
    <div className="body">
      <h1>{group.title}</h1>
      <p>{group.description}</p>
      <p>Members: {group.members.length}</p>
    </div>
  );
}

export default Group;