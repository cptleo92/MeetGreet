import React from 'react';
import { Group } from '../../types/types';
import TopicButton from '../home/topic_button';
import { generateGroupPath } from '../../util/group_util';
import { Link } from 'react-router-dom';

function SplashPopularGroupsItem({ group }: { group: Group }) {
  return (

    <div className="splash-group-card">
      <div className="item" >
        <img className="avatar-round" src={group.avatar} />
        <Link to={generateGroupPath(group)}>
          <div className="info">
            <p className="title">{group.title}</p>
            <p className="members">{group.members.length} members</p>
          </div>
        </Link>
      </div>
      <TopicButton topic={group.topics[0]} />
    </div>
  );
}

export default SplashPopularGroupsItem;