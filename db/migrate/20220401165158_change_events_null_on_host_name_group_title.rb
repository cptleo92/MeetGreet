class ChangeEventsNullOnHostNameGroupTitle < ActiveRecord::Migration[5.2]
  def change
    change_column_null :events, :host_name, false
    change_column_null :events, :group_title, false
  end
end
