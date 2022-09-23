class RemoveUsersExtraCols < ActiveRecord::Migration[5.2]
  def change
    remove_columns :users, :description, :birthdate
  end
end
