import React, { useState, useEffect } from 'react';
import { Group } from '../../types/types';
import GroupPanelMembers from './group_panel_members';
import GroupPanelOrganizers from './group_panel_organizers';
import GroupEventsList from './group_events_list';
import TopicButton from '../home/topic_button';
import { getGroupTopics } from '../../selectors/selectors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useUser, useLoggedIn } from '../../util/hooks';
import GroupPanelPending from './group_panel_pending';

function GroupAbout({ group }: { group: Group }) {
  const user = useUser();
  const loggedIn = useLoggedIn();
  const userId = loggedIn ? user.id : 0

  const pending = () => {
    return group.organizers.includes(userId) && group.pending.length !== 0
  }

  const groupTopics = useSelector((state: RootState) => getGroupTopics(state, group.id))

  const renderTopics = () => {
    if (groupTopics.length === 0) {
      return (
        <div className="group-no-topics">
          <p>This group has not added any interests</p>
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
          <GroupPanelOrganizers group={group} />
          <GroupPanelMembers group={group} />
          {pending() && <GroupPanelPending group={group} />}
        </div>

        <GroupEventsList group={group} preview={true} pastOnly={false} />
      </div>
      <div className="related-topics">
        <h4>Related Topics</h4>
        {renderTopics()}
      </div>
    </>
  );
}

export default GroupAbout;