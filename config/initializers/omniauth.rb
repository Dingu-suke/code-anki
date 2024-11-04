# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.development? || Rails.env.test?
    provider :github, ENV['GITHUB_ID'], ENV['GITHUB_SECRET']
  else
    # client_idとclient_secretを個別に取得するlambdaを用意
    client_id = lambda { |env|
      request = Rack::Request.new(env)
      creds = case request.host
              when ENV['HEROKU']
                Rails.application.credentials.github.heroku
              when ENV['WWWDOMAIN']
                Rails.application.credentials.github.www_domain
              when ENV['DOMAIN']
                Rails.application.credentials.github.domain
              end
      Rails.logger.info "Host: #{request.host}"
      creds&.client_id
    }

    client_secret = lambda { |env|
      request = Rack::Request.new(env)
      creds = case request.host
              when ENV['HEROKU']
                Rails.application.credentials.github.heroku
              when ENV['WWWDOMAIN']
                Rails.application.credentials.github.www_domain
              when ENV['DOMAIN']
                Rails.application.credentials.github.domain
              end
      creds&.client_secret
    }

    # 個別のlambdaを引数として渡す
    provider :github, client_id, client_secret
  end
end

# CSRF対策の設定
OmniAuth.config.allowed_request_methods = [:post, :get]