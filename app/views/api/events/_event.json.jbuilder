rand_avatar = [
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-del-adams-2444852.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-matheus-bertelli-3856026.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-spencer-gurley-films-1448055.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-viktoria-alipatova-2074130.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-wendy-wei-1190297.jpg",
]

json.extract! event, :id, :group_id, :group_title, :host_id, :host_name, :title, :description, :location, :city, :state, :country, :start_time, :end_time, :public, :capacity

if event.avatar.attached?
  json.avatar url_for(event.avatar)
else
  json.avatar rand_avatar.sample
end

json.attendees event.attendees.pluck("id")
json.topics event.topics.pluck("name")