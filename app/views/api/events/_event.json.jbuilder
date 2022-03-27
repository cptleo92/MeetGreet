json.extract! event, :id, :group_id, :host_id, :title, :description, :location, :city, :state, :country, :start_time, :end_time, :public, :capacity
attendees_arr = []
event.attendees.each { |attendee| attendees_arr << attendee.id}
json.attendees attendees_arr

topics_arr = []
event.topics.each { |topic| topics_arr << topic.id}
json.topics topics_arr