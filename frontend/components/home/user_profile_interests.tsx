import React from 'react';
import { useUser } from '../../util/hooks';
import TopicButton from './topic_button';
import { Link } from 'react-router-dom';

function UserProfileInterests() {
  const user = useUser();

  return (
    <div className="profile-interests">
      <div className="header">
        <h2>Interests</h2>
        <Link to="/home/interests/edit">Edit Interests</Link>
      </div>
      {
        user.topics.map((topic, idx) => <TopicButton key={idx} topic={topic} />)
      }
    </div>
  );
}

export default UserProfileInterests;