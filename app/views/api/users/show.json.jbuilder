json.partial! 'api/users/user', user: @user
json.extract! @user, :birthdate, :location, :description

if @user.avatar.attached?
  json.avatar url_for(@user.avatar)
else
  json.avatar "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
end

json.groups @user.groups.pluck("id")
json.events @user.events.pluck("id")
json.topics @user.topics.pluck("name")
