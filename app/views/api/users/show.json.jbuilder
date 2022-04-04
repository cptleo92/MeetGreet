json.partial! 'api/users/user', user: @user
json.extract! @user, :location

if @user.avatar.attached?
  json.avatar url_for(@user.avatar)
else
  json.avatar Faker::Avatar.image
end

json.groups @user.groups.pluck("id") || []
json.events @user.events.pluck("id") || []
json.topics @user.topics.pluck("name") || []
