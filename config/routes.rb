Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' }

  root to:"static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update] 

    resource :session, only: [:create, :destroy]

    resources :groups

    resources :events 

    resources :posts, only: [:index, :show, :destroy, :update]

    resources :topics, only: [:index, :show, :create]

    resources :memberships, only: [:index]
  end
end
