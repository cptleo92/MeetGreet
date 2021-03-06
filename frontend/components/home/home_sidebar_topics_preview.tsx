import React from 'react';
import { useSelector } from 'react-redux';
import { getUserTopics } from '../../selectors/selectors';
import { RootState } from '../../store/store';
import { useUser } from '../../util/hooks';
import TopicButton from './topic_button';

function HomeSidebarTopicsPreview() {
  const currentUser = useUser();
  let userTopics = useSelector((state: RootState) => getUserTopics(state, currentUser.id))  

  const renderTopics = () => {
    if (userTopics.length === 0) {
      return (
        <div className="no-preview">
          <strong>You have not added any interests</strong>          
        </div>
      )
    } else {
      return (
        userTopics.map((topic, idx) => <TopicButton key={idx} topic={topic} />)
      )
    }
  }

  return (
    <div className="sidebar-preview topics">
      {renderTopics()}
    </div>
  );
}

export default HomeSidebarTopicsPreview;