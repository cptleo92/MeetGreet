class ChangeEventsCapacity < ActiveRecord::Migration[5.2]
  def change
    change_column_default :events, :capacity, 0
  end
end
