import React from "react";
import { RootState } from "../../store/store";
import { Post, UserName } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useUser } from "../../util/hooks";
import { deletePost } from "../../actions/users_actions";

const PostItem = ({ post }: { post: Post }) => {
  // taking user info from attendees which should already have everything
  const postAuthor: UserName = useSelector(
    (state: RootState) => state.ui.event.attendees[post.author_id]
  );

  const currentUser = useUser();
  const belongsToUser = post.author_id === currentUser?.id;
  
  const dispatch = useDispatch();

  const getDaysAgo = () => {
    return moment.utc(post.created_at).local().startOf('seconds').fromNow()
  }

  const removePost = () => {
    if (belongsToUser) {
      dispatch(deletePost(post))
    }
  }


  return (
    <div className="page-post">
      <img className="avatar-round-small" src={postAuthor.avatar} />
      <div className="content">
        <div className="content-body">

            <p className="author">
              {postAuthor.fname} {postAuthor.lname}
            </p>            

          <p>{post.body}</p>
        </div>

       
        <div className="content-footer">
          <p>{getDaysAgo()}</p>          
          { belongsToUser && 
          <div className="post-delete" onClick={removePost}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </div>
          }
         </div>        

      </div>
    </div>
  );
};

export default PostItem;
