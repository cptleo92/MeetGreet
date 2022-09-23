@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :fname, :lname
    if user.avatar.attached?
      json.avatar url_for(user.avatar)
    else
      json.avatar url_for("https://meetgreet-seed-dev.s3.amazonaws.com/profile_avatar_placeholder_large.png")
      json.avatar url_for("https://meetgreet-seed-dev.s3.amazonaws.com/miller.jpg") if user.id == 1
    end
  end 
end