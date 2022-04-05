class Api::MembershipsController < ApplicationController
  def index
    @memberships = Membership.where(group_id: params[:id])
  end

  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      render json: @membership
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def update
    @membership = Membership.find_by(id: params[:id])
    if @membership.update(membership_params)
      render json: @membership
    else
      render json: @membership.errors.full_messages, status: 422      
    end
  end

  def destroy
    @membership = Membership.find_by(id: params[:id])
    @membership.destroy
    render json: @membership
  end

  private
  def membership_params
    params.require(:membership).permit(:member_id, :group_id, :organizer)
  end
end