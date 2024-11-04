# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.development? || Rails.env.test?
    provider :github, ENV['GITHUB_ID'], ENV['GITHUB_SECRET']
  else
    # procではなく、lambdaを直接渡す
    provider :github, lambda { |env|
    request = Rack::Request.new(env)
    
    credentials = case request.host
                  when ENV['HEROKU']
                    creds = Rails.application.credentials.github.heroku
                    [creds.client_id, creds.client_secret]
                  when ENV['WWWDOMAIN']
                    creds = Rails.application.credentials.github.www_domain
                    [creds.client_id, creds.client_secret]
                  when ENV['DOMAIN']
                    creds = Rails.application.credentials.github.domain
                    [creds.client_id, creds.client_secret]
                  end
    
    Rails.logger.info "Host: #{request.host}"
    credentials || [nil, nil]
  }
  end
end

# CSRF対策の設定
OmniAuth.config.allowed_request_methods = [:post, :get]