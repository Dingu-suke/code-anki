class ApplicationController < ActionController::Base

  def authenticate_user!
    unless user_signed_in?
      redirect_to root_path
    end
  end

end
