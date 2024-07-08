class UsersController < ApplicationController
  before_action :authenticate
  def new
  end
  
  def index
    @users = User.all.order(created_at: :desc)
  end
  
  def create
  end
  
  def show
  end
  
  def update
  end
  
  def edit
  end
  
  def destroy
  end
  private
    def set_user
    end
end