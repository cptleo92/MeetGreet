class Event < ApplicationRecord
  validates :group_id, :host_id, :title, :description, :location, :group_title, :capacity, :host_name, :start_time, :end_time, presence: true
  validates :capacity, numericality: { greater_than_or_equal_to: 0 }

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

  def ensure_group_title_and_host_name   
    self.group_title = Group.find(group_id).title
    self.host_name = User.find(host_id).fname + " " + User.find(host_id).lname
  end
end