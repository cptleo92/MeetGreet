import React, { useState } from 'react'
import { useUser } from '../../util/hooks'

interface PostItemProps {
  entityType: string;
}


const PostsWriteNew = ({ entityType }: PostItemProps) => {
  const currentUser = useUser();

  const [post, setPost] = useState("")

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost(e.target.value)
  }

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
  }

  return (
    <div className="posts-write-new">
      <img className="avatar-round-small" src={currentUser.avatar} />

      <div className="form-line">
          <textarea
            placeholder='Add a post...'
            value={post}
            onChange={update}
          />
        </div>

        <button type="button" onClick={submit} className="btn-red">
          Post!
        </button>
    </div>
  )
}

export default PostsWriteNew