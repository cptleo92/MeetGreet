json.extract! event, :id, :group_id, :group_title, :host_id, :host_name, :title, :description, :location, :city, :state, :country, :start_time, :end_time, :public, :capacity

json.attendees event.attendees.pluck("id")
json.topics event.topics.pluck("name")