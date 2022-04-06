class Group < ApplicationRecord
  validates :title, :description, :location, presence: true
  validates :title, uniqueness: true
  validates :public, inclusion: { in: [true, false] }

  has_many :memberships
  has_many :members, through: :memberships, source: :user

  has_many :events

  has_many :topics, as: :topicable, dependent: :destroy

  has_one_attached :avatar

  def organizers    
    User.joins(:memberships).where('organizer = ? and group_id = ?', true, self.id)
  end

  def members
    approved_memberships = Membership.where(group_id: self.id, status: "APPROVED").pluck(:member_id)
    return User.where('id IN (?)', approved_memberships)
  end

  def pending
    Membership.where(group_id: self.id, status: "PENDING").pluck(:member_id)
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

  def self.search(query)
    keywords = query[:keyword].split(" ")

    groups = []

    keywords.each do |keyword|
      groups += Group.where('title ~* :search OR description ~* :search', search: keyword)
      groups += Group.joins(:topics).where("topics.name ~* ?", "#{keyword}")
    end

    unless query[:location] == "" || query[:location].nil?
      groups.filter! {|group| group.location.downcase == query[:location].downcase }
    end

    return groups
  end
end