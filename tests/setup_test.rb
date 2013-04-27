ENV['RACK_ENV'] = 'test'

$:<<::File.dirname(__FILE__)

require 'rubygems'
require 'test/unit'
require 'rack/test'
require 'yaml'
require 'sinatra'
require 'sinatra/base'
require_relative '../weathertrail'

class SetupTests < Test::Unit::TestCase
include Rack::Test::Methods

  def app
    WeatherTrail.new
  end 
  

  def test_index
  	get '/'
  	  
  	follow_redirect!
  	last_request.url.should == 'http://locahost:9292/index.html'
  end
  def test_location_responds
    get '/location/test'
    assert last_response.ok?, "not running"
    assert last_response.body =~ /rumbling/, last_response.body
  end


end