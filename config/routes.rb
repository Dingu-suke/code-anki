Rails.application.routes.draw do
  resources :tags
  resources :decks, except: %i[show]
  resources :cards
  
  get 'mypage', to: 'mypage#show', as: 'mypage'
  
  root 'top#index'
  # root 'hello_console#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  get 'your_decks' => 'decks#your_decks'
  
  get 'your_cards' => 'cards#your_cards'
  get 'deck_cards/:id' => 'decks#deck_cards', as: 'deck_cards'
  patch 'decks/:id'  => 'decks#update'
  
  delete 'destroy_your_deck/:id' => 'decks#destroy_your_deck', as:'destroy_your_deck'
  delete 'destroy_your_card/:id' => 'cards#destroy_your_card', as:'destroy_your_card'
  
  get "/auth/:provider/callback" => "sessions#create"
  delete "/logout" => "sessions#destroy"

  # Defines the root path route ("/")
  # root "posts#index"
  resources :users
  
end
