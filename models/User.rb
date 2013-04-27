require 'mongoid'
require 'json'

class User
	include Mongoid::Document
	field :id, type: Integer
	field :name ,type: String
	field :email, type: String
	
end