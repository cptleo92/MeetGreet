class RemoveEventsPublic < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :public
  end
end
