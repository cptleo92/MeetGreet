class Api::AttendancesController < ApplicationController
  def index
    @attendances = Attendance.where(event_id: params[:id])
  end

  def create
    @attendance = Attendance.new(attendance_params)
    if @attendance.save
      render json: @attendance
    else
      render json: @attendance.errors.full_messages, status: 422
    end
  end

  def destroy
    @attendance = Attendance.find_by(id: params[:id])
    @attendance.destroy
    render json: @attendance
  end

  private
  def attendance_params
    params.require(:attendance).permit(:attendee_id, :event_id)
  end
end