let reset_form = $("#reset_form");
/**
 * Submit the form content with POST method
 * @param formSubmitEvent
 */
function submit(formSubmitEvent) {
    $("#ModalPasswordChanged").modal('show');
    /**
     * When users click the submit button, the browser will not direct
     * users to the url defined in HTML form. Instead, it will call this
     * event handler when the event is triggered.
     */
    formSubmitEvent.preventDefault();
    $.ajax(
        "api/reset", {
            method: "POST",
            // Serialize the login form to the data sent by POST request
            data: reset_form.serialize(),
            success: function(){$("#ModalPasswordChanged").modal('show');}
        }
    );
}
// Bind the submit action of the form to a handler function
reset_form.submit(submit);

