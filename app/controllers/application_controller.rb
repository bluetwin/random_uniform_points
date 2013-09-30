
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
  	sample_size      = params[:sample] || 10000
  	@points          = []
  	params[:r]       ||= 200
  	params[:h]       ||= 200
  	params[:v]       ||= 200
  	@circle          = Circle.new(params)
  	sample_size.times do |n|
  		@points << @circle.random_point
  	end
  end

  def point
    params[:r]       ||= 200
    params[:h]       ||= 200
    params[:v]       ||= 200
    circle           = Circle.new(params)
    render json: circle.random_point.to_json
  end
end
