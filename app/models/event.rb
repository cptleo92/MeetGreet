class Event < ApplicationRecord
  validates :group_id, :host_id, :title, :description, :location, :group_title, :capacity, :host_name, :start_time, :end_time, presence: true
  validates :capacity, numericality: { greater_than_or_equal_to: 0 }
  # validate :end_time_must_be_after_start_time, :start_time_must_be_after_now, :capacity_higher_than_attendees

  before_validation :ensure_group_title_and_host_name

  belongs_to :group

  belongs_to :host,
    class_name: "User",
    foreign_key: :host_id

  has_many :attendances
  has_many :attendees, through: :attendances, source: :user

  has_many :topics, as: :topicable, dependent: :destroy

  has_one_attached :avatar

  def self.starting_soon
    Event.where('start_time > ?', Time.now()).order(start_time: :asc).take(20).shuffle.take(8)
  end

  def self.search(query)
    keywords = query[:keyword].split(" ")

    events = []

    keywords.each do |keyword|
      events += Event.where('title ~* :search OR description ~* :search', search: keyword)
      events += Event.joins(:topics).where("topics.name ~* ?", "#{keyword}")
    end

    unless query[:location] == "" || query[:location].nil?
      events.filter! do |event|
        (event.location.downcase == query[:location].downcase) ||
        (event.group.location.downcase == query[:location].downcase)
      end


      if query[:keyword] == "" || query[:keyword].nil?
        events += Event.where('location ~* ?', "#{query[:location]}")
      end
    end

    return events
  end

  def ensure_group_title_and_host_name   
    self.group_title = Group.find(group_id).title
    self.host_name = User.find(host_id).fname + " " + User.find(host_id).lname
  end

  def end_time_must_be_after_start_time
    if self.end_time < self.start_time
      errors.add(:end_time, "must be after the start time")
    end
  end

  def start_time_must_be_after_now
    if self.start_time < Time.now
      errors.add(:start_time, "must be in the future")
    end
  end

  def capacity_higher_than_attendees
    if self.capacity < self.attendees.length && self.capacity != 0
        errors.add(:capacity,"cannot be set lower than current amount of attendees")
    end
  end

  

end