# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user seeding with demo user
User.create!(email: 'demo@fake.com', password: 'password', fname: 'Tester', lname: 'McDemo')

99.times do 
  User.create!(
    fname: Faker::Name.first_name, 
    lname: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: 'password'
  )
end

# group seeding
50.times do 
  rand_title = Faker::Commerce.department
  while Group.find_by(title: rand_title)
    rand_title = Faker::Commerce.department
  end

  Group.create!(
    title: rand_title,
    description: "Placeholder group description",
    location: Faker::TvShows::TheExpanse.location
  )
  
end

# making sure every group has an organizer
(1..50).to_a.each do |grp_id|
  user_id = rand(1..100)
  membership = Membership.find_by(member_id: user_id, group_id: grp_id)

  unless membership
    Membership.create!(
      member_id: user_id,
      group_id: grp_id,
      organizer: true
    )
  end
end

# seeding users as group members
(1..100).to_a.each do |id|
  3.times do
    grp_id = rand(1..20)

    membership = Membership.find_by(member_id: id, group_id: grp_id)

    unless membership
      Membership.create!(
        member_id: id,
        group_id: grp_id,
        organizer: (rand(1..4) == 1 ? true : false)
      )
    end  
  end
end

# event seeding
25.times do
  rand_start = Faker::Time.forward(days: 30)
  rand_duration = rand(3600.. (3600 * 3))

  Event.create!(
    group_id: rand(1..20),
    host_id: rand(1..50),
    title: Faker::Book.title,
    description: "Placeholder event description",
    location: Faker::Address.city,
    start_time: rand_start,
    end_time: rand_start + rand_duration
  )
end

25.times do
  rand_start = Faker::Time.forward(days: 30)
  rand_duration = rand(3600.. (3600 * 3))

  Event.create!(
    group_id: rand(1..20),
    host_id: rand(1..50),
    title: Faker::Hipster.sentence,
    description: "Placeholder event description",
    location: Faker::Address.city,
    start_time: rand_start,
    end_time: rand_start + rand_duration
  )
end

# seeding attendances
(1..100).to_a.each do |id|
  2.times do
    ev_id = rand(1..50)

    attendance = Attendance.find_by(attendee_id: id, event_id: ev_id)

    unless attendance
      Attendance.create!(
        attendee_id: id,
        event_id: ev_id,
      )
    end  
  end
end

# seeding topics
100.times do 
  rand_id = rand(1..50)
  rand_type = ["Group", "Event"].sample
  rand_name = Faker::Hobby.activity

  topic = Topic.find_by(name: rand_name, topicable_id: rand_id, topicable_type: rand_type)

  unless topic
    Topic.create!(
      name: rand_name,
      topicable_id: rand_id,
      topicable_type: rand_type
    )
  end
end

200.times do
  rand_id = rand(1..100)

  Topic.create!(
    name: Faker::Hobby.activity,
    topicable_id: rand_id,
    topicable_type: "User"
  )
end



