class Topic < ApplicationRecord
  validates :name, presence: true

  belongs_to :topicable, polymorphic: true

end