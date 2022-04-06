require 'open-uri'

avatars = [
  "https://meetgreet-seed-dev.s3.amazonaws.com/amos.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/ashford.png",
  "https://meetgreet-seed-dev.s3.amazonaws.com/bill.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/Camina_Drummer_.png",
  "https://meetgreet-seed-dev.s3.amazonaws.com/cat.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/gob.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/greg.jpeg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/holden.png",
  "https://meetgreet-seed-dev.s3.amazonaws.com/jesse.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/logan.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/Marco_Inaros.png",
  "https://meetgreet-seed-dev.s3.amazonaws.com/MichaelScott.png",
  "https://meetgreet-seed-dev.s3.amazonaws.com/miller.jpg"
]

locations = [
  "NYC",
  "Boston",
  "Los Angeles",
  "Toronto",
  "Ceres Station",
  "Mars"
]

demo = User.create!(
  email: 'demo@fake.com', 
  password: 'password', 
  fname: 'Tester', 
  lname: 'McDemo', 
  location: "NYC"
)
# file = URI.open("https://meetgreet-seed-dev.s3.amazonaws.com/kendall570.png")
# demo.avatar.attach(io: file, filename: "kendall570.png")

demo_group = Group.create!(
  title: Faker::Emotion.adjective.capitalize + " " + Faker::Commerce.department,
  description: Faker::Hipster.paragraph,
  location: locations.sample,
  public: false
)

NUM_USERS = 100
NUM_GROUPS = 100
MEM_MULT = rand(4..8) # each user will join this many groups
NUM_EVENTS = 150 # 2x past events, 1x future events
ATTEND_MULT = rand(6..12) # each user will attend this many events

NUM_USERS.times do 
  User.create!(
    fname: Faker::Name.first_name, 
    lname: Faker::Name.last_name,
    location: locations.sample,
    email: Faker::Internet.email,
    password: 'password'
  )
end

# seeding random avatars (WILL UPLOAD TO AWS SO DON'T SEED TOO OFTEN)
# rand_avatars = avatars.shuffle
# rand_avatars.length.times do 
#   rand_url = rand_avatars.shift
#   file = URI.open(rand_url)
#   User.find(rand(50..100)).avatar.attach(io: file, filename: rand_url.slice(44..-1))
# end

# group seeding
NUM_GROUPS.times do 
  rand_title = Faker::Emotion.adjective.capitalize + " " + Faker::Commerce.department
  while Group.find_by(title: rand_title)
    rand_title = Faker::Commerce.department
  end

  Group.create!(
    title: rand_title,
    description: Faker::Hipster.paragraph,
    location: locations.sample,
    public: (rand(1..4) == 1 ? false : true) 
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

# make demo user organizer of demo group
membership = Membership.find_by(member_id: 1, group_id: 1)

if membership
  membership.update(organizer: true)
else
  Membership.create!(
    member_id: 1,
    group_id: 1,
    organizer: true
  )
end


# add some pending requests to demo user's groups
3.times do
  user_id = rand(2..NUM_USERS)
  membership = Membership.find_by(member_id: user_id, group_id: 1)

  if membership
    membership.update(organizer: false, status: "PENDING")
  else
    Membership.create!(
      member_id: user_id,
      group_id: 1,
      organizer: false,
      status: "PENDING"
    )
  end
  
end

# seeding users as group members
(1..NUM_USERS).to_a.each do |id|
  MEM_MULT.times do
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
    location: Group.find(rand_group).location,
    start_time: rand_start,
    end_time: rand_start + rand_duration,
    capacity: (rand(1..4) === 1 ? rand(10..30) : 0)
  )
end

# seeding attendances for future events
(1..NUM_USERS).to_a.each do |id|
  ATTEND_MULT.times do
    ev_id = rand(1..NUM_EVENTS)

    attendance = Attendance.find_by(attendee_id: id, event_id: ev_id)
    event = Event.find(ev_id)
    group = Group.find(event.group_id)

    unless attendance || (event.capacity != 0 && (event.attendees.length >= event.capacity))
      Attendance.create!(
        attendee_id: id,
        event_id: ev_id,
        created_at: Faker::Time.backward(days: 10)
      )

      # if group is private, make sure attendee is in the group as well
      unless group.public?
        membership = Membership.find_by(member_id: id, group_id: event.group_id)
        
        unless membership
          Membership.create!(
            member_id: id,
            group_id: event.group_id,
            created_at: Faker::Time.between_dates(from: Faker::Time.backward(days: 70) , to: Faker::Time.backward(days: 20))
          )
        end
      end      
    end  
  end
end

# past event seeding
(NUM_EVENTS * 2).times do
  rand_start = Faker::Time.backward(days: 60)
  rand_duration = rand(3600.. (3600 * 3))
  rand_group = rand(1..NUM_GROUPS)

  Event.create!(
    group_id: rand_group,
    host_id: rand(1..NUM_USERS),
    title: Faker::Hipster.sentence,
    description: Faker::Hipster.paragraph,
    location: Group.find(rand_group).location,
    start_time: rand_start,
    end_time: rand_start + rand_duration,
    capacity: (rand(1..6) === 1 ? 0 : rand(10..30))
  )
end

# seeding attendances for past events
(1..NUM_USERS).to_a.each do |id|
  ATTEND_MULT.times do
    ev_id = rand((NUM_EVENTS + 1)..(NUM_EVENTS * 2))

    attendance = Attendance.find_by(attendee_id: id, event_id: ev_id)
    event = Event.find(ev_id)
    group = Group.find(event.group_id)

    unless attendance || (event.capacity != 0 && (event.attendees.length >= event.capacity))
      Attendance.create!(
        attendee_id: id,
        event_id: ev_id,
        created_at: Faker::Time.between_dates(from: Faker::Time.backward(days: 60) , to: Faker::Time.backward(days: 30))
      )
    end  

    # if group is private, make sure attendee is in the group as well
    unless group.public?
      membership = Membership.find_by(member_id: id, group_id: event.group_id)
      
      unless membership
        Membership.create!(
          member_id: id,
          group_id: event.group_id,
          created_at: Faker::Time.between_dates(from: Faker::Time.backward(days: 70) , to: Faker::Time.backward(days: 20))
        )
      end
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
(NUM_GROUPS * 2).times do 
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
(NUM_EVENTS * 2).times do 
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



