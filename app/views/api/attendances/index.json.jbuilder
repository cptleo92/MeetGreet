@attendances.each do |attendance|
  json.set! attendance.attendee_id do
    json.extract! attendance, :event_id, :created_at, :id
  end
end

