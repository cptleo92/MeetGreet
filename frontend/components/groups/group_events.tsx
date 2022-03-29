import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroup } from '../../selectors/selectors';
import { RootState } from '../../store/store';
import { Group } from '../../types/types';

function GroupEvents({ group }: {group: Group}) {
  // const { id } = useParams();
  // const currentGroup = useSelector((state: RootState) => getGroup(state, id))

  return (
    <div>
      Events: {group.events}
    </div>
  );
}

export default GroupEvents;