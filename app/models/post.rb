class Post < ApplicationRecord
  validates :author_id, :body, presence: true  

  belongs_to :postable, polymorphic: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id

  def get_child_posts 
    Post.where('parent_id = ?', self.id)
  end

  def get_parent_post
    Post.find_by('id = ?', self.parent_id)
  end
end