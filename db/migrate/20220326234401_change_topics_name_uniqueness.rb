class ChangeTopicsNameUniqueness < ActiveRecord::Migration[5.2]
  def change
    remove_index :topics, :name
    add_index :topics, :name
    add_index :topics, [:name, :topicable_type, :topicable_id], unique: true
  end
end
