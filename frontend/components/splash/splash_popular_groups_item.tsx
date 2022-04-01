import React from 'react';
import { Group } from '../../types/types';
import TopicButton from '../home/topic_button';

function SplashPopularGroupsItem({ group }: { group: Group }) {
  return (
    <div className="splash-group-card">
      <div className="item" >
          <div className="avatar"></div>
          <div className="info">
            <p className="title">{group.title}</p>
            <p className="members">{group.members.length} members</p>
          </div>
        </div>
          <TopicButton topic={group.topics[0]} />
    </div>
  );
}

export default SplashPopularGroupsItem;