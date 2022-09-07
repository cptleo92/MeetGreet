import React from "react";
import { RootState } from "../../store/store";
import { Post, UserName } from "../../types/types";
import { useSelector } from "react-redux";
import moment from "moment";

const PostItem = ({ post }: { post: Post }) => {
  // taking user info from attendees which should already have everything
  const postAuthor: UserName = useSelector(
    (state: RootState) => state.ui.event.attendees[post.author_id]
  );


  const getDaysAgo = () => {
    return moment.utc(post.created_at).local().startOf('seconds').fromNow()
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
        <div>
          <p className="content-footer">{getDaysAgo()}</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
