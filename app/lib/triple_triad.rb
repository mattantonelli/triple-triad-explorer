module TripleTriad
  ROOT_URL = 'https://triad.raelys.com/api'.freeze

  extend self

  def decks
    request('decks')[:results]
  end

  private
  def request(url)
    response = RestClient::Request.execute(url: "#{ROOT_URL}/#{url}", method: :get, verify_ssl: false)
    JSON.parse(response, symbolize_names: true)
  end
end
