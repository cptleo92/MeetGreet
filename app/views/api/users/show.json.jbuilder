json.partial! 'api/users/user', user: @user
json.extract! @user, :birthdate, :location, :description

json.groups @user.groups.pluck("id")
json.events @user.events.pluck("id")

json.topics @user.topics.pluck("name")

# probably don't need this much info from these guys
#
# json.groups do
#   json.array! @user.groups do |group|
#     json.partial! 'api/groups/group', group: group
#   end
# end

# json.events do
#   json.array! @user.events do |event|
#     json.partial! 'api/events/event', event: event
#   end
# end