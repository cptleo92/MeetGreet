class AddGroupTitleAndHostNameToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :host_name, :string, default: ""
    add_column :events, :group_title, :string, default: ""
    change_column_null :events, :host_name, :false
    change_column_null :events, :group_title, :false
  end

  
end
