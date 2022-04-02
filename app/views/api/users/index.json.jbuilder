@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :fname, :lname
    if user.avatar.attached?
      json.avatar url_for(user.avatar)
    else
      json.avatar Faker::Avatar.image
    end
  end 
end