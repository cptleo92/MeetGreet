class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

    if logged_in?
      render json: ['Already logged in!'], status: 401
      return
    end

    if @user
      login!(@user)
      redirect_to api_user_url(@user)
    else
      render json: ['Invalid credentials. Please try again.'], status: 401
    end
  end

  def destroy
    if logged_in?
      logout! 
      render json: {}   
    else
      render json: ['Nothing to log out'], status: 401
    end
  end
end