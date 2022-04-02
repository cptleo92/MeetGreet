rand_avatar = [
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-del-adams-2444852.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-matheus-bertelli-3856026.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-spencer-gurley-films-1448055.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-viktoria-alipatova-2074130.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-wendy-wei-1190297.jpg",  
]

json.extract! group, :id, :title, :public, :location, :city, :state, :country, :description

if group.avatar.attached?
  json.avatar url_for(group.avatar)
else
  json.avatar rand_avatar.sample
end


# json.extract! group, :id, :title, :public, :location, :city, :state, :country, :description, :events, :topics
# json.members do
#   json.array! group.members do |member|
#     json.partial! 'api/users/user', user: member
#   end
# end