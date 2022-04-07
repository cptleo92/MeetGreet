import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

function TopicButton({ topic }: {topic: string}) {
  const navigate = useNavigate();

  const searchTopic = () => {
    navigate(`/search/?${createSearchParams({keyword: topic})}&type=events`)
  }

  return (   
    <button onClick={searchTopic} type="button" className="topic-button">
      {topic}
    </button>  
  );
}

export default TopicButton;