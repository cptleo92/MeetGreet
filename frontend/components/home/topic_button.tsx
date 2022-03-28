import React from 'react';

function TopicButton({ topic }: {topic: string}) {
  return (   
    <button className="topic-button">
      {topic}
    </button>  
  );
}

export default TopicButton;