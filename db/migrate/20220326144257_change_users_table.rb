class ChangeUsersTable < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :lname, true   
  end
end
