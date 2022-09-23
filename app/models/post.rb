class Post < ApplicationRecord
  validates :author_id, :body, presence: true  

  belongs_to :postable, polymorphic: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id  

  has_many :comments,
    class_name: "Comment",
    foreign_key: :parent_id
end