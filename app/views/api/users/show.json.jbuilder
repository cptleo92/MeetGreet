json.partial! 'api/users/user', user: @user
json.extract! @user, :location

if @user.avatar.attached?
  json.avatar url_for(@user.avatar)
else
  json.avatar url_for("https://meetgreet-seed-dev.s3.amazonaws.com/profile_avatar_placeholder_large.png")
  json.avatar url_for("https://meetgreet-seed-dev.s3.amazonaws.com/miller.jpg") if @user.id == 1
end

json.groups @user.groups.pluck("id") || []
json.events @user.events.pluck("id") || []
json.topics @user.topics.pluck("name") || []
