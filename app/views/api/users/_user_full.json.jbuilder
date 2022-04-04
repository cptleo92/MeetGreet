json.extract! user, :id, :fname, :lname, :email, :location

json.groups user.groups.pluck("id") || []
json.events user.events.pluck("id") || []
json.topics user.topics.pluck("name") || []