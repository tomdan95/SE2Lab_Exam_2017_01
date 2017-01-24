//test of the APIs

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

//library for JSON requests
requestJSON = require('request-json');
var client = requestJSON.createClient(base_url);


// Test for homepage
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

// Test for /showList
describe("Test /showList", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "showList/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});
 
// Test for /searchPizza
describe("Test /searchPizza", function() {
	//set the data
	var data = {ID: '1'};
	
	//legal request
	it("to returns status code 200", function(done) {
	  client.post(base_url + "searchPizza/", data, function(err, res, body) {
		expect(body).toEqual(
			{
		      ID: 1,
		      name: "Margherita", 
		      price: 9.5,
		      ingriedentsList: ["pomodoro","mozzarella", "basilico", "olio"]
			}
		);

		done();
	  });
	});
	

	//Pizza does not exist
	data1 = {ID: "10" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "searchPizza/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
	
	//wrong parameter
	data2 = {name: "1" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "searchPizza/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});


});

