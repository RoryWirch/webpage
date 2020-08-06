/*
Student: Rory Wirch
Contact: rory_wirch@student.uml.edu
Class: GUI I
Professor: Wenjin Zhou
Assignment: HW 6
File: hw6.js

this file contains funtions to validate user input and build a dynamic
multiplication table from those values.
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
    $("#alert_msg").empty();
    $("#dynamic_table").empty();
    validate();
});


function make_table() {
    // collect values from the user form
    var hor_1 = document.getElementById("first_horizontal").value;
    var hor_2 = document.getElementById("second_horizontal").value;
    var ver_1 = document.getElementById("first_vertical").value;
    var ver_2 = document.getElementById("second_vertical").value;

    // use console to check values
    console.log("first horizontal value: ", hor_1,
                "second horizontal value: ", hor_2,
                "first vertical value: ", ver_1,
                "second vertical value: ", ver_2);

    // clear any old alerts
    $("#alert_msg").empty();

    // swap first / second number is the first is larger than the second
    if (hor_1 > hor_2) {
        var tmp = hor_2;
        hor_2 = hor_1;
        hor_1 = tmp;
        // alert user that the values are being swapped
        $("#alert_msg").append("<p>The horizontal values have been swapped</p>");
    }

    if (ver_1 > ver_2) {
        var tmp = ver_2;
        ver_2 = ver_1;
        ver_1 = tmp;
        // alert user that the values are being swapped
        $("#alert_msg").append("<p>The vertical values have been swapped</p>");
    }

    /* ready to build the table, I will be storing values for the table in an
    object of arrays (rows). These values will be used to create the
    dynamic multiplication table.
    */
    var matrix = {}
    // calculate number of rows and collumns
    var num_row = hor_2 - hor_1;
    var num_col = ver_2 - ver_1;
    // grab values for the indexes
    var hor_ind = hor_1;
    var ver_ind = ver_1;

    // loop to build the table
    for (var i = 0; i <= num_col; i++){
        // this temp array will be used to fill in the matrix
        var tmp = [];

        for (var j = 0; j <= num_row; j++){
            // find the multiplication value and store it in the temp array
            var mult_val = hor_ind * ver_ind;
            tmp[j] = mult_val;
            hor_ind++;
        }
        // store the array (row) in the matrix
        matrix["row" + i] = tmp;
        // reset the horizontal index because we are starting a new row
        hor_ind = hor_1;
        // increment the vertical index because we are going down a row
        ver_ind++;
    }

    /* now we start to add the html content for a table, this will be held in
    a string called table. first fill out the opening tag and add in the first
    row and place an empty cell in the first position. some of how I built this
    code was found here: http://crowdforthink.com/blogs/how-to-create-multiplication-table-using-javascript
    */
    var table = "";
    table += "<table>";
    table += "<tr><td></td>";

    // fill out the rest of the first row
    for (var i = hor_1; i <= hor_2; i++) {
        table += "<td>" + i + "</td>";
    }
    // close the first row
    table += "</tr>";

    // reset the vertical index
    ver_ind = ver_1;

    // fill in the remaining rows
    for (var i = 0; i <= num_col; i++){
        table += "<tr><td>" + ver_ind + "</td>";

        // loop for multiplication values for this row
        for (var j = 0; j <= num_row; j++){
            table += "<td>" + matrix["row" + i][j] + "</td>";
        }
        ver_ind++;

        table += "</tr>";
    }

    table += "</table>";
    console.log(table);
    // load table into html page
    //var dyn_table = document.getElementById("#dynamic_table");

    $("#dynamic_table").html(table);

}
