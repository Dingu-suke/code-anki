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
                    Rails.application.credentials.github.heroku
                  when ENV['WWWDOMAIN']
                    Rails.application.credentials.github.www_domain
                  when ENV['DOMAIN']
                    Rails.application.credentials.github.domain
                  end

      # デバッグ用ログ出力
      Rails.logger.info "Host: #{request.host}"
      Rails.logger.info "Credentials: #{credentials.present? ? 'found' : 'not found'}"

      [credentials[:client_id], credentials[:client_secret]]
    }
  end
end

# CSRF対策の設定
OmniAuth.config.allowed_request_methods = [:post, :get]