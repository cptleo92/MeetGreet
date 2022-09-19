require 'open-uri'

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
  devise :omniauthable, omniauth_providers: [:google_oauth2]
  attr_reader :password

  validates :fname, :location, :password_digest, :session_token, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }
  before_validation :ensure_session_token

  has_many :memberships,
    foreign_key: :member_id
  has_many :groups, through: :memberships, inverse_of: :members

  has_many :attendances,
    foreign_key: :attendee_id
  has_many :events, through: :attendances, inverse_of: :attendees

  has_many :hostings, 
    class_name: "Event",
    foreign_key: :host_id

  has_many :topics, as: :topicable, dependent: :destroy

  has_many :posts, 
    foreign_key: :author_id

  has_many :comments, 
    foreign_key: :author_id

  has_one_attached :avatar

  def organizings
    Group.joins(:memberships).where('organizer = ? and member_id = ?', true, self.id)
  end

  def groups
    approved_memberships = Membership.where(member_id: self.id, status: "APPROVED").pluck(:group_id)
    return User.where('id IN (?)', approved_memberships)
  end

  def similar_groups
    topics = self.topics.pluck(:name)
    
    # split multiple word topics and add % for querying
    split_topics = []
    topics.each do |topic|
      split_topics += topic.split(" ")
    end
    split_topics.map! {|topic| "%#{topic}%"}

    Group.joins(:topics).where('name ILIKE ANY ( array[?] )', split_topics)
  end

  # auth-related methods below  
  def self.find_or_create_by_oauth(auth)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first

    unless user
      user = User.create!(
      fname: auth.info.first_name,
      provider: auth.provider,
      uid: auth.uid,
      email: auth.info.email,
      password: Devise.friendly_token[0,20]
    )
    end

    user
  end


  def self.find_by_credentials(email, password)
    return nil if User.find_by(email: email).nil?
    @user = User.find_by(email: email)
    @user.is_password?(password) ? @user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest) == password
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end
end