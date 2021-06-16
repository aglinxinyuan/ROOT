let reset_form = $("#forgot_form");
let greenbox = $(".greenbox");
/**
 * Submit the form content with POST method
 * @param formSubmitEvent
 */
function submit(formSubmitEvent) {
    /**
     * When users click the submit button, the browser will not direct
     * users to the url defined in HTML form. Instead, it will call this
     * event handler when the event is triggered.
     */
    greenbox.show();
    $("#send").html('<a class="btn orangeBtn mt-5" HREF="reset.html">Continue</a>');
    formSubmitEvent.preventDefault();
    $.ajax(
        "api/forgot", {
            method: "POST",
            // Serialize the login form to the data sent by POST request
            data: reset_form.serialize(),
            success: function(){$("#ModalPasswordChanged").modal('show');}
        }
    );
}
// Bind the submit action of the form to a handler function
reset_form.submit(submit);