require 'test_helper'

class AuthenticationTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:will)
    @params = { user: { email: @user.email, password: 'password' } }
  end

  test "should log users in" do
    post user_session_path, as: :json, params: @params
    assert_response :success
  end

  test "should return JTW token in authorization header after login" do
    post user_session_path, as: :json, params: @params

    assert response.headers['Authorization'].present?
    assert decoded_jwt_token_from_response(response).first['sub'].present?
  end

  test "should prevent invalid logins" do
    post user_session_path, as: :json
    assert_response :unauthorized
  end

  test "should log users out" do
    post user_session_path, as: :json, params: @params
    assert_response :success

    delete destroy_user_session_path
    assert_response 204
  end

  def decoded_jwt_token_from_response(response)
    token_from_request = response.headers['Authorization'].split(' ').last
    JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
  end
end
