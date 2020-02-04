require "json"
require "rest-client"

class PagesController < ApplicationController
  def home
    # api_key = 'lrQqeKhgWSv7WS38KntM48UFQJvvYlQfx0R2lt-H'
    # version = '20161108'
    # base_url = 'https://api.teamtailor.com/v1'
    # response = RestClient::Request.execute(method: :get, url: 'https://api.teamtailor.com/v1/jobs/', headers:
    #   {Authorization: 'bar',
    #    'X-Api-Version' => version,
    #    'Content-Type' => 'application/vnd.api+json'
    #   })

    # # response = RestClient.get "https://api.teamtailor.com/v1/jobs/", {
    # #   Authorization: `Token token=#{api_key}`,
    # #   'X-Api-Version' => version,
    # #   'Content-Type' => 'application/vnd.api+json'
    # # }
    # repos = JSON.parse(response)
    # raise
  end
end
