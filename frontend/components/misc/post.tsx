import React from 'react'
import { Post } from '../../types/types'

const PagePost = ({ post }: { post: Post}) => {
  return (
    <div>
      <p>{post.body}</p>
    </div>
  )
}

export default PagePost