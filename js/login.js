// JavaScript Document
/*
Replaced the login scripts with a simple redirect to the device page. There is no way to simulate the authentication process outside of the J&J network. 
*/
(function () {
	"use strict";
	$(".login-btn").on("click", function(){
		window.location = "./My-Devices";
	});
}());

        


