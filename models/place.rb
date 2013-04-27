require_relative 'webservice_helper'

class Place
	include WebserviceHelper

	def get_place_info(lat,lng)

		url ="http://query.yahooapis.com/v1/public/yql?q=select%20woeid%2Ccountry%2Cname%20from%20geo.placefinder%20where%20text%3D%22#{lat}%2C%20#{lng}%22%20and%20gflags%3D%22R%22&format=json&callback="
		call_webservice_get(url)
	end	



end