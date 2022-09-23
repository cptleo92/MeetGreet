class Api::TopicsController < ApplicationController
  def index
    filter = params[:filter]
    
    if filter == ["0"]
      @topics = Topic.all
    elsif filter.is_a?(Array) && filter.length > 0
      @topics = Topic.where('id IN (?)', filter)
    elsif filter.nil?
      render json: []
    end
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
    params.require(:topic).permit(:id, :name, :topicable_id, :topicable_type)
  end

end