json.set! @post.id do
  json.extract! @post, :id, :author_id, :body, :postable_type, :postable_id, :created_at, :updated_at
end