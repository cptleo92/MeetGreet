import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getGroup } from '../../selectors/selectors';
import { RootState } from '../../store/store';
import Missing from '../misc/missing';
import GroupHeader from './group_header';

function Group() {
  const { id } = useParams();
  const group = useSelector((state: RootState) => getGroup(state, id))

  return (
    <div className="group-main body">
      <GroupHeader group={group} />
      {/* <GroupMain group={group} /> */}
    </div>
  );
}

export default Group;