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

  def self.popular
    popularHash = {}
    Group.all.each do |group|
      popularHash[group.id] = group.members.length
    end    
    result = popularHash.sort_by { |id, members| -members} # sort by amount of members, desc
    result = result.take(20).shuffle.take(8).map {|res| res[0]} # pick out 8 random groups
    result = result.map{|res| Group.find(res)} # turn it into an array of Groups
    return result
  end
end