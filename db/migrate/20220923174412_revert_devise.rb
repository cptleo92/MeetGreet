class RevertDevise < ActiveRecord::Migration[5.2]
  def change
    remove_columns :users, :provider, :uid
  end
end
