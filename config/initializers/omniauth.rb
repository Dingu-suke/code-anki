# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.development? || Rails.env.test?
    provider :github, ENV['GITHUB_ID'], ENV['GITHUB_SECRET']
  else
    # request.hostに基づいて適切な認証情報を取得
    creds = case request.host
            when ENV['HEROKU']
              Rails.application.credentials.github.heroku
            when ENV['WWWDOMAIN']
              Rails.application.credentials.github.www_domain
            when ENV['DOMAIN']
              Rails.application.credentials.github.domain
            end

    # 配列ではなく、直接2つの引数として渡す
    provider :github, creds.client_id, creds.client_secret
  end
end

# CSRF対策の設定
OmniAuth.config.allowed_request_methods = [:post, :get]