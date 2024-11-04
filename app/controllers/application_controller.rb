class ApplicationController < ActionController::Base
  before_action :store_current_location, :authenticate
  helper_method :authenticate, :logged_in?, :current_user
  rescue_from ActiveRecord::RecordNotFound, with: :render_404

  def logged_in?
    !!current_user
  end

  def authenticate
    return if logged_in?
    redirect_to root_path, alert: "ログインしてください"
  end

  def current_user
    return unless session[:user_id]
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

  def github_credentials_for_current_host
    host = request.host
    credentials = Rails.application.credentials[Rails.env.to_sym]

    case host
    when ENV['DOMAIN']
      credentials[:github][:domain]
    when ENV['WWWDOMAIN']
      credentials[:github][:www_domain]
    when ENV['HEROKU'] # HerokuのURL
      credentials[:github][:heroku]
    else
      raise "Unsupported host: #{host}"
    end
  end

  helper_method :github_credentials_for_current_host
end