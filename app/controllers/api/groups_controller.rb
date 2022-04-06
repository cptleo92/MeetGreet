class Api::GroupsController < ApplicationController
  def index
    filter = params[:filter]

    if filter == "splash"
      @groups = Group.popular
    elsif filter == ["0"]
      @groups = Group.all
    elsif filter.is_a?(Array) && filter.length > 0
      @groups = Group.where('id IN (?)', filter)
    elsif filter.nil?
      render json: []
    end
  end

  def show
    @group = Group.find_by(id: params[:id])    
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      if params[:topics]
        topics = params[:topics].map do |topic|
          Topic.create!(
            name: topic,
            topicable_id: @group.id,
            topicable_type: "Group"
          )
        end
      end
      render json: @group
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def update
    @group = Group.find_by(id: params[:id])
    if @group.update(group_params)
      if params[:topics]
        topics = params[:topics].map do |topic| 
          Topic.find_or_create_by(
            name: topic,
            topicable_id: params[:id],
            topicable_type: "Group"
          )  
        end
      end
      @group.topics = topics || []
      render json: @group
    else
      render json: @group.errors.full_messages, status: 422
    end
  end
  
  private
  def group_params
    params.require(:group).permit(:id, :title, :public, :location, :description)
  end

end