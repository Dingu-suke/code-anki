class ApplicationController < ActionController::Base
  before_action :store_current_location, :authenticate
  helper_method :authenticate, :logged_in?, :current_user
  rescue_from ActiveRecord::RecordNotFound, with: :render_404

  def logged_in?
    !!session[:user_id]
  end

  def authenticate
    unless logged_in?
      redirect_to root_path
    end
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def set_card
    @card = current_user.cards.find(params[:id])
  end

  def store_current_location
    session[:previous_url] = request.fullpath if request.get? && !request.xhr?
  end

  def render_404
    # flash.now[:danger] = "データが見つかりません。"
    # render :index, status: :not_found
    respond_to do |format|
      format.html { redirect_to root_path, alert: "データが見つかりませんでした。"}
      format.any { head :not_found }
    end
  end
end