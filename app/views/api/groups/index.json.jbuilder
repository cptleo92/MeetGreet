@groups.each do |group|
  json.set! group.id do
    json.partial! 'api/groups/group', group: group
    
    json.members group.members.pluck("id") || []
    json.events group.events.pluck("id") || []
    json.topics group.topics.pluck("name") || []
    json.organizers group.organizers.pluck("id") || []
  end
end