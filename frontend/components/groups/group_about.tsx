import React, { useState, useEffect } from 'react';
import { Group } from '../../types/types';
import GroupPanelMembers from './group_panel_members';
import GroupPanelOrganizers from './group_panel_organizers';
import GroupEventsList from './group_events_list';
import TopicButton from '../home/topic_button';
import { getGroupTopics } from '../../selectors/selectors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function GroupAbout({ group }: {group: Group}) {


  const groupTopics = useSelector((state: RootState) => getGroupTopics(state, group.id))

  const renderTopics = () => {
    if (groupTopics.length === 0) {
      return (
        <div className="no-preview">
          <strong>This group has not added any interests</strong>
        </div>
      )
    } else {
      return (
        groupTopics.map((topic, idx) => <TopicButton key={idx} topic={topic} />)
      )
    }
  }

  return (
    <>
    <div className="group-about">
      <div className="description">
        <h4>What we're about</h4>
        <p>{group === undefined ? "" : group.description}</p>
      </div>

      <div className="members-panel">
        <GroupPanelOrganizers group={group}/>
        <GroupPanelMembers group={group} />
      </div>

      <GroupEventsList group={group} preview={true} pastOnly={false} />
    </div>
        <div className="related-topics">
        <p>Related Topics</p>
        {renderTopics()}
    </div>
    </>
  );
}

export default GroupAbout;