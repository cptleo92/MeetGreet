# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_05_172051) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "attendances", force: :cascade do |t|
    t.integer "attendee_id", null: false
    t.integer "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attendee_id", "event_id"], name: "index_attendances_on_attendee_id_and_event_id", unique: true
  end

  create_table "events", force: :cascade do |t|
    t.integer "group_id", null: false
    t.integer "host_id", null: false
    t.string "title", null: false
    t.text "description", null: false
    t.string "location", null: false
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.integer "capacity", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "host_name", default: "", null: false
    t.string "group_title", default: "", null: false
    t.index ["group_id"], name: "index_events_on_group_id"
    t.index ["host_id"], name: "index_events_on_host_id"
    t.index ["start_time"], name: "index_events_on_start_time"
  end

  create_table "groups", force: :cascade do |t|
    t.string "title", null: false
    t.boolean "public", default: true, null: false
    t.string "location", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["title"], name: "index_groups_on_title", unique: true
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "member_id", null: false
    t.integer "group_id", null: false
    t.boolean "organizer", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", default: "APPROVED", null: false
    t.index ["group_id"], name: "index_memberships_on_group_id"
    t.index ["member_id", "group_id"], name: "index_memberships_on_member_id_and_group_id", unique: true
    t.index ["member_id"], name: "index_memberships_on_member_id"
  end

  create_table "posts", force: :cascade do |t|
    t.integer "author_id", null: false
    t.text "body", null: false
    t.integer "parent_id"
    t.string "postable_type"
    t.bigint "postable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_posts_on_author_id"
    t.index ["parent_id"], name: "index_posts_on_parent_id"
    t.index ["postable_type", "postable_id"], name: "index_posts_on_postable_type_and_postable_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "name", null: false
    t.string "topicable_type"
    t.bigint "topicable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "topicable_type", "topicable_id"], name: "index_topics_on_name_and_topicable_type_and_topicable_id", unique: true
    t.index ["name"], name: "index_topics_on_name"
    t.index ["topicable_type", "topicable_id"], name: "index_topics_on_topicable_type_and_topicable_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "fname", null: false
    t.string "lname", default: "", null: false
    t.string "location", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
