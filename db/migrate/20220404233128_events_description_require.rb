class EventsDescriptionRequire < ActiveRecord::Migration[5.2]
  def change
    change_column_null :events, :description, false
  end
end
