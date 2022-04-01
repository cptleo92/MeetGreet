json.partial! 'api/users/user', user: @user
json.extract! @user, :birthdate, :location, :description

json.groups @user.groups.pluck("id")
json.events @user.events.pluck("id")
json.topics @user.topics.pluck("name")
