$:<<::File.dirname(__FILE__)

# Gems
require "rubygems"
require "bundler/setup"
require "sinatra"
require "yaml"
require "weathertrail"


set :run, false
set :raise_errors, true
run WeatherTrail.new
