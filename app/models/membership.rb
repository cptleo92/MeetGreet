class Membership < ApplicationRecord
  validates :member_id, :group_id, presence: true
  validates :status, inclusion: {in: ["APPROVED", "PENDING", "REJECTED"] }
  validates :organizer, inclusion: {in: [true, false] }

  belongs_to :group
  belongs_to :user,
    foreign_key: :member_id

  def pending_requests
    Group.where(status: "PENDING")
  end
end