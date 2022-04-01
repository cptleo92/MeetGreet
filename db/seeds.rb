# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user seeding with demo user
User.create!(email: 'demo@fake.com', password: 'password', fname: 'Tester', lname: 'McDemo')

NUM_USERS = 300
NUM_GROUPS = 100
NUM_EVENTS = 150 # 2x past events, 1x future events

NUM_USERS.times do 
  User.create!(
    fname: Faker::Name.first_name, 
    lname: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: 'password'
  )
end

# group seeding
NUM_GROUPS.times do 
  rand_title = Faker::Commerce.department
  while Group.find_by(title: rand_title)
    rand_title = Faker::Commerce.department
  end

  Group.create!(
    title: rand_title,
    description: Faker::Hipster.paragraph,
    location: Faker::TvShows::TheExpanse.location
  )
  
end

# making sure every group has an organizer
# also need to make sure only organizers host events!
(1..NUM_GROUPS).to_a.each do |grp_id|
  user_id = rand(1..NUM_USERS)
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
(1..NUM_USERS).to_a.each do |id|
    rand(3..8).times do
    grp_id = rand(1..NUM_GROUPS)

    membership = Membership.find_by(member_id: id, group_id: grp_id)

    unless membership
      Membership.create!(
        member_id: id,
        group_id: grp_id,
        organizer: (rand(1..6) == 1 ? true : false),
        created_at: Faker::Time.backward(days: 120)
      )
    end  
  end
end

# future event seeding 
NUM_EVENTS.times do
  rand_start = Faker::Time.forward(days: 30)
  rand_duration = rand(3600.. (3600 * 3))
  rand_group = rand(1..NUM_GROUPS)
  rand_organizer = Membership.where(organizer: true, group_id: rand_group).pluck(:member_id)

  Event.create!(
    group_id: rand_group,
    host_id: rand_organizer.sample,
    title: Faker::Book.title,
    description: Faker::Hipster.paragraph,
    location: Faker::Address.city,
    start_time: rand_start,
    end_time: rand_start + rand_duration
  )
end

# seeding attendances for future events
(1..NUM_USERS).to_a.each do |id|
  rand(3..8).times do
    ev_id = rand(1..NUM_EVENTS)

    attendance = Attendance.find_by(attendee_id: id, event_id: ev_id)

    unless attendance
      Attendance.create!(
        attendee_id: id,
        event_id: ev_id,
        created_at: Faker::Time.backward(days: 10)
      )
    end  
  end
end

# past event seeding
(NUM_EVENTS * 2).times do
  rand_start = Faker::Time.backward(days: 60)
  rand_duration = rand(3600.. (3600 * 3))

  Event.create!(
    group_id: rand(1..NUM_GROUPS),
    host_id: rand(1..NUM_USERS),
    title: Faker::Hipster.sentence,
    description: Faker::Hipster.paragraph,
    location: Faker::Address.city,
    start_time: rand_start,
    end_time: rand_start + rand_duration
  )
end

# seeding attendances for past events
(1..NUM_USERS).to_a.each do |id|
  rand(3..8).times do
    ev_id = rand((NUM_EVENTS + 1)..(NUM_EVENTS * 2))

    attendance = Attendance.find_by(attendee_id: id, event_id: ev_id)

    unless attendance
      Attendance.create!(
        attendee_id: id,
        event_id: ev_id,
        created_at: Faker::Time.between_dates(from: Faker::Time.backward(days: 60) , to: Faker::Time.backward(days: 30))
      )
    end  
  end
end

# also making sure hosts are counted as attendees
events = Event.all
events.each do |event|
  attendance = Attendance.find_by(attendee_id: event.host_id, event_id: event.id)

  unless attendance
    Attendance.create!(
      attendee_id: event.host_id,
      event_id: event.id
    )
  end
end

# seeding topics for groups
(NUM_GROUPS * 3).times do 
  rand_id = rand(1..NUM_GROUPS)
  rand_name = Faker::Hobby.activity

  topic = Topic.find_by(name: rand_name, topicable_id: rand_id, topicable_type: "Group")

  unless topic
    Topic.create!(
      name: rand_name,
      topicable_id: rand_id,
      topicable_type: "Group"
    )
  end
end

# seeding topics for events
(NUM_EVENTS * 3).times do 
  rand_id = rand(1..NUM_EVENTS)
  rand_name = Faker::Hobby.activity

  topic = Topic.find_by(name: rand_name, topicable_id: rand_id, topicable_type: "Event")

  unless topic
    Topic.create!(
      name: rand_name,
      topicable_id: rand_id,
      topicable_type: "Event"
    )
  end
end

(NUM_USERS * 3).times do
  rand_id = rand(1..NUM_USERS)
  rand_name = Faker::Hobby.activity

  topic = Topic.find_by(name: rand_name, topicable_id: rand_id, topicable_type: "User")

  unless topic
    Topic.create!(
      name: rand_name,
      topicable_id: rand_id,
      topicable_type: "User"
    )
  end
end



