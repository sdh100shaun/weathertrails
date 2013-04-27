require 'rest-client'


module WebserviceHelper
	
	# abstract : generic function for making a  webservice call
	def call_webservice_get(endpoint)

		response = RestClient.get(endpoint)
		
	end

end
