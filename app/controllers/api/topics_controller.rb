class Api::TopicsController < ApplicationController
  def index
    @topics = Topic.all
  end

  def show
    @topic = Topic.find_by(id: params[:id])    
  end

  def create
    @topic = Topic.new(topic_params)
    if @topic.save
      redirect_to api_topic_url(@topic)
    else
      render json: @topic.errors.full_messages, status: 422
    end
  end

  private
  def topic_params
    params.require(:topic).permit(:id, :group_id, :host_id, :start_time, :end_time, :capacity, :title, :public, :location, :city, :state, :country, :description)
  end

end