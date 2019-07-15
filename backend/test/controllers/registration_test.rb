require 'test_helper'

class RegistrationTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:will)
    @params = { user: { email: 'test@example.com', password: 'password' } }
  end

  test "should signup users" do
    post user_registration_path, as: :json, params: @params
    assert_response :success
  end

  test "should return a new user after signup" do
    assert_difference 'User.count' do
      post user_registration_path, as: :json, params: @params
      assert_equal @params[:user][:email], JSON.parse(response.body)["email"]
    end
  end

  test "should prevent the signup of a user that already exists" do
    user = users(:will)
    user.update! email: @params[:user][:email]

    post user_registration_path, as: :json, params: @params
    assert_response :bad_request
  end
end
