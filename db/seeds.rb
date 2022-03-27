# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

50.times do 
  User.create!(
    fname: Faker::Name.first_name, 
    lname: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: 'password'
  )
end

20.times do 
  rand_title = Faker::Commerce.department
  while Group.find_by(title: rand_title)
    rand_title = Faker::Commerce.department
  end

  Group.create!(
    title: rand_title,
    description: "Placeholder group description",
  )
  
end

(1..50).to_a.each do |id|
  3.times do
    grp_id = rand(1..20)

    membership = Membership.find_by(member_id: id, group_id: grp_id)

    unless membership
      Membership.create!(
        member_id: id,
        group_id: grp_id,
      )
    end  
  end
end

(1..20).to_a.each do |id|
  2.times do
    memberships = Membership.where('group_id = ?', id)
    rand_membership = memberships.sample
    rand_membership.update(organizer: true)
  end
end

20.times do
  Event.create!(
    group_id: rand(1..20),
    host_id: rand(1..50),
    title: Faker::Book.title,
    description: "Placeholder event description",
    location: Faker::Address.city,
    start_time: Time.now,
    end_time: Time.now + 7200,    
  )
end

(1..50).to_a.each do |id|
  2.times do
    ev_id = rand(1..20)

    attendance = Attendance.find_by(attendee_id: id, event_id: ev_id)

    unless attendance
      Attendance.create!(
        attendee_id: id,
        event_id: ev_id,
      )
    end  
  end
end

50.times do 
  rand_id = rand(1..20)
  rand_topic = ["Group", "Event"].sample

  Topic.create!(
    name: Faker::Hobby.activity,
    topicable_id: rand_id,
    topicable_type: rand_topic
  )
end

100.times do
  rand_id = rand(1..50)

  Topic.create!(
    name: Faker::Hobby.activity,
    topicable_id: rand_id,
    topicable_type: "User"
  )
end

User.create!(email: 'demo@fake.com', password: 'password', fname: 'Tester', lname: 'McDemo')

