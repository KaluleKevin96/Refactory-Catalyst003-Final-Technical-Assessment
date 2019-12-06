
/* ------------------ ACCESSSING THE ELEMENT FIELDS ----------------------------*/
//the form elements
var all_ids = ['surName', 'givenName', 'dob', 'country', 'placeOfResidence', 'phoneNumber', 'email',];


//the optional text area field
var skills = document.getElementById('skills');
var projects = document.getElementById('projects');


//the radio buttons
var male_radio = document.getElementById('Male');
var female_radio = document.getElementById('Female');


//the form
var registration_form = document.querySelector('registration_form');

//the submit button
// var submit_button = document.getElementById('submit_button');


/*-------------------------------- ACCESSING ELEMENTS ENDS HERE ---------------------------------*/

//main validation function
function validate(event) {

    var skills_error_display = document.getElementById("skills_error");
    var projects_error_display = document.getElementById("projects_error");


    var counter = 0;
    //validating the required elements
    for (i = 0; i < all_ids.length; i++) {
        //checking each individual required element
        if (required(all_ids[i])) {

            counter += 1;
        }
    }

    if (skills.value == '') {
        //if the about text area is not filled , display the optional

        skills_error_display.textContent = "Optional";

    }

    if (projects.value == '') {
        //if the about text area is not filled , display the optional

        projects_error_display.textContent = "Optional";

    }


    //run function to check the checkboxes
    var radiobutton_check = radio_button_check(male_radio, female_radio);

    //the final condition
    if (counter == all_ids.length && radiobutton_check == true) {

console.log(counter + "\n\n" + radiobutton_check);

        //if every validation happens well
        alert("Validation Successfull");
        return true;
    }
    else {

        //if something goes wrong
        alert("Validation UNSUCCESSFUL");
        return false;
    }

}

submit_button.addEventListener('click', validate);

//function to check whether or not an input field has been filled in
function required(input_field_id) {

    var element = document.getElementById(input_field_id);

    if (element.value == '') {

        //if element is not filled
        var error_display = document.getElementById(input_field_id + "_error");

        error_display.textContent = "This field is REQUIRED";

        return false;

    } else {

        return true;
    }

}

//function to validate the checkboxes
function checkbox_check(checkbox1_field , checkbox2_field) {

    if (checkbox1_field.checked && checkbox2_field.checked ) {

        //if both checkboxes are selected
        var error_display = document.getElementById("checkbox_error");

        error_display.textContent = "Please select only one option";

        return false;

    } else if ((!checkbox1_field.checked) && (!checkbox2_field.checked)) {

        //if both no checkboxes are selected
        var error_display = document.getElementById("checkbox_error");

        error_display.textContent = "Please select at least one option";

        return false;

    }else {

        return true;
    }

}

//function to check if a radio button has been checked
function radio_button_check(radio_field, radio2_field) {

    if ((!radio_field.checked) && (!radio2_field.checked)) {

        //if no option is selected
        var error_display = document.getElementById("radio_error");

        error_display.textContent = "Please select at least one option";

        return false;

    } else {

        return true;
    }

}

