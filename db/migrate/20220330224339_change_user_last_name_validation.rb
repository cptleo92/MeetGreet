class ChangeUserLastNameValidation < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :lname, true
  end
  def change
    change_column :users, :lname, :string, default: ""
  end
end
