@memberships.each do |membership|
  json.set! membership.member_id do
    json.extract! membership, :group_id, :organizer, :created_at, :id
  end
end

