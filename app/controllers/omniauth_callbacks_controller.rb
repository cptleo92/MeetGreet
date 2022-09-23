class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token, only: :google_oauth2

  def google_oauth2
    g_data = request.env['omniauth.auth']

    @user = User.find_or_create_by_oauth(g_data)

      login!(@user)
      redirect_to root_url
  end
end
