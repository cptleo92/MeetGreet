class Api::AttendancesController < ApplicationController
  def index
    @attendances = Attendance.where(event_id: params[:id])
  end
end