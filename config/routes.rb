Rails.application.routes.draw do

  root to:"static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update] 

    resource :session, only: [:create, :destroy]

    resources :groups

    resources :events 

    resources :posts

    resources :topics, only: [:index, :show, :create]

    resources :memberships, only: [:index, :create, :update, :destroy]
    resources :attendances, only: [:index, :create, :destroy]
  end
end
