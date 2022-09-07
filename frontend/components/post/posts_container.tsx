import React from 'react'
import { Post } from '../../types/types'
import PostItem from './post_item'
import PostsWriteNew from './posts_write_new'

interface PostItemProps {
    posts: Post[];
    entityType: string;
}

const PostsContainer = ({ posts, entityType }: PostItemProps) => {  
  
  return (
    <>           
      { posts.length > 0 &&
        <div className="posts">
          {
            posts.map(post => <PostItem key={post.id} post={post} />)
          }
        </div>
      }
      { posts.length === 0 &&
          <h3>
            No posts yet!
          </h3>        
      }
      <PostsWriteNew entityType={entityType} />
    </>
  )
  
}

export default PostsContainer