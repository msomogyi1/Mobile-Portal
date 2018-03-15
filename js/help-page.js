// JavaScript Document
$(document).ready(function(){
	"use strict";
	var searchTerm, panelContainerId;
	  $.expr[':'].containsCaseInsensitive = function (n, i, m) {
    return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
  };
	  $('#search-input').on('change keyup paste click', function () {
    searchTerm = $(this).val();
		 // debugger;
    $('#accordion1 > .panel').each(function () {
      panelContainerId = '#' + $(this).attr('id');
      $(panelContainerId + ':not(:containsCaseInsensitive(' + searchTerm + '))').hide();
      $(panelContainerId + ':containsCaseInsensitive(' + searchTerm + ')').show();
    });
  });
	var max_height = window.innerHeight - 121;
	$("#main-container").css("height", max_height);
	$("#main-container").css("max-height", max_height);
	if(($("accordion1").height() + $("#title-container").height()) < max_height - 110){
		$("main-container").css("overflow-y", "hidden");
	}
	else{
		$("#main-container").css("overflow-y", "scroll");
	}
	var old_width = window.innerWidth;
	function resize_window(){
		var max_height = window.innerHeight - 121;
		$("#main-container").css("height", max_height);
		$("#main-container").css("max-height", max_height);
		if($("#accordion1").height() < max_height - 165){
			$("#main-container").css("overflow-y", "hidden");
		}
		else{
			$("#main-container").css("overflow-y", "scroll");
		}
		old_width = window.innerWidth;
		}
	$(".panel").on("click", function(){
		setTimeout(resize_window, 500);
	});
	$(window).resize(function() {
		var max_height = window.innerHeight - 121;
		$("#main-container").css("height", max_height);
		$("#main-container").css("max-height", max_height);
		if($("#accordion1").height() < max_height - 165){
			$("#main-container").css("overflow-y", "hidden");
		}
		else{
			$("#main-container").css("overflow-y", "scroll");
		}
		old_width = window.innerWidth;
	});
});
