Rails.application.routes.draw do
  resources :decks, only: :index

  root 'decks#index'
end
