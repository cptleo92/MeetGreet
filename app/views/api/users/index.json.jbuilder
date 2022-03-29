@users.each do |user|
  json.set! user.id do
    json.extract! user, :fname, :lname
  end 
end