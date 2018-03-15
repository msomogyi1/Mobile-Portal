$(document).ready(function(){
    adjustBlocks()
    $( document ).tooltip();
    //$("#cover").hide()
    $(".passcode_input").keyup(function () {
        if (this.value.length == this.maxLength) {
          $(this).next('.passcode_input').focus();
        }
    });
})

function render_page(){
    $(window).resize(adjustBlocks); 
    adjustBlocks()
   // $("#phone-info-table").DataTable().clear().draw();
    //$("#phone-info-table").dataTable().fnDestroy();    
}

function format_device_data(data){
    if(data == ""){
        no_devices_for_user()
    }
    else{
        var data = JSON.parse(data)
        var device_info = [];
        var user_id = data.Devices[0].UserId.Id.Value
        $("#add-new-device").addClass('"' + user_id + '"')
        for(i = 0; i < data.Devices.length; i++){
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
            })
        }

        for(i=0; i < device_info.length; i++){
            if(i == 0){
                var additional_class = " first-device shown-device";
                var tab_style = "chosen-tab";
            }
            else{
                additional_class = "";
                var tab_style = "";
            }
            
            $("#device-slider").append(
                "<div id='" + device_info[i].device_id  + "-tab' class= '" + tab_style + " device-slider-container'>" +
                    "<div class='" + device_info[i].device_os + "-device'></div>" +
                    "<div class='select-device-notice'>Selected</div>" +
                    "<div class='device-name-cont'>" + device_info[i].model + "</div>" +
                "</div>"
            )    

            $('.chosen-tab .select-device-notice').show()

            $("#device-info-container").append(
                "<ul id='" + device_info[i].device_id + "-info' class='accordion device-info " + additional_class + "' style='list-style: none'>" +
                    "<li>" +
                        "<a>Basic Support Options"/* + device_info[i].device_id */+ "</a>" +
                        "<p class='basic-support-area'>" +
                        "<span>Select or hover over options for more information</span><br/>" + 
                        "<input type='button' class='repair-email support-button' id='" + device_info[i].device_id + '-' + device_info[i].ownership + "-" +device_info[i].device_os + "-" + "NA" + "-repair-email' value='Repair Email'"+
                        "title='Repairs issues with Outlook, contact, and calendar syncing.'/>" +
                        "<input type='button' class='repair-wifi support-button' id='" + device_info[i].device_id + '-' + device_info[i].ownership + "-" +device_info[i].device_os + "-" + "NA" + "-repair-wifi' value='Repair Wi-Fi'" +
                        "title='Repairs issues with connecting to JJMOBILITYj. For support with connecting to other networks see the advanced device support section below.'/>" +
                        "<input type='button' class='replace-device support-button' id='" + device_info[i].device_id + "-replace-device' value='Replace Device'" +
                        "title='Remove this current device from AirWatch and replace with a new device. This function will not transfer installed corporate applications or data.'/>" +                    
                        "</p>" +
                    "</li>" +
                    "<li>" +
                        "<a>Advanced Support Options"/* + device_info[i].device_id*/ + "</a>" +
                        "<p class='advanced-support-options'>" +
                            "<input type='button' class='replace-passcode support-button' id='" + device_info[i].device_id + "-replace-passcode' value='Replace Passcode'/>" +
                            "<span class='support-option'>" +
                                "Replace the lock screen passcode of the current device" + 
                            "</span>" +
                            "<input type='button' class='device-lock support-button' id='" + device_info[i].device_id + "-device-lock' value='Lock Device'/>" +
                            "<span class='support-option'>" +
                                "Remotely protect data on the device by locking down access." + 
                            "</span>" +
                            "<input type='button' class='factory-reset support-button' id='" + device_info[i].device_id + "-factory-reset' value='Factory Reset'/>" +
                            "<span class='support-option'>" +
                                "Reset the device to the factory default settings" + 
                            "</span>" +
                            "<input type='button' class='enterprise-reset support-button' id='" + device_info[i].device_id + "-enterprise-wipe' value='Enterprise Wipe'/>" +
                            "<span class='support-option'>" +
                                "Remove all corporate data and applications from the device. Will remove Agent and any Johnson & Johnson email, profiles, and applications." + 
                            "</span>" +
                        "</p>" +
                    "</li>"    +         
                    "<li>" +
                    "<a>Detailed Device Info</a>" +
                        "<p>Under Construction</p>" +
                    "</li>"    +             
                "</ul>"
            )
            
        }
        /*
        Utility functions
        */ 
        (function($) {
            $('.accordion > li:eq(0) a').addClass('active').next().slideDown();
        
            $('.accordion a').click(function(j) {
                var dropDown = $(this).closest('li').find('p');
        
                //$(this).closest('.accordion').find('p').not(dropDown).slideUp();
        
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                } else {
                    $(this).closest('.accordion').find('a.active').removeClass('active');
                    $(this).addClass('active');
                }
        
                dropDown.stop(false, true).slideToggle();
        
                j.preventDefault();
            });
        })(jQuery);
        add_pictures()
        add_status_img()

        var slides_to_show = 0;
        if(device_info.length == 1){
            slides_to_show = 1
            scrolling_enabled = false
            slides_scroll = 1
        }
        else{
            slides_to_show = 2
            scrolling_enabled = true
            slides_scroll = 2
        }

        $('#device-slider').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: slides_to_show,
            draggable: scrolling_enabled,
            arrows: scrolling_enabled,
            slidesToShow: slides_scroll,
            responsive: [
                /*{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },*/
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.device-slider-container').on("click", function(){
            var device_info_selected = "#" + $(this).attr('id').split('-')[0] + "-info"
            if("#"+$('.shown-device').attr('id') == device_info_selected){
            }
            else{
                $('.select-device-notice').hide()
                $('.chosen-tab').removeClass('chosen-tab')
                $(this).addClass('chosen-tab')
                $('.chosen-tab .select-device-notice').show()
                //$(this).css('background-color', '#cbdecd')
                var device_to_hide = "#" + $('.shown-device').attr('id')
                $(device_to_hide).slideUp(500);
                $('.shown-device').removeClass("shown-device")
                $(device_info_selected).slideDown(500)
                $(device_info_selected).addClass("shown-device")
            }
        })
        $(".detailed-device-info, .advanced-device-support").css("left", "80%")
        $(".device-options-tab").on("click", function(){
            var current_device = $(this).attr('id').split('-')[0],
                current_tab = "#" + current_device + "-info .shown-options-tab",
                tab_to_show = "#" + current_device + "-info #" + current_device + "-" + $(this).text().replace(/\s/g,"-"),
                new_tab_number = $(this).attr('id').split('-')[$(this).attr('id').split('-').length - 1],
                current_tab_number = $('.current-tab-selected').attr('id').split('-')[$('.current-tab-selected').attr('id').split('-').length - 1],
                end_position = "", start_position = "";
            if(current_tab_number == new_tab_number){

            }
            else{
                $(".current-tab-selected").removeClass('current-tab-selected')
                $(this).addClass('current-tab-selected')
        
                if(current_tab_number > new_tab_number){
                    end_position = "100%"
                    start_position = "-100%"
                }
                else{
                    end_position = "-100%"
                    start_position = "100%"
                }
                $(current_tab).animate({
                    left: end_position
                }, 500, function(){
                    $(this).hide();
                    $(this).removeClass('shown-options-tab')
                    $(tab_to_show).css('left', start_position)
                    $(tab_to_show).show()
                    $(tab_to_show).animate({
                        left: '0%'
                    }, 500, function(){
                        $(this).addClass('shown-options-tab')
                    });
                }); 
            }          
        })

        $("#add-new-device").on("click", function(){
            register_device_confirm()
        })
        $("#confirm-repair-email").on('click', function(){
            reset_email_repair_modal()
            fix_device_email($('.shown-device .repair-email').attr('id'))
        })
        $("#confirm-repair-wifi").on('click', function(){
            reset_wifi_repair_modal()
            fix_device_wifi($(".shown-device .repair-wifi").attr('id'))
        })
        $(".repair-email").on("click", function(){
            $("#modal-greyed-out, .modal-header-close").unbind()
            $("#modal-greyed-out").show()
            $("#modal-greyed-out, .modal-header-close").on("click", function(){
                reset_email_repair_modal()
            })
            $("#repair-email-modal").show()
        })

        $(".repair-wifi").on("click", function(){
            $("#modal-greyed-out").show()
            $("#modal-greyed-out, .modal-header-close").unbind()
            $("#modal-greyed-out, .modal-header-close").on("click", function(){
                reset_wifi_repair_modal()
            })
            $("#repair-wifi-modal").show()
        })

        $(".replace-passcode").on("click", function(){
            replace_passcode($(this))
        })
        $(".replace-device").on("click", function(){
            replace_device($(this))
        })
        $("#sidebar-icon-container").on("click", function(object){
            object.stopPropagation()
            $("#modal-greyed-out").unbind()
            $("#sidebar-nav-mini").css('left', '100%')
            $("#sidebar-nav-mini").show()
            $("#modal-greyed-out").show()
            $("#modal-greyed-out").on("click", function(){
                $("#sidebar-nav-mini").animate({
                    left: '100%'
                }, 500, function(){
                    $(this).hide()
                    $("#modal-greyed-out").hide()
                });
            })
            $("#sidebar-nav-mini").animate({
                left: '40%'
            }, 500);
        })
    }
}

function show_loading(type){
    var loading_text = "Gathering Your Information"
    switch(type){
        case "registering":
            loading_text = "Adding your Device"
            break;
        case "remove_device":
            loading_text = "Removing your Device from AirWatch"
            break;
        case "fixing_email":
            loading_text = "Repairing Email on Device"
            break;
        case "fixing_wifi":
            loading_text = "Repairing Wi-Fi on Device"
        case "replace_passcode":
            loading_text = "Sending New Passcode to Device"
            break;
        default:
            return null;
    }
    $.ajaxSetup({
        beforeSend:function(){
            $("#loading-text").text(loading_text)
            $("#progressbar").progressbar({
                value: false
            });
            $("#cover").show();
        }
    });
}

function reset_add_device_modal(){
    $("#modal-greyed-out, #add-new-device-modal, #new-device-2, #new-device-3, #new-device-4, #confirm-registration").hide()
    $("#new-device-1").css("left", "0%")
    $("#new-device-2, #new-device-3, #new-device-4").css("left", "80%")
    $('#confirm-add-checkbox').prop('checked', false);
    $("#previous-4").css("margin-top", "80px")
}

function reset_passcode_modal(){
    $("#passcode-alert-text").hide()
    $("#replace-passcode-1").css("left", "0%")
    $("#replace-passcode-2").css("left", "80%")
    $("#modal-greyed-out, #replace-passcode-modal, #replace-passcode-2, #confirm-registration").hide()
}

function reset_replace_modal(){
    $("#replace-device-1").css("left","0%")
    $('#confirm-remove-checkbox').prop('checked', false);
    $("#modal-greyed-out, #replace-device-modal, #replace-deivce-1").hide()
}

function reset_email_repair_modal(){
    $("#modal-greyed-out, #repair-email-modal").hide()
}

function reset_email_modal(){
    $("#modal-greyed-out, #email-repaired-modal").hide()
}

function reset_wifi_repair_modal(){
    $("#modal-greyed-out, #repair-wifi-modal").hide()
}

function register_device_confirm(){
    var os = "", ownership = "", shared = ""
    $("#modal-greyed-out").show()
    $("#modal-greyed-out, .modal-header-close").on("click", function(){
        reset_add_device_modal()
    })
    $("#add-new-device-modal").show()
    $("#new-device-1").show()
    $("#android-choice").on("click", function(){
        os = "android"
    })
    $("#ios-choice").on("click", function(){
        os = "ios"
    })
    $(".os-choice").on("click", function(){
        $("#new-device-1").animate({
            left: '-80%'
        }, 500, function(){
            $(this).hide();
            $("#new-device-2").show();
            $("#new-device-2").animate({
                left: '0%'
            }, 500);
        });
    })
    $("#android-icon , #apple-icon, #no-shared-device, #yes-shared-device, #personal-device, #corporate-device").hover(function(){
        $(this).animate({opacity: .5}, 500);
    }, function(){
        $(this).animate({opacity: 1}, 500)
    })
    $("#previous-2").on("click", function(){
        $("#new-device-2").animate({
            left: '80%'
        }, 500, function(){
            $(this).hide();
            $("#new-device-1").show();
            $("#new-device-1").animate({
                left: '0%'
            }, 500);
        });
    })
    $("#corporate-device, #personal-device").on("click", function(){
        $("#new-device-2").animate({
            left: '-80%'
        }, 500, function(){
            $(this).hide();
            $("#new-device-3").show();
            $("#new-device-3").animate({
                left: '0%'
            }, 500);
        });
    })
    $("#corporate-device").on("click", function(){
        ownership = "corporate"
    })
    $("#personal-device").on("click", function(){
        ownership = "personal"
    })

    $("#yes-shared-device, #no-shared-device").on("click", function(){
        $("#new-device-3").animate({
            left: '-80%'
        }, 500, function(){
            $(this).hide();
            $("#new-device-4").show();
            $("#new-device-4").animate({
                left: '0%'
            }, 500);
        });
    })
    $("#yes-shared-device").on("click", function(){
        shared = "no"
    })
    $("#no-shared-device").on("click", function(){
        shared = "shared"
    })

    $("#previous-3").on("click", function(){
        $("#new-device-3").animate({
            left: '80%'
        }, 500, function(){
            $(this).hide();
            $("#new-device-2").show();
            $("#new-device-2").animate({
                left: '0%'
            }, 500);
        });
    })
    
    $("#previous-4").on("click", function(){
        $("#new-device-4").animate({
            left: '80%'
        }, 500, function(){
            $(this).hide();
            $("#new-device-3").show();
            $("#new-device-3").animate({
                left: '0%'
            }, 500);
        });
    })
    $("#confirm-add-checkbox").on("click", function(){
        if($("#confirm-add-checkbox").is(":checked")){
            $("#confirm-registration").show()
            $("#previous-4").css("margin-top", "15px")
        }
        else{
            $("#confirm-registration").hide()
            $("#previous-4").css("margin-top", "80px")
        }
    })
    $("#confirm-registration").on("click", function(){
        register_device(os, ownership, shared)
    })
};

function replace_device(device_info){
    $("#modal-greyed-out").show()
    $("#modal-greyed-out, .modal-header-close").on("click", function(){
        reset_replace_modal()
    })
    $("#replace-device-modal").show()
    $("#confirm-replace-device").hide()
    $("#replace-device-1").show()
    $("#confirm-remove-checkbox").on("click", function(){
        if($("#confirm-remove-checkbox").is(":checked")){
            $("#confirm-replace-device").show()
        }
        else{
            $("#confirm-replace-device").hide()
        }
    })
    $("#confirm-replace-device").on("click", function(){
        reset_replace_modal()
        show_loading("remove_device")
        remove_device_from_airwatch(device_info)
    })
    $("#change-devce-for-device").on('click', function(){
        replace_device_passcode(device_info.attr('id').split('-')[0])
    })
}

function replace_passcode(device_info){
    debugger
    $("#modal-greyed-out").show()
    $("#modal-greyed-out, .modal-header-close").on("click", function(){
        reset_passcode_modal()
    })
    $("#replace-passcode-modal").show()
    $("#replace-passcode-1").show()
    $("#confirm-passcode-reset").on("click", function(){
        $("#replace-passcode-1").animate({
            left: '-100%'
        }, 500, function(){
            $(this).hide();
            $("#replace-passcode-2").show();
            $("#replace-passcode-2").animate({
                left: '0%'
            }, 500);
        });
    })
    $("#change-passcode-for-device").on('click', function(){
        var passcodes = $(".passcode_input");
        for(i=0; i < passcodes.length; i++){
            if(passcodes[i].value == ""){
                $("#passcode-alert-text").show()
                break;
            }
            var counted_pass = i;
        }
        if(counted_pass == 7){
            var new_passcode = ""
            for(i=0; i < passcodes.length; i++){
                new_passcode = new_passcode + passcodes[i].value
            }
            device_id = device_info.attr('id').split('-')[0]
            $("#passcode-alert-text").hide()
            replace_device_passcode(device_id, new_passcode)
        }
    })
}

function email_repaired(device_os){
    $("#modal-greyed-out").show()
    $("#modal-greyed-out, .modal-header-close").on("click", function(){
        reset_email_modal()
    })
    if(device_os == "Apple"){
        $("#email-for-ios").show()
    }
    else{
        $("#email-for-android").show()
    }
    $("#email-repaired-modal").show()
}

function no_devices_for_user(){
    $("#modal-greyed-out").show()
    $("#no-devices-for-user-modal").show()
}
