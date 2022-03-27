class Group < ApplicationRecord
  validates :title, :description, presence: true
  validates :title, uniqueness: true
  validates :public, inclusion: { in: [true, false] }

  has_many :memberships
  has_many :members, through: :memberships, source: :user

  has_many :events

  has_many :topics, as: :topicable

  def organizers    
    User.joins(:memberships).where('organizer = ? and group_id = ?', true, self.id)
  end
end