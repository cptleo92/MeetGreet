class Api::UsersController < ApplicationController
  def index
    filter = params[:filter]

    if filter == ["0"]
      @users = User.all
    elsif filter.is_a?(Array) && filter.length > 0
      @users = User.where('id IN (?)', filter)
    elsif filter.nil?
      render json: []
    end
  end

  def show
    @user = User.find_by(id: params[:id])    
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to api_user_url(@user)
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    # byebug
    if params[:topics]
      topics = params[:topics].map do |topic|
        Topic.find_or_create_by(
          name: topic,
          topicable_id: params[:id],
          topicable_type: "User"
        )
      end
      @user.topics = topics || []
      render :show
    else
      if @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    end
    
  end

  private
  def user_params
    params.require(:user).permit(:id, :fname, :lname, :location, :email, :password, :provider, :uid, topics: [])
  end

end