@organizers.each do |organizer|
  json.set! organizer.id do 
    json.extract! organizer, :fname, :lname
  end
end

