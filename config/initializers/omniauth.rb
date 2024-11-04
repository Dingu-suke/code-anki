Rails.application.config.middleware.use OmniAuth::Builder do
  
  github_credentials = Rails.application.config.action_controller.github_credentials_for_current_host.call
  
  if Rails.env.development? || Rails.env.test?
    provider :github, ENV['GITHUB_ID'], ENV['GITHUB_SECRET']   
    
  else
    provider :github,
    github_credentials[:client_id],
    github_credentials[:client_secret],
    scope: 'user:email',
    callback_url: "#{Rails.application.config.action_controller.default_url_options[:protocol]}://#{request.host}/auth/github/callback"
  end