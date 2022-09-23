@memberships.each do |membership|
  json.set! membership.member_id do
    json.extract! membership, :id, :group_id, :organizer, :created_at, :status, :member_id

    member = User.find(membership.member_id)

    json.member_name member.fname + " " + member.lname

    if member.avatar.attached?
      json.member_avatar url_for(member.avatar)
    else
      json.member_avatar url_for("https://meetgreet-seed-dev.s3.amazonaws.com/profile_avatar_placeholder_large.png")
    end
  end
end

