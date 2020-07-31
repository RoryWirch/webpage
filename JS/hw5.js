/*
Student: Rory Wirch
Contact: rory_wirch@student.uml.edu
Class: GUI I
Professor: Wenjin Zhou
Assignment: HW 5
File: hw5.js

this file contains funtions to validate user input and build a dynamic
multiplication table from that value
*/

function validate(){
    /*
    using the jquery validation plugin
    demo can be found here: https://jqueryvalidation.org/files/demo/milk/
    */
    $("#user_form").validate({
        // rules for input form
        rules: {
            first_horizontal: {
                number: true,
                min: -50,
                max: 50,
                required: true
            },
            second_horizontal: {
                number: true,
                min: -50,
                max: 50,
                required: true
            },
            first_vertical: {
                number: true,
                min: -50,
                max: 50,
                required: true
            },
            second_vertical: {
                number: true,
                min: -50,
                max: 50,
                required: true
            }
        },

        // messages to be displayed if user enters incorrect input
        messages: {
            first_horizontal: {
                number: "Please enter a valid number between -50 and 50",
                min: "Please enter a valid number between -50 and 50",
                max: "Please enter a valid number between -50 and 50",
                required: "This field is required"
            },
            second_horizontal: {
                number: "Please enter a valid number between -50 and 50",
                min: "Please enter a valid number between -50 and 50",
                max: "Please enter a valid number between -50 and 50",
                required: "This field is required"
            },
            first_vertical: {
                number: "Please enter a valid number between -50 and 50",
                min: "Please enter a valid number between -50 and 50",
                max: "Please enter a valid number between -50 and 50",
                required: "This field is required"
            },
            second_horizontal: {
                number: "Please enter a valid number between -50 and 50",
                min: "Please enter a valid number between -50 and 50",
                max: "Please enter a valid number between -50 and 50",
                required: "This field is required"
            }
        },

        // place error after element with the error
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },

        submitHandler: function() {
            console.log("reached submit handler")
            // call to function to build table, won't make it here unless the
            // input is valid
            make_table();
        }
    });
}

// clears table before building
$(document).ready(function(){
    console.log("ready function reached");
    $("warning_msg").empty()
    $("#dynamic_table").empty()
    validate();
});


function make_table() {
    // collect values from the user form
    var hor_1 = Number(document.getElementById("first_horizontal").value);
    var hor_2 = Number(document.getElementById("second_horizontal").value);
    var ver_1 = Number(document.getElementById("first_vertical").value);
    var ver_2 = Number(document.getElementById("second_vertical").value);

    // use console to check values
    console.log("first horizontal value: ", hor_1,
                "second horizontal value: ", hor_2,
                "first vertical value: ", ver_1,
                "second vertical value: ", ver_2);



}
