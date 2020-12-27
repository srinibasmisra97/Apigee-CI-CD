Feature:

	Scenario: Setting headers in GET request
		Given I set x-apikey header to BP9eEAVGU49faG4TYD0mpx7pyjVLPOfp
		When I GET /mock-target
		Then response code should be 200
        And response body should contain Hello, Guest!