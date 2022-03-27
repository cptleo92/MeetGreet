json.extract! group, :id, :title, :public, :location, :city, :state, :country, :description

# json.extract! group, :id, :title, :public, :location, :city, :state, :country, :description, :events, :topics
# json.members do
#   json.array! group.members do |member|
#     json.partial! 'api/users/user', user: member
#   end
# end