class Api::MembershipsController < ApplicationController
  # def index
  #   group = Group.find(params[:id])
  #   @organizers = group.organizers
  # end 

  def index
    @memberships = Membership.where(group_id: params[:id])
  end
end