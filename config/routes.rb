Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' }

  root to:"static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update] 

    resource :session, only: [:create, :destroy]

    resources :groups

    resources :events 

    resources :posts, only: [:index, :show, :destroy, :update]

    resources :topics, only: [:index, :create]
  end
end
