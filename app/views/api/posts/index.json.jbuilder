@posts.each do |post|
  json.set! post.id do
    author = User.find(post.author_id)
    json.author do
      json.extract! author, :id, :fname, :lname
      if author.avatar.attached?
        json.author_avatar url_for(author.avatar)
      else
        json.author_avatar url_for("https://meetgreet-seed-dev.s3.amazonaws.com/profile_avatar_placeholder_large.png")
      end
    end
    json.extract! post, :id, :body, :created_at, :updated_at
  end
end