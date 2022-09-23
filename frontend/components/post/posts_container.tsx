import React from 'react'
import { Attendance, Post } from '../../types/types'
import PostItem from './post_item'
import PostsWriteNew from './posts_write_new'
import { useUser } from '../../util/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface PostItemProps {
    posts: Post[];
    entityType: string;
    entityId: number;
}

const PostsContainer = ({ posts, entityType, entityId }: PostItemProps) => {  
  const user = useUser() || -1;
  
  const userCanPost = () => {
    if (entityType === "Event") {
      let attendees: Attendance = useSelector((state: RootState) => state.ui.event.attendances)
      return user.id in attendees;
    }

    if (entityType === "Group") {
      let members = useSelector((state: RootState) => state.ui.group.memberships)
      return user.id in members;
      
    }
  }
  
  return (
    <>           
      { posts.length > 0 &&
        <div className="posts-container">
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
      {userCanPost() && <PostsWriteNew entityType={entityType} entityId={entityId}/> }
    </>
  )
  
}

export default PostsContainer