class Attendance < ApplicationRecord
  validates :attendee_id, :event_id, presence: true

  belongs_to :user, foreign_key: :attendee_id
  belongs_to :event

end