class RestructurePostsAddComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false, index: true
      t.text :body, null: false      
      t.integer :parent_id, index: true
      t.references :postable, polymorphic: true
      t.timestamps
    end

    remove_columns :posts, :parent_id
  end
end
