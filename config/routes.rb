RandomPoints::Application.routes.draw do
  get "random_point" => "application#point", as: :random_point
  root "application#index"
end
