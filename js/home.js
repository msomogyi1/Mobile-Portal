/*Script runs functions for the Mobile-Portal.html page*/
$(document).ready(function () {
	"use strict";
	/*Show the Progress bar while running the API to grab the user's device information*/
	$("#loading-text").text("Loading Options");
	$("#progressbar").progressbar({
		value: false
	});
	$(".ui-progressbar-value ").css("width", 0).animate({
		width: '100%'
	}, 1500);
	setTimeout(function () {
		$("#loading-text").text("All done!");
	}, 1500);
	setTimeout(function () {
		$("#repair-email-container").hide();
		$("#loading-container").hide();
	}, 3000);
	/*Redirect to login page if no user session information is found*/
	if (sessionStorage.getItem("device_name") == null) {
		window.location = "./Login";
	}
	/*Grab the selected device and display a user-friendly name if it is an iOS device*/
	var device_name = sessionStorage.getItem("device_name");
	if (device_name.toLowerCase().indexOf('ipad') !== -1 || device_name.toLowerCase().indexOf('iphone') !== -1) {
		if (device_name.toLowerCase().indexOf('ipad') !== -1) {
			$("#device-name").text('iPad');
		} else {
			$("#device-name").text('iPhone');
		}
	} else {
		$("#device-name").text(device_name);
	}
	/*Initial attempt at setting a responsive height for the main container and displaying a scroll option if the window height is too short. Needs some work.......*/
	var max_height = window.innerHeight - 121;
	$("#main-container").css("height", max_height);
	$("#main-container").css("max-height", max_height);
	if (($("#device-options").height() + $("#title-container").height()) < max_height - 110) {
		$("#main-container").css("overflow-y", "hidden");
	} else {
		$("#main-container").css("overflow-y", "scroll");
	}
	/*Fuction to display the device options as an accordion if the page width falls under 600px*/
	var old_width = window.innerWidth;
	$(window).resize(function () {
		var max_height = window.innerHeight - 121;
		$("#main-container").css("height", max_height);
		$("#main-container").css("max-height", max_height);
		if ($("#device-options").height() < max_height - 110) {
			$("#main-container").css("overflow-y", "hidden");
		} else {
			$("#main-container").css("overflow-y", "scroll");
		}
		if (window.innerWidth <= 600) {
			if (old_width > 600) {
				$(".panel-collapse").collapse("hide");
			}
		} else {
			$(".panel-collapse").collapse("show");
		}
		old_width = window.innerWidth;
	});
	/*As with above, will add a scroll option if opening an accordion pushed the page height to larger than the window height*/ 
	$(".panel ").on("click", function () {
		setTimeout(function () {
			if ($("#device-options").height() < window.innerHeight - 261) {
				$("#main-container").css("overflow-y", "hidden");
			} else {
				$("#main-container").css("overflow-y", "scroll");
			}
		}, 500);
	});
	/*Series of on-click functions that run when a user selects one of the device management options. Need to condense this into one function*/
	$("#replace-device-button").on("click", function () {
		$("#replace-device-container, #replace-device-inner-container, #replace-device-body-0").show();
	});
	$(".greyed-out, .close-modal-x, #cancel-replace-device").on("click", function () {
		$(".modal-container").hide();
	});
	$("#confirm-replace-device").on("click", function () {
		$("#loading-container").show();
		$("#loading-text").text("Removing Device");
		$("#progressbar").progressbar({
			value: false
		});
		$(".ui-progressbar-value ").css("width", 0).animate({
			width: '100%'
		}, 1500);
		setTimeout(function () {
			$("#loading-text").text("All done!");
		}, 1500);
		$.ajax({
			type: "GET",
			url: './Controller/RemoveDevice.php',
			data: {
				device_id: window.location.search.split("&")[0].split("=")[1]
			},
			success: function () {
				$("#loading-container").hide();
				$(".modal-container").hide();
				$("#device-replaced-container, #device-replaced-inner-container, #device-replaced-body").show();
			},
			error: function () {
				$(".modal-container").hide();
				$("#loading-container").hide();
			}
		});
	});
	$("#repair-email-button, #replace-passcode-button, #remove-device-button").on("click", function () {
		$("#repair-email-container, #repair-email-inner-container, #repair-email-body-0").show();
	});
	$("#confirm-repair-email").on("click", function () {
		$("#loading-container").show();
		$("#loading-text").text("Repairing Email");
		$("#progressbar").progressbar({
			value: false
		});
		$(".ui-progressbar-value ").css("width", 0).animate({
			width: '100%'
		}, 1500);
		setTimeout(function () {
			$("#loading-text").text("All done!");
		}, 1500);
		setTimeout(function () {
			$("#repair-email-container").hide();
			$("#loading-container").hide();
			$("#email-repaired-container, #email-repaired-inner-container, #email-repaired-body-0").show();
		}, 3000);
		var email_profile = "";
		for (var i = 0; i < JSON.parse(sessionStorage.getItem("device_profiles")).DeviceProfiles.length; i++) {
			if (JSON.parse(sessionStorage.getItem("device_profiles")).DeviceProfiles[i].Name.toLowerCase().indexOf("email") !== -1) {
				email_profile = JSON.parse(sessionStorage.getItem("device_profiles")).DeviceProfiles[i].Id.Value;
			}
		}
		$.ajax({
			type: "GET",
			url: './Controller/RepairProfile.php',
			data: {
				device_id: window.location.search.split("&")[0].split("=")[1],
				profile: email_profile
			},
			success: function () {
				$("#loading-container").hide();
				$(".modal-container").hide();
				$("#device-replaced-container, #device-replaced-inner-container, #device-replaced-body").show();
			},
			error: function () {
				$(".modal-container").hide();
				$("#loading-container").hide();
			}
		});
	});
	$("#repair-wifi-button").on("click", function () {
		$("#repair-wifi-container, #repair-wifi-inner-container, #repair-wifi-body-0").show();
	});
	$("#confirm-repair-wifi").on("click", function () {
		$("#loading-container").show();
		$("#loading-text").text("Repairing Wi-Fi");
		$("#progressbar").progressbar({
			value: false
		});
		$(".ui-progressbar-value ").css("width", 0).animate({
			width: '100%'
		}, 1500);
		setTimeout(function () {
			$("#loading-text").text("All done!");
		}, 1500);
		setTimeout(function () {
			$("#repair-wifi-container").hide();
			$("#loading-container").hide();
			$("#wifi-repaired-container, #wifi-repaired-inner-container, #wifi-repaired-body-0").show();
		}, 3000);
		var wifi_profile = [];
		for (var i = 0; i < JSON.parse(sessionStorage.getItem("device_profiles")).DeviceProfiles.length; i++) {
			if (JSON.parse(sessionStorage.getItem("device_profiles")).DeviceProfiles[i].Name.toLowerCase().indexOf("wifi") !== -1) {
				wifi_profile.push({
					"value": JSON.parse(sessionStorage.getItem("device_profiles")).DeviceProfiles[i].Id.Value
				});
			}
		}
		for (var i = 0; i < wifi_profile.length; i++) {
			$.ajax({
				type: "GET",
				url: './Controller/RepairProfile.php',
				data: {
					device_id: window.location.search.split("&")[0].split("=")[1],
					profile: wifi_profile[i].value
				},
				success: function (data) {},
				error: function (data) {}
			});
		}
		$("#loading-container").hide();
		$(".modal-container").hide();
		$("#device-replaced-container, #device-replaced-inner-container, #device-replaced-body").show();

	});
	$("#confirm-redirect-add").on("click", function () {
		window.location = "./My-/Devices";
	});
	$("#cancel-repair-email, #confirm-email-repaired").on("click", function () {
		$(".modal-container").hide();
	});
});

function device_information() {
	"use strict";
	var device_id = sessionStorage.getItem("device_selected");
	$("#current_device").text(device_id);
	$.ajax({
		type: "GET",
		url: './Controller/GetDeviceInfo.php',
		data: {
			device_id: device_id,
		},
		success: function (data) {
			sessionStorage.setItem('device_profiles', data.split("this-is-the-seperator")[0]);
			var application_data = JSON.parse(data.split("this-is-the-seperator")[1]).DeviceApps,
				internal_apps = '{"Apps":[';
			for (var i = 0; i < application_data.length; i++) {
				if (application_data[i].Type === "Internal") {
					internal_apps = internal_apps + ' {"Name": "' + application_data[i].ApplicationName + '", "Id": "' + application_data[i].Id.Value + '", "Status": "' + application_data[i].Status + '"},';
				}
			}
			internal_apps = internal_apps + ']}';
			internal_apps = internal_apps.replace(",]}", "]}");
			sessionStorage.setItem('device_apps', internal_apps);
		},
		error: function () {}
	});
}