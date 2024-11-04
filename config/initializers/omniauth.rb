Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.development? || Rails.env.test?
    provider :github, ENV['GITHUB_ID'], ENV['GITHUB_SECRET'] # 1
  else
    provider :github,
      ->(env) { 
        host = Rack::Request.new(env).host
        key = case host
              when 'code-anki-0ff3aa07f2cc.herokuapp.com'
                :heroku
              when 'www.code-anki.com'
                :www_domain
              when 'code-anki.com'
                :domain
              else
                :heroku
              end
        Rails.application.credentials.github[key][:client_id]
      },
      ->(env) {
        host = Rack::Request.new(env).host
        key = case host
              when 'code-anki-0ff3aa07f2cc.herokuapp.com'
                :heroku
              when 'www.code-anki.com'
                :www_domain
              when 'code-anki.com'
                :domain
              else
                :heroku
              end
        Rails.application.credentials.github[key][:client_secret]
      }
  end
end