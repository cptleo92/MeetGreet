@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :fname, :lname
    if user.avatar.attached?
      json.avatar url_for(user.avatar)
    else
      json.avatar "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    end
  end 
end