class Api::GroupsController < ApplicationController
  def index
    filter = params[:filter]

    if filter == [0]
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
      redirect_to api_group_url(@group)
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def update
    @group = Group.find_by(id: params[:id])
    if @group.update(group_params)
      redirect_to api_group_url(@group)
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  private
  def group_params
    params.require(:group).permit(:id, :title, :public, :location, :city, :state, :country, :description)
  end

end