//express lib
var express = require('express');
//general lib
var app = express();
//inspect
var util = require('util');
//Cross-Origin Resource Sharing (CORS), used for enabling pre-flight option
cors = require('cors');

//pizza manager
var pizzaManager = require('./pizzaManager.js');

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));//set to true since we want to parse nested objects in the JSON we receive
app.use(bodyParser.json());// JSON

//set up the server
app.set('port', (process.env.PORT || 5000));
//enable pre-flight authoriuzation
app.options('*', cors());

/**
 * @brief returns a static welcome page.
 * @return a static page.
 */
app.get('/', function(request, response) {
	var headers = {};
	//answer
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end("Welcome customer");
});

/**
 * @brief returns the list of pizzas
 * @return a static page.
 */
app.get('/showList', function(request, response) 
{
	var headers = {};
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end(JSON.stringify(pizzaManager.getMenu()));
});

/**
 * @brief search a pizza
 * @return search a pizza using two parameters, one of them optional
 */
app.post('/searchPizza', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var pizzaID;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
            {
			 pizzaID = request.body.ID;
            }
		else 
			pizzaID = "not defined";
	
	}
	else
	{
		pizzaID = "body undefined";
	}
    
    if (pizzaID!="not defined" && pizzaID!="body undefined")
	{
		//aceptable input
		//search for a pizza
		var pizza = pizzaManager.searchPizzaID(pizzaID);
		//if exists
		if (pizza != null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(pizza));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}

	}
    else    
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}   

});

/**
 * @brief delete a pizza
 * @return delete a pizza identified by its ID or name
 */
app.post('/deletePizza', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var pizzaID;
	var pizzaName;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
            {
			 pizzaID = request.body.ID;
            }
		else 
			pizzaID = "not defined";
		
		if ( typeof request.body.name !== 'undefined' && request.body.name)
            {
			 pizzaName = request.body.name;
            }
		else 
			pizzaName = "not defined";
	
	}
	else
	{
		pizzaID = "body undefined";
		pizzaName = "body undefined";
	}
    
	var pizza;
	
    if (pizzaID!="not defined" && pizzaID!="body undefined")
	{
		//aceptable input
		//delete a pizza using ID
		pizza = pizzaManager.deletePizzaID(pizzaID);
		if (pizza!= null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(pizza));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}

	}
	else if (pizzaName!="not defined" && pizzaName!="body undefined")
	{	
		//aceptable input
		//delete a pizza using ID
		pizza = pizzaManager.deletePizzaName(pizzaName);
		if (pizza!= null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(pizza));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}
	}
    else    
		{
        	//unaceptable input
        	response.writeHead(406, headers);
			response.end(JSON.stringify("1"));
		}   

});

/**
 * @brief add a pizza
 * @return the pizza added to the list of pizzas
 */
app.post('/addPizza', function(request, response) 
{	
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var pizzaID;
	var pizzaName;
	var pizzaPrice;
	var pizzaIngridients;
    
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID &&
			 typeof request.body.name !== 'undefined' && request.body.name &&
			 typeof request.body.price !== 'undefined' && request.body.price &&
			 typeof request.body.ingridients !== 'undefined' && request.body.ingridients
		   )
            {
			 pizzaID = request.body.ID;
			 pizzaName = request.body.name;
			 pizzaPrice = parseFloat(request.body.price);
			 pizzaIngridients = request.body.ingridients;
            }
		else 
			pizzaID = "not defined";
	}
	else
	{
		pizzaID = "body undefined";
	}
    
    if (pizzaID!="not defined" && pizzaID!="body undefined")
	{
		//aceptable input
		//create the pizza object
		var pizza = {
			ID: pizzaID,
			name: pizzaName,
			price: pizzaPrice,
			ingriedentsList: pizzaIngridients
		}
		
		//if insertion works correctly
		if (pizzaManager.insertPizza(pizza))
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(pizza));
		}
		else
		{
			response.writeHead(400, headers);
			response.end(JSON.stringify());
		}

	}
    else    
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}   

});

//INSERIRE CODICE QUI SOTTO

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});