$(document).ready(function()
{
	var baseAddress = "http://127.0.0.1:5000";
    
	$("#btn1").click(function(){
		$.post(baseAddress + "/searchPizza",
		{
			ID: "1"
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n name: " + data.name +
				  "\n price: " + data.price +
				  "\n ingridients: " + data.ingriedentsList +
				  "\n Status: " + status);
		},
		"json");
	});
	
	$("#btn2").click(function(){
		$.post(baseAddress + "/deletePizza",
		{
			ID: "2"
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n name: " + data.name +
				  "\n price: " + data.price +
				  "\n ingridients: " + data.ingriedentsList +
				  "\n Status: " + status);
		},
		"json");
	});
	
	$("#btn3").click(function(){
		$.post(baseAddress + "/deletePizza",
		{
			name: "Margherita"
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n name: " + data.name +
				  "\n price: " + data.price +
				  "\n ingridients: " + data.ingriedentsList +
				  "\n Status: " + status);
		},
		"json");
	});
	
	$("#btn4").click(function(){
		$.post(baseAddress + "/addPizza",
		{
			ID: 6,
			name: "Carrettiera",
			price: 25,
            ingridients: ["pomodoro","friarielli", "salsiccia", "scaglie di grana"]
		},
		function(data, status){
			alert("Status: " + status);
		},
		"json");
	});
		
	$("#btn5").click(function(){
		$.post(baseAddress + "/updatePizzasByPrice",
		{
			price: 10,
            increment: 5,
            lower: true,
		},
		function(data, status){
			console.log(data);
			alert("Status: " + status);
		},
		"json");
	});
	
	$("#btn6").click(function(){
		$.post(baseAddress + "/updatePizzasByPrice",
		{
			price: 15,
            increment: 10,
            lower: false,
		},
		function(data, status){
			console.log(data);
			alert("Status: " + status);
		},
		"json");
	});
});