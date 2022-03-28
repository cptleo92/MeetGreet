import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroup } from '../../selectors/selectors';
import { RootState } from '../../store/store';

function Group() {
  const { id } = useParams();
  const group = useSelector((state: RootState) => getGroup(state, id))

  return (
    <div>
      <h1>{group.title}</h1>
      <p>{group.description}</p>
      <p>Members: {group.members.length}</p>
    </div>
  );
}

export default Group;