// JavaScript Document
(function () {
	"use strict";
	/*Normally runs a function to pick up the authenticated user information. In this case, just using my username for testing*/
	var user = "msomogyi";
	/*Redirects to the login if no user is stored in the session*/
	if(user === null){
		window.location = "./Login";
	}
	/*Runs the php function to gather the device information for the user*/
	function gather_device_info(){
		$.ajax({
			type: "GET",
			url: './Controller/GetDevices.php',
			data: {
				username: user,
			},
			success: function (data) {
				check_devices(data);
			},
			error: function (data) {
			}
		});	
	}	
	/*Displays the progressbar while the device information is being gathered*/
	$("#progressbar").progressbar({value: false});
	$(".ui-progressbar-value ").css("width", 0).animate({width: '100%'}, 4500);
	setTimeout(function(){
		$("#loading-text").text("All done!");
	}, 4500);
	setTimeout(function(){
		$("#loading-container").hide();
	}, 6000);
	/*Sets the progressbar to show whenever a ajax function is running*/
	$.ajaxSetup({
        beforeSend:function(){
            $("#loading-container").show();
        }
    });
	/*Initial attempt at setting a responsive height for the main container and displaying a scroll option if the window height is too short. Needs some work.......*/
	var max_height = window.innerHeight - 121;
	$("#main-container").css("height", max_height);
	$("#main-container").css("max-height", max_height);
	if(($("#device-options").height() + $("#title-container").height()) < max_height - 110){
		$("main-container").css("overflow-y", "hidden");
	}
	else{
		$("#main-container").css("overflow-y", "scroll");
	}
	var old_width = window.innerWidth;
	$(window).resize(function() {
		var max_height = window.innerHeight - 121;
		$("#main-container").css("height", max_height);
		$("#main-container").css("max-height", max_height);
		if($("#device-options").height() < max_height - 110){
			$("#main-container").css("overflow-y", "hidden");
		}
		else{
			$("#main-container").css("overflow-y", "scroll");
		}
		if(window.innerWidth <= 600){
			if(old_width > 600){
				$(".panel-collapse").collapse("hide");
			}
		}
		else{
			$(".panel-collapse").collapse("show");
		}
		old_width = window.innerWidth;
	});
	/*Function to show the modal for adding a new device*/
	$(".add-new-device").on("click", function(){
		$("#new-device-outer-container, #new-device-container, #new-device-body-0").show();
	});
	$(".greyed-out, .close-modal-x, #confirm-ownership-button, #close-device-addition-modal").on("click", function(){
		$(".modal-container").hide();
		$("#new-device-container .chosen-option").removeClass("chosen-option");
		$("#new-device-body-0").css("left", "0px");
		$("#new-device-body-1, #new-device-body-2, #new-device-body-3, #new-device-body-4").css("left", "400px");
	});
	/*Function to move the bodys in the modal to the right or left based on selection*/
	var move_body = function(body_num, hide_element){
		var body_to_move = '#new-device-body-' + body_num;
		$(body_to_move).css("position", "relative");
		if(hide_element === "show"){
			$(body_to_move).show(0).delay(400).animate({"left": "-=400px"}, 400);
		}
		else{
			$(body_to_move).animate({"left": "-=400px"}, 400).delay(400).hide(0);
		}
	};
	/*series of functions to record the selections that the user is making for adding a device*/
	$(".modal-body .android-device, .modal-body .ios-device").on("click", function(){
		$(this).addClass("chosen-option");
		move_body("1", "hide");
		setTimeout(function() { move_body("2", "show"); }, 400);
	});
	$("#new-device-body-2 .modal-text-option").on("click", function(){
		$(this).addClass("chosen-option");
		move_body("2", "hide");
		setTimeout(function() { move_body("3", "show"); }, 400);
	});
	$("#new-device-body-3 .modal-text-option").on("click", function(){
		$(this).addClass("chosen-option");
		move_body("3", "hide");
		setTimeout(function() { move_body("4", "show"); }, 400);
	});
	/*Opens a window to the support page if the user needs instructions*/
	$("#view-add-device-instruction").on("click", function(){
		$("#new-device-container").hide();
		$("#new-device-instructions, #new-device-instructions-container, #new-device-instruction-1").show();
		window.open('./device-support');
	});
	$("#skip-instructions-device-addition").on("click", function(){
		move_body("0", "hide");
		setTimeout(function() { move_body("1", "show"); }, 400);
	});
	$("#go-back-2").on("click", function(){
		go_back(2);
	});
	$("#go-back-3").on("click", function(){
		go_back(3);
	});
		$("#go-back-4").on("click", function(){
		go_back(4);
	});
	$("#confirm-add-button").on("click", function(){
		add_device();
	});
	gather_device_info();
} ());

function check_devices(data){
	/*function to pulll the data from the returned array*/
	"use strict";
	data = JSON.parse(data);
	var device_info = [];
	var user_id = data.Devices[0].UserId.Id.Value;
	$("#add-new-device").addClass('"' + user_id + '"');
	for(var i = 0; i < data.Devices.length; i++){
		var device_model = data.Devices[i].Model;
		var device_id = data.Devices[i].Udid;
		var device_name = data.Devices[i].DeviceFriendlyName;
		var enrollment_date = data.Devices[i].LastEnrolledOn;
		enrollment_date = new Date(enrollment_date);
		enrollment_date = (enrollment_date.getMonth() + 1) + "/" + enrollment_date.getDate() + "/" + enrollment_date.getFullYear();
		var last_seen = data.Devices[i].LastSeen;
		var compliance = data.Devices[i].ComplianceStatus;
		var ownership = data.Devices[i].Ownership;
		var device_os = data.Devices[i].Platform;
		last_seen = new Date(last_seen);
		last_seen = (last_seen.getMonth() + 1) + "/" + last_seen.getDate() + "/" + last_seen.getFullYear();
		device_info.push({
			"model":device_model,
			"name":device_name,
			"deivce_id":device_id,
			"enrollment":enrollment_date,
			"seen":last_seen,
			"device_id":device_id,
			"compliance": compliance,
			"ownership": ownership,
			"device_os": device_os
		});
	}
	/*creates a device div for each device the user owns*/
	for(i = 0; i < device_info.length; i++){
		$("#device-container-list").append(
			"<div id='" + device_info[i].device_id  + "--" + device_info[i].model + "--tab'  onclick='device_chosen(this)' class= 'device-tab'>" +
			"<div class='" + device_info[i].device_os + "-device unselectable'>" + "<img src='images/" + device_info[i].device_os +"-icon.png' />" + "</div>" +
			"<div class='device-model unselectable'>" + device_info[i].model + "</div>" +
			"</div>"
		);
	}
	var max_height = window.innerHeight - 121;
	$("#main-container").css("height", max_height);
	$("#main-container").css("max-height", max_height);
	if($("#device-options").height() < max_height - 110){
		$("#main-container").css("overflow-y", "hidden");
	}
	else{
		$("#main-container").css("overflow-y", "scroll");
	}
}
/*Function to move the modal body to a previous option*/
function go_back(body_number){
	"use strict";
	var move_body_back = function(body_to_move, hide_element){
		if(hide_element === "show"){
			$(body_to_move).show().css("position", "relative").animate({"left" : "+=400px"}, 400);
		}
		else{
			$(body_to_move).animate({"left" : "+=400px"}, 400).delay(400).hide(0);
		}
	};
	var body_to_hide = "#new-device-body-" + body_number;
	var selection_to_cancel = body_to_hide + " .chosen-option";
	$(selection_to_cancel).removeClass("chosen-option");
	var body_to_show = "#new-device-body-" + (parseInt(body_number) - 1);
	move_body_back(body_to_hide, "hide");
	setTimeout(function(){move_body_back(body_to_show, "show");}, 400);
}
/*function to add the device based on the users selection*/
function add_device(){
	"use strict";
    var device_os = $("#new-device-body-1 .chosen-option")[0].id,
		device_ownership = $("#new-device-body-2 .chosen-option")[0].innerHTML,
		shared = $("#new-device-body-3 .chosen-option")[0].innerHTML,
		user = user = "msomogyi";
	$.ajax({
		type: "GET",
		url: './Controller/AddDevice.php',
		data: {
			user: user,
			device_os: device_os,
			ownership: device_ownership,
			shared: shared
		},
		success: function () {
			$("#loading-container").hide();
			$("#device-added-outer-container, #device-added-container, #device-added-body").show();
		},
		error: function () {
			$("#loading-container").hide();
		}
	});
}
/*Stores information for a selected device and sends the user to the troubleshooting and management page*/
function device_chosen(device_id){
	"use strict";
	var device_name = $(device_id).attr('id').split("--")[1];
	device_id = $(device_id).attr('id').split("--")[0];
	sessionStorage.setItem('device_selected', device_id);
	sessionStorage.setItem('device_name', device_name);
	window.location = '/Mobile-Portal';
}