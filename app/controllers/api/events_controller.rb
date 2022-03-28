class Api::EventsController < ApplicationController
  def index
    filter = params[:filter]

    if filter == [0]
      @events = Event.all
    elsif filter.is_a?(Array) && filter.length > 0
      @events = Event.where('id IN (?)', filter)
    elsif filter.nil?
      render json: []
    end
  end

  def show
    @event = Event.find_by(id: params[:id])    
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to api_event_url(@event)
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    @event = Event.find_by(id: params[:id])
    if @event.update(event_params)
      redirect_to api_event_url(@event)
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  private
  def event_params
    params.require(:event).permit(:id, :group_id, :host_id, :start_time, :end_time, :capacity, :title, :public, :location, :city, :state, :country, :description)
  end

end