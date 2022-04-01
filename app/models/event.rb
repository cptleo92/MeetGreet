class Event < ApplicationRecord
  validates :group_id, :host_id, :title, :description, :location, :group_title, :host_name, :start_time, :end_time, presence: true
  validates :public, inclusion: {in: [true, false] }

  before_validation :ensure_group_title_and_host_name

  belongs_to :group

  belongs_to :host,
    class_name: "User",
    foreign_key: :host_id

  has_many :attendances
  has_many :attendees, through: :attendances, source: :user

  has_many :topics, as: :topicable

  def self.starting_soon
    Event.where('start_time > ?', Time.now()).order(start_time: :asc).take(20).shuffle.take(8)
  end

  def ensure_group_title_and_host_name   
    self.group_title = Group.find(group_id).title
    self.host_name = User.find(host_id).fname + " " + User.find(host_id).lname
  end
end