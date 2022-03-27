class Membership < ApplicationRecord
  validates :member_id, :group_id, presence: true
  validates :organizer, inclusion: {in: [true, false] }

  belongs_to :group
  belongs_to :user,
    foreign_key: :member_id
end