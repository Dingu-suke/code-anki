# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.development? || Rails.env.test?
    provider :github, ENV['GITHUB_ID'], ENV['GITHUB_SECRET']
  else
    # 環境変数で現在のドメインを指定
    # ミドルウェア層( コントローラより前段階 )
    proc = lambda do |env|
      request = Rack::Request.new(env)
      
      credentials = case request.host
                  when ENV[HEROKU]
                    Rails.application.credentials.github.heroku
                  when ENV[WWWDOMAIN]
                    Rails.application.credentials.github.www_domain
                  when ENV[DOMAIN]
                    Rails.application.credentials.github.domain
                  end

      [credentials[:client_id], credentials[:client_secret]]
    end

    provider :github, proc
  end
end