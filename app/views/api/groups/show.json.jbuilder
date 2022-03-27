json.partial! 'api/groups/group', group: @group

json.members @group.members.pluck("id")
json.events @group.events.pluck("id")
json.topics @group.topics.pluck("name")

organizers_arr = []
@group.organizers.each { |org| organizers_arr << org.id }

json.organizers organizers_arr
