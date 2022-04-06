import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import GroupHeader from './group_header';
import GroupMain from './group_main';
import { fetchGroups } from '../../util/entities_api_util';
import { useDispatch } from 'react-redux';
import Loading from '../misc/loading';
import { receiveGroups } from '../../actions/groups_actions';
import { Group, GroupEntity } from '../../types/types';
import { fetchEvents } from '../../actions/events_actions';
import { fetchOrganizers, fetchMembers, fetchMemberships } from '../../actions/ui_actions';

function GroupContainer() {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group>();
  const dispatch = useDispatch();

  // this seems like an extremely roundabout way to get the group entity to the components
  // previously, this was my flow:
  // - fetch group(:id) from database so it's added to the store
  // - set loading to true after store is updated
  // - render components, which can grab the group from the store themselves as needed
  //
  // how it works now:  
  // - fetch the group directly via AJAX
  // - dispatch/receive the group so the store is updated
  // - pass the group as a prop down and switch loading so the components render
  // - also add the group's events to the store so I don't have to fetch them every time
  //
  // basically, i'm threading props down which may not be the best practice? 
  //
  // update: now i have this monstrosity 

  useEffect(() => {   
    setLoading(true)
    fetchGroups([parsedId])
      .then(((data: GroupEntity) => {
        dispatch(receiveGroups(data))    
        let group = Object.values(data)[0]   
        setGroup(group)
        dispatch(fetchOrganizers(group))
          .then(() => {
            dispatch(fetchMembers(group))
              .then(() => {
                dispatch(fetchEvents(group.events))
                  .then(() => {
                    dispatch(fetchMemberships(group))   
                      .then(() => setLoading(false))                   
                  })
              })
          })
      }))
  },[id])

  return (      
    <div className="page-container">  
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

export default GroupContainer;