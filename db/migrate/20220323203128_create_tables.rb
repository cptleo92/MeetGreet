class CreateTables < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :location
      t.date :birthdate
      t.text :description
      t.string :email, null: false, index: {unique: true}     
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.timestamps
    end

    create_table :groups do |t|
      t.string :title, null: false, index: {unique: true}
      t.boolean :public, null: false, default: true
      t.string :location
      t.string :city
      t.string :state
      t.string :country
      t.text :description, null: false
      t.timestamps 
    end

    create_table :memberships do |t|
      t.integer :member_id, null: false, index: true
      t.integer :group_id, null: false, index: true
      t.boolean :organizer, null: false, default: false
      t.timestamps      
    end

    add_index :memberships, [:member_id, :group_id], unique: true

    create_table :events do |t|
      t.integer :group_id, null: false, index: true
      t.integer :host_id, null: false, index: true
      t.string :title, null: false
      t.text :description
      t.string :location, null: false
      t.string :city
      t.string :state
      t.string :country
      t.datetime :start_time, null: false, index: true
      t.datetime :end_time, null: false
      t.boolean :public, null: false, default: false
      t.integer :capacity
      t.timestamps
    end

    create_table :attendances do |t|
      t.integer :attendee_id, null: false
      t.integer :event_id, null: false      
      t.timestamps      
    end

    add_index :attendances, [:attendee_id, :event_id], unique: true

    create_table :topics do |t|
      t.string :name, null: false, index: {unique: true}
      t.references :topicable, polymorphic: true
      t.timestamps
    end

    create_table :posts do |t|
      t.integer :author_id, null: false, index: true
      t.text :body, null: false
      t.integer :parent_id, index: true
      t.references :postable, polymorphic: true
      t.timestamps
    end
  end
end
