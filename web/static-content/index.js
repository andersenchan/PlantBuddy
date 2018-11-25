
var userId;
var name;
var history; 

function login(){
	$.ajax({
		method: "GET",
		url: "/api/login/",
		data: {
			username: $("#loginUsername").val(),
			password: $("#loginPassword").val()
		}
	}).done(function(data){
		if(Object.keys(data["user"]).length == 0){
			if(Object.keys(data["error"]).length == 0){ //if no errors
				document.getElementById("loginError").innerHTML = "No user with that username and password.";
			} else {
				alert(data["error"]);
			}
		} else { // login successful

			// Store the user credentials. TODO: save these in session instead
			userId = $("#loginUsername").val();
			name = data["user"][0]["name"];

			switchView('login', 'menu')
			//$("#newuser").hide();
		}
	}).fail(function(data){
		alert("failed to perform login because of failed ajax request.");
	});
}

function addUser(){
	$("#createAccountButton").hide();
	$.ajax({
		method: "PUT",
		url: "/api/newuser/",
		data: {
			username: $("#newUsername").val(),
			password: $("#newPassword").val(),
			name: $("#newName").val()
		}
	}).done(function(data){
		if(Object.keys(data["error"]).length == 0){ //if no error
			if(Object.keys(data["alreadyExists"]) == 1){
				alert("User already Exists");
			}
		} else {
			alert(Object.keys(data["error"]));
		}
		$("#createAccountButton").show();
	});
}

function changeUser(){
	$.ajax({
		method: "PUT",
		url: "/api/changeUser/",
		data: {
			username: userId,
			 password: $("#changePassword").val(),
			 name: $("#changeName").val()
		}
	}).done(function(data){
		// Theres no data for this..should we have it?
		if(Object.keys(data["error"]).length == 0){
		} else {
			alert(data["error"]);
		}
	}).fail(function(data){
	});

	// Change session variables
}

function setWater(pid, state){
	$.ajax({
		method: "PUT",
		url: "/api/setWater/",
		data: {
			plantID: pid,
			state: state
		}
	}).done(function(data){
		// Theres no data for this..should we have it?
		if(Object.keys(data["error"]).length == 0){ //if no error
		} else {
			alert(data["error"]);
		}
	}).fail(function(data){
	});

	// Change session variables
}



function switchView(from, to){
	$("#" + from).hide();
	$("#" + to).show();
}

function pullHistory(type){
	$.ajax({
		method: "GET",
		url: "/api/getHistory/",
	}).done(function(data){
	drawHistory(data['history'], type);
	});
	
}

function showPlants(){
	switchView('menu', 'plants');

	$.ajax({
		method: "GET",
		url: "/api/getPlants2/",
		data: {
			username: $("#loginUsername").val(),
			password: $("#loginPassword").val()
		}
	}).done(function(data){

		//update the inner html of the plants table with this html:
		var s = "<tr><th class=\"plantsTable\"><b>Plant Type</b></th><th class=\"plantsTable\"><b>Plant Name</b></th><th class=\"plantsTable\"><b>Manual Water</b></th>";
		console.log("received response containing plants: ");
		console.log(data)
		for (let i = 0; i < Object.keys(data["plants"]).length; i++) {
			s+="<tr><td class=\"plantsTable\">";
			curr_row = data["plants"][i];
			s+=curr_row["plantType"];

			s+="</td><td class=\"plantsTable\">";
			s+=curr_row["plantName"];

			s+="</td><td class=\"plantsTable\">";
			s+="<input class=\"box\" type=\"button\" id=\"toggleWaterButtonOn"+curr_row["plantID"]+"\" value=\"Water ON\" onclick=\"setWater("+curr_row["plantID"]+", 1)\">"
			s+="<input class=\"box\" type=\"button\" id=\"toggleWaterButtonOff"+curr_row["plantID"]+"\" value=\"Water OFF\" onclick=\"setWater("+curr_row["plantID"]+", 0)\">"

			s+="</td></tr>";

			// <input class="box" type="button" id="toggleWaterButtonOff" value="Water ON" onclick="setWater(1, 1)">
			// <input class="box" type="button" id="toggleWaterButtonOn" value="Water OFF" onclick="setWater(1, 0)">
		}
		document.getElementById("plantsTable").innerHTML = s;
	});
}

/* accountPage */

function showAccountPage(){
	switchView('menu', 'accountPage');
	document.getElementById("yourUsername").innerHTML = userId;
	document.getElementById("yourName").innerHTML = "Your name is: " + name;
}

function getState(){
	$.ajax({
		method: "GET",
		url: "/api/getState/?id=1"
	}).done(function(data){

	});
}

function menuToStatistics(){
	switchView('menu', 'statistics');
}


function printDB(){
	$.ajax({
		method: "GET",
		url: "/api/db/",
	}).done(function(data){
	});
}

function validateForm(formid, errorId, callback){
	var validated = true;
	for (let i=0; i < formid.length; i++){
		var userinput = $("#" + formid[i]).val();
		var letters = /^[0-9a-zA-Z]+$/;
		if(userinput.match(letters)){
		//if (regex.test(userinput) && userinput.length < 21){
		//if (userinput.match(regex).length == userinput.length && userinput.length < 21){
			//alert("fine" + i);
			/*
			if (args===null){
				func();
			} else {
				alert("args");
			}*/
		} else {
			validated = false;
			//alert("Please only use alphanumeric characters up to 20 in length.");
			document.getElementById(errorId).innerHTML = "Please only use alphanumeric characters up to 20 in length."
			return false;
		}
	}
	//on success
	callback();
}
