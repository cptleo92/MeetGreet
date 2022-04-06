class Api::EventsController < ApplicationController
  def index
    if params[:search]
      @events = Event.search(params[:search])
    else
      filter = params[:filter]

      if filter == "splash"
        @events = Event.starting_soon
      elsif filter == ["0"]
        @events = Event.all
      elsif filter.is_a?(Array) && filter.length > 0
        @events = Event.where('id IN (?)', filter)
      elsif filter.nil?
        render json: []
      end
    end
  end

  def show
    @event = Event.find_by(id: params[:id])    
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      if params[:topics]
        topics = params[:topics].map do |topic|
          Topic.create!(
            name: topic,
            topicable_id: @event.id,
            topicable_type: "Event"
          )
        end
      end      
      render json: @event
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    @event = Event.find_by(id: params[:id])
    if @event.update(event_params)
      if params[:topics]
        topics = params[:topics].map do |topic|
          Topic.find_or_create_by(
            name: topic,
            topicable_id: params[:id],
            topicable_type: "Event"
          )
        end
      end
      @event.topics = topics || []
      render json: @event
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  private
  def event_params
    params.require(:event).permit(:id, :group_id, :host_id, :start_time, :end_time, :capacity, :title, :location, :description)
  end

end