class User < ApplicationRecord
  attr_reader :password

  validates :fname, :lname, :email, :password_digest, :session_token, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }
  before_validation :ensure_session_token

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