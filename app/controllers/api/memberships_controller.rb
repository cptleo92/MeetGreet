class Api::MembershipsController < ApplicationController
  def index
    group = Group.find(params[:id])
    @organizers = group.organizers
  end 

end