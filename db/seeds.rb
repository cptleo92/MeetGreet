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
  "https://meetgreet-seed-dev.s3.amazonaws.com/miller.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/roy.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/shiv.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/tom.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/walter_white.png"
]

group_avatars = [
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-del-adams-2444852.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-matheus-bertelli-3856026.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-spencer-gurley-films-1448055.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-viktoria-alipatova-2074130.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-wendy-wei-1190297.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-matheus-bertelli-2467506.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-fu-zhichao-587741.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-marcin-dampc-1684187.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-elle-hughes-1549196.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-fauxels-3183197.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-del-adams-2444852.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-eberhard-grossgasteiger-707344.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-cedric-fauntleroy-7219246.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-christina-morillo-1181438.jpg",
  "https://meetgreet-seed-dev.s3.amazonaws.com/pexels-belle-co-1000445.jpg"
]

locations = [
  "NYC",
  "Boston",
  "Los Angeles",
  "Toronto",
  "Mars",
  "Ceres",
  "Winterfell",
  "Pawnee",
  "Scranton",
  "Eagleton",
  "London",
  "Barcelona",
  "San Francisco",
  "Vancouver",
  "Paris",
  "Queens",
  "NYC" # padding this since why not!
]

group_template = [
  "_topic_ enthusiasts of _location_!",
  "_location_'s _topic_ Group",
  "Explore _topic_ in _location_ - Free!",
  "We love _topic_!",
  "Make friends in _location_!",
  "Meet fellow _topic_ lovers",
  "_location_ - Serious _topic_ Connoisseurs",
  "FREE! _location_ _topic_ Socializers",
  "Outstanding _topic_ Association of _location_!"
]

event_template = [
  "Free _topic_ at the park",
  "_topic_ and socializing after work",
  "Boozy brunch and _topic_!",
  "Professional-level _topic_ - $10 entry",
  "Beginner-level _topic_ - Free!",
  "Practice _topic_ with new friends",
  "ONLINE ONLY! _topic_ competition",
  "_topic_ classes ft. John Bar",
  "Learn _topic_ fast!",
  "_topic_ and the Soul: A Formal Discussion"
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
  title: group_template.sample,
  description: Faker::Hipster.paragraphs.join("\n\n"),
  location: locations.sample,
  public: false
)

NUM_USERS = 40
NUM_GROUPS = 30
MEM_MULT = rand(8..12) # each user will join this many groups
NUM_EVENTS = 30 # 2x past events, 1x future events
ATTEND_MULT = rand(8..12) # each user will attend this many events

NUM_USERS.times do 
  User.create!(
    fname: Faker::Name.first_name, 
    lname: Faker::Name.last_name,
    location: locations.sample,
    email: Faker::Internet.email,
    password: 'password'
  )
end

# MAKE SURE TO ENABLE THIS OUTSIDE OF TESTING
# seeding random avatars (WILL UPLOAD TO AWS SO DON'T SEED TOO OFTEN)
# rand_avatars = avatars.shuffle
# rand_avatars.length.times do 
#   rand_url = rand_avatars.shift
#   file = URI.open(rand_url)
#   User.find(rand(2..NUM_USERS)).avatar.attach(io: file, filename: rand_url.slice(44..-1))
# end

# group seeding
NUM_GROUPS.times do 
  # leaving this in even though the title will be overwritten later since I need unique ones anyway
  rand_title = Faker::Emotion.adjective.capitalize + " " + Faker::Commerce.department
  while Group.find_by(title: rand_title)
    rand_title = Faker::Commerce.department
  end

  Group.create!(
    title: rand_title,
    description: Faker::Hipster.paragraphs.join("\n\n"),
    location: locations.sample,
    public: (rand(1..4) == 1 ? false : true) 
  )
  
end

# seeding topics for groups
3.times do 
  (1..NUM_GROUPS + 1).to_a.each do |group_id|
    rand_name = Faker::Hobby.activity

    topic = Topic.find_by(name: rand_name, topicable_id: group_id, topicable_type: "Group")

    unless topic
      Topic.create!(
        name: rand_name,
        topicable_id: group_id,
        topicable_type: "Group"
      )
    end
  end
end

# rewrite group titles 
Group.all.each do |group|
  new_title = group_template.sample 

  if new_title.include?("_topic_")
    new_title = new_title.split("_topic_").join(group.topics.sample.name)
  end

  if new_title.include?("_location_")
    new_title = new_title.split("_location_").join(group.location)
  end

  group.update(title: new_title)
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
    description: Faker::Hipster.paragraphs.join("\n\n"),
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
    description: Faker::Hipster.paragraphs.join("\n\n"),
    location: Group.find(rand_group).location,
    start_time: rand_start,
    end_time: rand_start + rand_duration,
    capacity: (rand(1..6) === 1 ? 0 : rand(10..30))
  )
end

# seeding attendances for past events
(1..NUM_USERS + 1).to_a.each do |id|
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

# seeding topics for events
Event.all.each do |event|
  rand_name = event.group.topics.sample.name

  topic = Topic.find_by(name: rand_name, topicable_id: event.id, topicable_type: "Event")

  unless topic
    Topic.create!(
      name: rand_name,
      topicable_id: event.id,
      topicable_type: "Event"
    )
  end
end

# rewrite event titles 
Event.all.each do |event|
  new_title = event_template.sample
  new_title = new_title.split("_topic_").join(event.topics.sample.name)
  event.update(title: new_title)
end

# give demo user random topics
7.times do 
  rand_name = Faker::Hobby.activity

  topic = Topic.find_by(name: rand_name, topicable_id: 1, topicable_type: "User")

  unless topic
    Topic.create!(
      name: rand_name,
      topicable_id: 1,
      topicable_type: "User"
    )
  end
end

# seed posts for random events
Event.all.each do |event|
  if rand(1..2) == 1
    Post.create!(
      body: Faker::TvShows::TheExpanse.quote,
      author_id: rand(1..NUM_USERS),
      postable_type: "Event",
      postable_id: event.id
    )
  end
end

# seed posts for random groups
Group.all.each do |group|
  if rand(1..2) == 1
    Post.create!(
      body: Faker::TvShows::MichaelScott.quote,
      author_id: rand(1..NUM_USERS),
      postable_type: "Group",
      postable_id: group.id
    )
  end
end

# seed child posts 
Post.all.each do |post|
  if rand(1..2) == 1
    Post.create!(
      body: Faker::TvShows::StrangerThings.quote,
      author_id: rand(1..NUM_USERS),
      parent_id: post.id,
      postable_type: post.postable_type,
      postable_id: post.postable_id
    )
  end
end

# one more time so new child posts can possibly have children
Post.all.each do |post|
  if rand(1..2) == 1
    Post.create!(
      body: Faker::GreekPhilosophers.quote,
      author_id: rand(1..NUM_USERS),
      parent_id: post.id,
      postable_type: post.postable_type,
      postable_id: post.postable_id
    )
  end
end

# seeding random group and event avatars
Group.all.each do |group|
  rand_url = group_avatars.sample
  file = URI.open(rand_url)
  group.avatar.attach(io: file, filename: rand_url.slice(44..-1))
end

Event.all.each do |event|
  group = Group.find(event.group_id)
  event.avatar.attach group.avatar.blob
end

# no need to seed topics for other users at the moment

# (NUM_USERS * 3).times do
#   rand_id = rand(1..NUM_USERS)
#   rand_name = Faker::Hobby.activity

#   topic = Topic.find_by(name: rand_name, topicable_id: rand_id, topicable_type: "User")

#   unless topic
#     Topic.create!(
#       name: rand_name,
#       topicable_id: rand_id,
#       topicable_type: "User"
#     )
#   end
# end




