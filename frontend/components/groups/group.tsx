import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import GroupHeader from './group_header';
import GroupMain from './group_main';
import { fetchGroups } from '../../util/entities_api_util';
import { useDispatch } from 'react-redux';
import Loading from '../misc/loading';
import { receiveGroups } from '../../actions/groups_actions';
import { GroupEntity } from '../../types/types';

function Group() {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState();
  const dispatch = useDispatch();

  // this seems like an extremely roundabout way to get the group entity to the components after
  // previously, this was my flow:
  // - fetch group(:id) from database
  // - set loading to true after store is updated
  // - render components, which can grab the group from the store themselves as needed
  //
  // i couldn't figure out a way to make it so the components only render when the fetched 
  // group hits the store
  // this is my solution: 
  // - fetch the group directly via AJAX
  // - dispatch/receive the group so the store is updated
  // - pass the group as a prop down and switch loading so the components render

  useEffect(() => {   
    fetchGroups([parsedId])
      .then(((data: GroupEntity) => {
        dispatch(receiveGroups(data))
        setGroup(Object.values(data)[0])
        setLoading(false)
      }))
  },[id])

  return (      
    <div className="group-container">  
      {loading && <Loading />}
      {!loading &&
        <>
        <GroupHeader group={group} />
        <GroupMain group={group} /> 
        </>
      }
    </div>        
    
  ) 
}

export default Group;