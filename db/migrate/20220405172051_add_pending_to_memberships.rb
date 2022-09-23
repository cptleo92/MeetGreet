class AddPendingToMemberships < ActiveRecord::Migration[5.2]
  def change
    add_column :memberships, :status, :string, default: "APPROVED", null: false
  end
end
