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
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update(user_params)
      redirect_to api_user_url(@user)
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:id, :fname, :lname, :location, :birthdate, :description, :email, :password, :provider, :uid)
  end

end