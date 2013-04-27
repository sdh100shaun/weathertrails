require 'mongoid'
require 'json'

class Location
  include Mongoid::document

    field :id, type: Integer
	field :name ,type: String
	field :county, type:String
	field :weather,type:Integer
end 