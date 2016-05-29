Rails.application.routes.draw do

  root 'home#index'

  resources 'blog'
  get 'contact_me' => 'contact_me#index'
end
