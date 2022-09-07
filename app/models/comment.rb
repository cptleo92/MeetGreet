class Comment < ApplicationRecord
    validates :author_id, :body, :parent_id, presence: true  
  
    belongs_to :postable, polymorphic: true
  
    belongs_to :author,
      class_name: "User",
      foreign_key: :author_id
  
    belongs_to :post,
      class_name: "Post",
      foreign_key: :parent_id
  end