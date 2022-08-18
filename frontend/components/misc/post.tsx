import React from 'react'
import { Post } from '../../types/types'

const PagePost = ({ post }: { post: Post}) => {
  return (
    <div className="post-item">
      <img className="avatar-round" src={post.author.author_avatar}/>
      <div className="post-body">
        <p className="post-author">{`${post.author.fname} ${post.author.lname}`}</p>
        <p>{post.body}</p>
      </div>
    </div>
  )
}

export default PagePost