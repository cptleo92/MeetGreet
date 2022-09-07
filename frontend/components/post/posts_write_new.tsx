import React, { useState } from 'react'
import { useUser } from '../../util/hooks'
import { Post } from '../../types/types';
import { createPost } from '../../util/entities_api_util';
import { useNavigate } from 'react-router-dom';


interface PostItemProps {
  entityType: string;
  entityId: number;
}


const PostsWriteNew = ({ entityType, entityId }: PostItemProps) => {
  const currentUser = useUser();
  const navigate = useNavigate();

  const [post, setPost] = useState("")

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost(e.target.value)
  }

  const submit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    
    const newPost: Post = {
      author_id: currentUser.id,
      body: post,
      postable_id: entityId,
      postable_type: entityType,
    }

    createPost(newPost).then(() => navigate(0))
  }

  return (
    <div className="new-post">
      <img className="avatar-round-small" src={currentUser.avatar} />

      <div className="new-post-body">
          <textarea
            placeholder='Add a post...'
            value={post}
            onChange={update}
          />
        </div>

      <div className="new-post-send" onClick={submit}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"/>
          </svg>
      </div>

    </div>
  )
}

export default PostsWriteNew