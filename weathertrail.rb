
require_relative 'models/User'
require_relative 'models/place'
require_relative 'models/weather'

require "sinatra/reloader" if development?

class WeatherTrail < Sinatra::Base
  set :static, true
  set :root, File.dirname(__FILE__)
  set :public_folder, 'public'

  configure :development do
    register Sinatra::Reloader
  end

  configure do

    
    set :app ,self.name.to_s.split("::").first
    file_path = File.expand_path("config/"+settings.environment.to_s+".yml", File.dirname(__FILE__))
    config = YAML.load_file(file_path)
    set :env , config[settings.app]
    Mongoid.load!(File.expand_path("config/mongo.yml", File.dirname(__FILE__)),:development)
    
  end
 
    get '/' do
      
      redirect '/index.html'
      

    end

    get '/users.json' do
    	content_type :json
    	users = User.all
    	users.to_json
	end

    get  '/location/:location' do 
      

      erb :index, :locals => { :location => params[:location] }

    end

    get '/place/:lat/:lon' do 

        place = Place.new
        
        lat = params[:lat]
        lng = params[:lon]

        place.get_place_info(lat,lng)

    end

    get '/weather/:lat/:lon' do 

        lat = params[:lat]
        lng = params[:lon]
        weather = Weather.new(lat,lng)
        weather.get_weather

        weather.temp

    end

end

