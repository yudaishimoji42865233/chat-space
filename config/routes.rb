Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  resources :users, only: [:edit, :update, :index] 
end
