class RemoveUnusedColumns < ActiveRecord::Migration[5.2]
  def change
    remove_columns :groups, :city, :state, :country
    remove_columns :events, :city, :state, :country
    change_column_null :users, :location, false
    change_column_null :groups, :location, false
  end
end
