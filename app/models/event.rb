class Event < ApplicationRecord
  validates :group_id, :host_id, :title, :description, :location, :start_time, :end_time, presence: true
  validates :public, inclusion: {in: [true, false] }

  belongs_to :group

  belongs_to :host,
    class_name: "User",
    foreign_key: :host_id

  has_many :attendances
  has_many :attendees, through: :attendances, source: :user

  has_many :topics, as: :topicable
end