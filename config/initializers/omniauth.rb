Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.development? || Rails.env.test?
    provider :github, ENV['GITHUB_ID'], ENV['GITHUB_SECRET'] # 1
  else
    client_id = -> (env) {
      request = Rack::Request.new(env)
      case request.host
      when ENV['HEROKU']
        Rails.application.credentials.github[:heroku][:client_id]
      when ENV['WWWDOMAIN']
        Rails.application.credentials.github[:www_domain][:client_id]
      when ENV['DOMAIN']
        Rails.application.credentials.github[:domain][:client_id]
      else
        Rails.application.credentials.github[:heroku][:client_id]
      end
    }.call.to_s

    client_secret = -> (env) {
      request = Rack::Request.new(env)
      case request.host
      when ENV['HEROKU']
        Rails.application.credentials.github[:heroku][:client_secret]
      when ENV['WWWDOMAIN']
        Rails.application.credentials.github[:www_domain][:client_secret]
      when ENV['DOMAIN']
        Rails.application.credentials.github[:domain][:client_secret]
      else
        Rails.application.credentials.github[:heroku][:client_secret]
      end
    }.call.to_s    
    provider :github, client_id, client_secret
  end
end
